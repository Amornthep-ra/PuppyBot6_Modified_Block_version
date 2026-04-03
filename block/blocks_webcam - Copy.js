// webcam_capture_to_file.js — รุ่นกันพัง: ต้อง "ขึ้นแน่" และเปิดกล้องผ่าน localhost ได้ถ้า env เอื้อ
module.exports = function(Blockly) {
  "use strict";

  console.log("[webcam] module loaded");

  // ---------- Block definition ----------
  Blockly.Blocks["webcam_capture_to_file"] = {
    init: function () {
      this.appendDummyInput().appendField("capture image from Webcam");
      this.appendDummyInput().appendField(new Blockly.FieldImage(
        // ไอคอน base64 ปลอดภัย (อย่าใช้ "..." เดี๋ยวภาพดำ)
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAJElEQVQoz2P8z8Dwn4EIwDiqYQYjCwMjEw0QpFQh5E4Ck0QAAAjmYk0Kz3GjwAAAABJRU5ErkJggg==",
        32, 32, "open",
        function () { // ต้องเป็น function เพื่อให้ this = FieldImage
          const field = this;            // FieldImage
          const blk   = this.sourceBlock_; // Block
          openWebcamModalSafe({ title:"Webcam Capture", maxW:160, maxH:128 }, function (res) {
            if (!res) return;
            const dataURL = res.dataURL, width = res.width, height = res.height;

            // อัปเดตรูปในบล็อค
            field.setValue(dataURL); field.init();
            // อัปเดตข้อความขนาด
            if (blk && blk.inputList && blk.inputList[2] && blk.inputList[2].fieldRow[0]) {
              blk.inputList[2].fieldRow[0].setValue("image size " + width + " x " + height);
              blk.inputList[2].fieldRow[0].init();
            }
            // เก็บสำหรับ generator
            blk.dataURL     = dataURL;
            blk.imageWidth  = width;
            blk.imageHeight = height;
          });
        },
        true
      ));
      this.appendDummyInput().appendField("image size 160 x 128");
      this.setOutput(true, "std::vector<uint16_t>");
      this.setColour(230);
      this.setTooltip("Open webcam preview, capture, and update the block preview.");
      // storage เผื่อใช้ต่อ
      this.dataURL = ""; this.imageWidth = 0; this.imageHeight = 0; this.data = "";
    }
  };

  // ---------- Generator (ชั่วคราว) ----------
  if (typeof Blockly.Cpp !== "undefined") {
    Blockly.Cpp["webcam_capture_to_file"] = function(block) {
      var dataCSV = block.data || "";
      var code = dataCSV ? ("std::vector<uint8_t>{ " + dataCSV + " }") : "std::vector<uint8_t>{}";
      return [code, Blockly.Cpp.ORDER_ATOMIC];
    };
  }

  console.log("[webcam] block registered");

function openWebcamModalSafe(opts, onCaptured) {
  console.log("[webcam] openWebcamModalSafe (perm + localhost + debug)");

  // safe-require
  let electron = null;
  try {
    electron = (window && window.require && window.require("electron")) || require("electron");
  } catch (e) {}
  if (!electron) { alert("Electron not available"); return; }

  const remote = electron.remote;
  if (!remote) { alert("electron.remote not available"); return; }

  const { BrowserWindow } = remote;
  const sesDefault = remote.session && remote.session.defaultSession;
  if (!BrowserWindow || !sesDefault) { alert("BrowserWindow/session not available"); return; }

  const parent = remote.getCurrentWindow();
  const child = new BrowserWindow({
    parent,
    modal: true,
    width: 900,
    height: 650,
    resizable: true,
    title: (opts && opts.title) || "Webcam Capture",
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });

  // เปิด DevTools ของหน้าต่างลูกเพื่อดู log
  //try { child.webContents.openDevTools({ mode: "detach" }); } 
  try { } 
  catch {}

  const maxW = (opts && opts.maxW) || 160;
  const maxH = (opts && opts.maxH) || 128;
  const parentId = parent.webContents.id;
  const title = (opts && opts.title) || "Webcam Capture";

  // 1) อนุญาต media สำหรับหน้าต่างลูก
  const session = child.webContents.session || sesDefault;
  let prevHandler = null;
  try {
    if (session.setPermissionRequestHandler) {
      prevHandler = session._kbidePrevHandler || null;
      session.setPermissionRequestHandler((wc, permission, callback/*, details*/) => {
        console.log("[webcam] permission req:", permission, "from wc", wc && wc.id);
        if (wc && wc.id === child.webContents.id && (permission === "media" || permission === "camera" || permission === "microphone")) {
          return callback(true);
        }
        if (prevHandler) { try { return prevHandler(wc, permission, callback); } catch {} }
        return callback(false);
      });
    }
  } catch (e) { console.warn("[webcam] setPermissionRequestHandler error:", e && e.message); }

  // 2) HTML (มี log และส่ง error กลับ)
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<style>
  body{margin:16px;font-family:system-ui,sans-serif}
  video,canvas{width:100%;max-height:420px;background:#000}
  .row{display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap}
  button{padding:8px 12px}
  label{display:flex;align-items:center;gap:6px}
  pre{background:#f5f5f5;padding:8px;border-radius:6px;max-height:160px;overflow:auto}
</style>
</head>
<body>
  <h3>${title}</h3>
  <video id="video" autoplay playsinline muted></video>
  <div class="row">
    <label><input id="resize" type="checkbox" checked> Resize to ${maxW}×${maxH}</label>
    <button id="btnCap">Capture</button>
    <button id="btnClose">Close</button>
  </div>
  <h4>Logs</h4>
  <pre id="log"></pre>
  <h4>Last Capture</h4>
  <canvas id="canvas"></canvas>

<script>
  const { ipcRenderer, remote } = require('electron');
  const logEl = document.getElementById('log');
  function log(...a){ const s=a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' '); console.log(s); logEl.textContent += s+"\\n"; }

  const v = document.getElementById('video'); v.muted = true;
  const c = document.getElementById('canvas'); const x = c.getContext('2d',{ willReadFrequently:true });
  const chk = document.getElementById('resize');
  const MAX_W = ${maxW}, MAX_H = ${maxH};
  const parentId = remote.getCurrentWindow().getParentWindow().webContents.id;
  let stream = null;

  async function start(){
    try {
      log("secure origin?", location.protocol, location.href);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("mediaDevices.getUserMedia not supported");
      }

      const devs = await navigator.mediaDevices.enumerateDevices();
      log("devices:", devs);
      const cams = devs.filter(d => d.kind === 'videoinput');
      if (!cams.length) throw new Error("No camera (videoinput) found");

      const constraints = { video: { deviceId: cams[0].deviceId ? { exact: cams[0].deviceId } : undefined }, audio: false };
      log("constraints:", constraints);

      stream = await navigator.mediaDevices.getUserMedia(constraints);
      log("got stream:", !!stream);

      v.srcObject = stream;
      v.onloadedmetadata = () => {
        log("video metadata:", v.videoWidth, v.videoHeight);
        v.play().then(() => log("video playing")).catch(e => log("play error:", e && e.message));
      };
    } catch (e) {
      log("GUM error:", e.name, e.message);
      try { ipcRenderer.sendTo(parentId, 'kbide:webcam-error', { name: e.name, message: e.message }); } catch {}
      alert('Cannot access webcam: ' + e.name + ' - ' + e.message);
      window.close();
    }
  }

  function fit(w,h){
    if(!chk.checked) return {w,h};
    const s = Math.min(MAX_W/w, MAX_H/h, 1);
    return { w: Math.max(1, Math.floor(w*s)), h: Math.max(1, Math.floor(h*s)) };
  }

  document.getElementById('btnCap').onclick = () => {
    const vw = v.videoWidth || 640, vh = v.videoHeight || 480;
    const s = fit(vw, vh); c.width = s.w; c.height = s.h;
    x.drawImage(v, 0, 0, s.w, s.h);
    const dataURL = c.toDataURL('image/png');
    ipcRenderer.sendTo(parentId, 'kbide:webcam-captured', { dataURL, width: s.w, height: s.h });
    window.close();
  };
  document.getElementById('btnClose').onclick = () => window.close();

  window.addEventListener('beforeunload', () => { try { stream && stream.getTracks().forEach(t => t.stop()); } catch {} });

  start();
</script>
</body></html>`;

  // 3) เสิร์ฟผ่าน localhost
  let server = null;
  (function startServer(){
    try {
      const http = remote.require && remote.require("http");
      server = http.createServer((req,res)=>{ res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}); res.end(html); });
      server.listen(0, "127.0.0.1", () => {
        const port = server.address().port;
        const url  = "http://127.0.0.1:" + port + "/";
        console.log("[webcam] loadURL:", url);
        child.loadURL(url);
      });
    } catch (e) {
      console.warn("[webcam] localhost server failed, fallback data URL:", e && e.message);
      child.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(html));
    }
  })();

  // 4) cleanup & คืน handler เดิม
  function cleanup() {
    try { server && server.close(); } catch(e){}
    try {
      if (session.setPermissionRequestHandler) {
        // คืน handler เดิม (หรือปิดทั้งหมดถ้าไม่มีเดิม)
        session.setPermissionRequestHandler(prevHandler || ((wc, perm, cb)=>{ try{ cb(false); }catch(_){} }));
      }
    } catch(e){}
  }
  child.on("closed", cleanup);

  // 5) รับผล capture และ error
  try {
    electron.ipcRenderer.once("kbide:webcam-captured", (_e, payload) => { try { onCaptured && onCaptured(payload); } finally { cleanup(); } });
    electron.ipcRenderer.once("kbide:webcam-error", (_e, err) => {
      cleanup();
      setTimeout(()=>{ alert("Webcam error: " + (err && (err.name + ": " + err.message))); }, 10);
    });
  } catch (e) { console.warn("[webcam] ipc once failed:", e && e.message); }
}


};
