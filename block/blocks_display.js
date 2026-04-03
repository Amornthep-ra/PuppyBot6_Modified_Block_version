const electron = require("electron");
const nativeImage = electron.nativeImage;
const ipcRenderer = electron.ipcRenderer;
const ENABLE_IMAGE_FIELD = true;
const DEFAULT_IMAGE_DATAURL =
  "data:image/png;base64,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";
const IMAGE_PLACEHOLDER = DEFAULT_IMAGE_DATAURL;

function openPngDialog() {
  return new Promise((resolve) => {
    if (!ipcRenderer || typeof ipcRenderer.send !== "function") {
      resolve([]);
      return;
    }

    const requestId = `puppybot6_open_png_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    const responseChannel = `open-file-dialog-response:${requestId}`;
    const timeout = setTimeout(() => {
      ipcRenderer.removeAllListeners(responseChannel);
      resolve([]);
    }, 10000);

    ipcRenderer.once(responseChannel, (_event, filePaths) => {
      clearTimeout(timeout);
      resolve(Array.isArray(filePaths) ? filePaths : []);
    });

    ipcRenderer.send("open-file-dialog", {
      requestId,
      options: {
        filters: [{ name: "Images PNG", extensions: ["png"] }],
        properties: ["openFile"],
      },
    });
  });
}

function floyd_steinberg(imageData, w) {
  var imageDataLength = imageData.length;
  var lumR = [],
    lumG = [],
    lumB = [];
  var newPixel, err;
  for (var i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.110;
  }
  // Greyscale luminance (sets r pixels to luminance of rgb)
  for (var i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = Math.floor(lumR[imageData[i]] + lumG[imageData[i + 1]] +
      lumB[imageData[i + 2]]);
  }
  for (var currentPixel = 0; currentPixel <=
  imageDataLength; currentPixel += 4) {
    // threshold for determining current pixel's conversion to a black or white pixel
    newPixel = imageData[currentPixel] < 150
      ? 0
      : 255;
    err = Math.floor((imageData[currentPixel] - newPixel) / 23);
    imageData[currentPixel + 0 * 1 - 0] = newPixel;
    imageData[currentPixel + 4 * 1 - 0] += err * 7;
    imageData[currentPixel + 4 * w - 4] += err * 3;
    imageData[currentPixel + 4 * w - 0] += err * 5;
    imageData[currentPixel + 4 * w + 4] += err * 1;
    // Set g and b values equal to r (effectively greyscales the image fully)
    imageData[currentPixel + 1] = imageData[currentPixel +
    2] = imageData[currentPixel];
  }
  return imageData;
}

module.exports = function(Blockly) {
  "use strict";

  Blockly.Blocks["i2c128x64_create_image"] = {
    init: function() {
      this.appendDummyInput()
        .appendField("create image from PNG file");
      if (ENABLE_IMAGE_FIELD) {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(
            IMAGE_PLACEHOLDER,
            24,
            24,
            "click to upload",
            function(e) {
              let myself = this;
              let id = this.sourceBlock_.id.toUpperCase();
              openPngDialog().then((imageFilePaths) => {
                console.log(imageFilePaths);
                if (Array.isArray(imageFilePaths) && imageFilePaths.length > 0) {
                  const imageFileName = imageFilePaths[0];
                  //--- resize image ---//
                  let image = nativeImage.createFromPath(imageFileName);
                  let size = image.getSize();
                  if (size.width > 160) {
                    image = image.resize({ width: 160 });
                    size = image.getSize();
                  }
                  if (size.height > 128) {
                    image = image.resize({ height: 128 });
                    size = image.getSize();
                  }
                  var buff = image.getBitmap();
                  //---- dithering image ----//
                  //floyd_steinberg(buff,size.width);
                  //---- display image ----//
                  myself.sourceBlock_.inputList[2].fieldRow[0].setValue(`image size ${size.width} x ${size.height}`);
                  myself.sourceBlock_.inputList[2].fieldRow[0].init();
                  myself.sourceBlock_.dataURL = image.toDataURL();
                  myself.setValue(IMAGE_PLACEHOLDER);
                  myself.init();
                }
              });
            },
            true));
      } else {
        this.appendDummyInput().appendField("(image picker temporarily disabled)");
      }
      this.appendDummyInput().appendField("image size 160 x 128");

      this.setOutput(true, "std::vector<uint16_t>");
      this.setColour(230);
      this.setTooltip(
        "create image from PNG file (for best quality result please use size within 128x64 pixel otherwise, it'll resize)");
      this.setHelpUrl("");
      this.dataURL = DEFAULT_IMAGE_DATAURL;
    }
  };

  Blockly.Blocks["i2c128x64_display_image"] = {
    init: function() {
      this.appendValueInput("img")
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .setCheck("std::vector<uint16_t>")
        .appendField("draw image");
      this.appendValueInput("x")
        .setCheck("Number")
        .appendField(" at (X");
      this.appendValueInput("y")
        .setCheck("Number")
        .appendField(",Y");
      this.appendValueInput("width")
        .setCheck("Number")
        .appendField(") width");
      this.appendValueInput("height")
        .setCheck("Number")
        .appendField("height");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("display image to display");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["i2c128x64_display_clear"] = {
    init: function() {
      this.appendDummyInput()
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .appendField("clear display");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("clear display");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["i2c128x64_display_display"] = {
    init: function() {
      this.appendDummyInput()
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .appendField("display");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("display everything to screen");
      this.setHelpUrl("");
    }
  };

// ######################################################################
  Blockly.Blocks["tft_display_setRotation"] = {
    init: function() {
      this.appendDummyInput()
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .appendField("display setRotation")
        .appendField(new Blockly.FieldDropdown([
            ["TOP", "0"],
            ["RIGHT", "1"],
            ["DOWN", "2"],
            ["LEFT", "3"]
          ]),
          "rotation");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["tft_display_fillScreen"] = {
    init: function() {
      this.appendDummyInput()
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .appendField("display fillScreen:")
        .appendField(new Blockly.FieldColour("#000000"), "COLOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["tft_display_setTextSize"] = {
    init: function() {
      this.appendDummyInput()
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .appendField("set Text Size")
        .appendField(new Blockly.FieldDropdown([
            ["6x8", "1"],
            ["12x16", "2"],
            ["18x24", "3"]
          ]),
          "textSize");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["tft_display_print"] = {
    init: function() {
      this.appendValueInput("text")
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        // .setCheck("String")
        .appendField("display text");
      this.appendValueInput("x")
        .setCheck("Number")
        .appendField("at (X");
      this.appendValueInput("y")
        .setCheck("Number")
        .appendField(", Y");
      this.appendValueInput("size")
        .setCheck("Number")
        .appendField(", Size");
      this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("0xf800"), "COLOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("display string at x,y");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["tft_display_print2"] = {
    init: function() {
      this.appendValueInput("text")
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        // .setCheck("String")
        .appendField("display text");
      this.appendValueInput("x")
        .setCheck("Number")
        .appendField("at (X");
      this.appendValueInput("y")
        .setCheck("Number")
        .appendField(", Y");
      this.appendValueInput("size")
        .setCheck("Number")
        .appendField(", Size");
      this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("0xf800"), "COLOR");
      this.appendDummyInput()
        .appendField("BG color")
        .appendField(new Blockly.FieldColour("#000000"), "COLOR2");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("display string at x,y");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["tft_display_draw_line"] = {
    init: function() {
      this.appendValueInput("x0")
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .setCheck("Number")
        .appendField("draw line from (X");
      this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(",Y");
      this.appendValueInput("x1")
        .setCheck("Number")
        .appendField(")  to  (X");
      this.appendValueInput("y1")
        .setCheck("Number")
        .appendField(",Y");
      this.appendDummyInput()
        .appendField(")");
      this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("#000000"), "COLOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("draw line from (x0,y0) to (x1,y1)");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["tft_display_draw_rect"] = {
    init: function() {
      this.appendValueInput("x")
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .setCheck("Number")
        .appendField("draw rectangle at (X");
      this.appendValueInput("y")
        .setCheck("Number")
        .appendField(", Y");
      this.appendValueInput("width")
        .setCheck("Number")
        .appendField(")  width");
      this.appendValueInput("height")
        .setCheck("Number")
        .appendField(" height");
      this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("#000000"), "COLOR");
      this.appendDummyInput()
        .appendField(" fill ")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("draw rectangle to display");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["tft_display_draw_circle"] = {
    init: function() {
      this.appendValueInput("x")
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .setCheck("Number")
        .appendField("draw circle at (X");
      this.appendValueInput("y")
        .setCheck("Number")
        .appendField(",Y");
      this.appendValueInput("r")
        .setCheck("Number")
        .appendField(")  radius");
      this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("#000000"), "COLOR");
      this.appendDummyInput()
        .appendField(" fill")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("draw circle on screen");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["i2c128x64_display_draw_progress_bar"] = {
    init: function() {
      this.appendValueInput("x")
        // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
        .setCheck("Number")
        .appendField("draw progress bar at (X");
      this.appendValueInput("y")
        .setCheck("Number")
        .appendField(",Y");
      this.appendValueInput("width")
        .setCheck("Number")
        .appendField(")  width");
      this.appendValueInput("height")
        .setCheck("Number")
        .appendField("  height");
      this.appendValueInput("progress")
        .setCheck("Number")
        .appendField("  progress");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("draw progress bar on the screen");
      this.setHelpUrl("");
    }
  };
};
