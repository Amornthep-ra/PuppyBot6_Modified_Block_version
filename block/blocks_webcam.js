// webcam_capture_to_file.js — รุ่นกันพัง: ต้อง "ขึ้นแน่" และเปิดกล้องผ่าน localhost ได้ถ้า env เอื้อ
module.exports = function(Blockly) {
  "use strict";

  console.log("[webcam] module loaded");
  const ENABLE_WEBCAM_IMAGE_FIELD = true;
  const WEBCAM_DEFAULT_DATAURL =
    "data:image/png;base64,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";
  const WEBCAM_PLACEHOLDER = WEBCAM_DEFAULT_DATAURL;

  // ---------- Block definition ----------
  Blockly.Blocks["webcam_capture_to_file"] = {
    init: function () {
      this.appendDummyInput().appendField("capture image from Webcam");
      if (ENABLE_WEBCAM_IMAGE_FIELD) {
        this.appendDummyInput().appendField(new Blockly.FieldImage(
          WEBCAM_PLACEHOLDER,
          24, 24, "open",
          function () { // ต้องเป็น function เพื่อให้ this = FieldImage
            const field = this;            // FieldImage
            const blk   = this.sourceBlock_; // Block
            openWebcamModalSafe({ title:"Webcam Capture", maxW:160, maxH:128 }, function (res) {
              if (!res) return;
              const dataURL = res.dataURL, width = res.width, height = res.height;

              // อัปเดตรูปในบล็อค
              // Keep static icon in block UI; image payload stays in blk.dataURL.
              field.setValue(WEBCAM_PLACEHOLDER);
              field.init();
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
      } else {
        this.appendDummyInput().appendField("(webcam picker temporarily disabled)");
      }
      this.appendDummyInput().appendField("image size 160 x 128");
      this.setOutput(true, "std::vector<uint16_t>");
      this.setColour(230);
      this.setTooltip("Open webcam preview, capture, and update the block preview.");
      // storage เผื่อใช้ต่อ
      this.dataURL = WEBCAM_DEFAULT_DATAURL; this.imageWidth = 0; this.imageHeight = 0; this.data = "";
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
