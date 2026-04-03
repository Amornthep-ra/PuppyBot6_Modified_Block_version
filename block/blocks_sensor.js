const dirIcon = Vue.prototype.$global.board.board_info.dir;
module.exports = function (Blockly) {
  'use strict';

  Blockly.Blocks['sw1_press_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SW1 V.")
        .appendField(new Blockly.FieldDropdown([["Old(3)", "3"], ["New(27)", "27"]]), "pin_sw1");
      this.appendDummyInput()
        .appendField("Show")
        .appendField(new Blockly.FieldDropdown([["allSensor", "ALL"], ["oneSensor", "ONE"]]), "show_mode");
      this.appendDummyInput()
        .appendField("feedback")
        .appendField(new Blockly.FieldDropdown([["Buzzer", "BUZZER"], ["Buzzer Custom", "BUZZER_CUSTOM"], ["Silent(No Delay)", "SILENT_NO_DELAY"]]), "feedback_mode");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Wait SW1 press with pin/show/feedback options.");
      this.setHelpUrl("");
      this._updatingCustomInputs = false;
      this._autoShadowIds = {};
      this._customCacheNum = {
        BUZZER_HZ: "1000",
        DELAY_MS: "200"
      };
      this.updateCustomInputs_(true);
      // Re-run once after block XML fields are restored on workspace load.
      // This keeps BUZZER_HZ/DELAY_MS visible for saved BUZZER_CUSTOM mode
      // without requiring user click.
      setTimeout(() => {
        if (!this.workspace || this.isInFlyout) return;
        this.updateCustomInputs_();
      }, 0);
    },
    updateCustomInputs_: function (skipRender) {
      if (this._updatingCustomInputs) return;
      this._updatingCustomInputs = true;
      try {
        var feedback = this.getFieldValue("feedback_mode");
        var isCustom = (feedback === "BUZZER_CUSTOM");

        var ensureShadow = (inputName, defaultNum) => {
          var input = this.getInput(inputName);
          if (!input || !input.connection || input.connection.targetBlock()) return;
          var shadowBlock = this.workspace.newBlock('math_number');
          shadowBlock.setShadow(true);
          shadowBlock.data = "sw1_press_select_auto_shadow";
          shadowBlock.setFieldValue(String(defaultNum), 'NUM');
          var canInitSvg = !!(this.workspace && this.workspace.rendered && this.rendered);
          if (canInitSvg && shadowBlock.initSvg) shadowBlock.initSvg();
          input.connection.connect(shadowBlock.outputConnection);
          this._autoShadowIds[inputName] = shadowBlock.id;
          if (canInitSvg && shadowBlock.render) shadowBlock.render();
        };

        var disposeTrackedAuto = (inputName) => {
          if (!this.workspace || !this._autoShadowIds) return;
          var blockId = this._autoShadowIds[inputName];
          if (!blockId) return;
          var block = this.workspace.getBlockById(blockId);
          if (block) block.dispose();
          delete this._autoShadowIds[inputName];
        };

        var cacheInputNumber = (inputName) => {
          var input = this.getInput(inputName);
          if (!input || !input.connection) return;
          var target = input.connection.targetBlock();
          if (!target) return;
          if (target.type === "math_number") {
            var num = target.getFieldValue('NUM');
            if (typeof num !== "undefined" && num !== null && String(num).length > 0) {
              this._customCacheNum[inputName] = String(num);
            }
          }
        };

        if (isCustom) {
          if (!this.getInput("BUZZER_HZ")) {
            this.appendValueInput("BUZZER_HZ").setCheck("Number").appendField("Hz");
          }
          if (!this.getInput("DELAY_MS")) {
            this.appendValueInput("DELAY_MS").setCheck("Number").appendField("Delay(ms)");
          }
          ensureShadow("BUZZER_HZ", this._customCacheNum.BUZZER_HZ || "1000");
          ensureShadow("DELAY_MS", this._customCacheNum.DELAY_MS || "200");
        } else {
          cacheInputNumber("BUZZER_HZ");
          cacheInputNumber("DELAY_MS");
          var inHz = this.getInput("BUZZER_HZ");
          if (inHz) {
            disposeTrackedAuto("BUZZER_HZ");
            this.removeInput("BUZZER_HZ");
          }
          var inDelay = this.getInput("DELAY_MS");
          if (inDelay) {
            disposeTrackedAuto("DELAY_MS");
            this.removeInput("DELAY_MS");
          }
        }
      } finally {
        this._updatingCustomInputs = false;
      }
      if (!skipRender && this.rendered) this.render();
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateCustomInputs_();
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('feedback_mode', this.getFieldValue("feedback_mode") || "BUZZER");
      m.setAttribute(
        'hz_cache',
        (this._customCacheNum && this._customCacheNum.BUZZER_HZ) ? String(this._customCacheNum.BUZZER_HZ) : "1000"
      );
      m.setAttribute(
        'delay_cache',
        (this._customCacheNum && this._customCacheNum.DELAY_MS) ? String(this._customCacheNum.DELAY_MS) : "200"
      );
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var feedback = xml.getAttribute('feedback_mode');
      var hzCache = xml.getAttribute('hz_cache');
      var delayCache = xml.getAttribute('delay_cache');
      if (!this._customCacheNum) {
        this._customCacheNum = { BUZZER_HZ: "1000", DELAY_MS: "200" };
      }
      if (hzCache) this._customCacheNum.BUZZER_HZ = String(hzCache);
      if (delayCache) this._customCacheNum.DELAY_MS = String(delayCache);
      if (feedback) {
        try { this.setFieldValue(feedback, "feedback_mode"); } catch (e) { }
      }
      this.updateCustomInputs_(true);
    }
  };
  Blockly.Blocks['button_1_status'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/sw12x12.png", 20, 20, "*"))
        .appendField("SW1(IO6) Status ");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("get SW1 pressed or not");
      this.setHelpUrl("");
    }
  };

  // Blockly.Blocks['Ultrasinoc_sensor'] = {
  //   init: function() {
  //     this.appendDummyInput()
  //         //.appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
  //         .appendField("Read Distance");
  //     this.setInputsInline(true);
  //     this.setOutput(true, "Number");
  //     this.setColour(65);
  //  this.setTooltip("Read Distance");
  //  this.setHelpUrl("");
  //   }
  // };
  Blockly.Blocks['Light_Sensor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Front", "F"], ["Back", "B"]]), "POS")
        .appendField("lightSensor(ADC):")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"],
        ["A4", "4"], ["A5", "5"], ["A6", "6"], ["A7", "7"], ["A8", "8"], ["A9", "9"], ["A10", "10"], ["A11", "11"], ["A12", "12"], ["A13", "13"], ["A14", "14"], ["A15", "15"]]), "pin");
      this.setOutput(true);
      this.setColour(65);
      this.setTooltip("read pos EncoderA Pin 26");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['Light_Sensor_F'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Front sensor(ADC):")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"],
        ["A4", "4"], ["A5", "5"], ["A6", "6"], ["A7", "7"], ["A8", "8"], ["A9", "9"], ["A10", "10"], ["A11", "11"], ["A12", "12"], ["A13", "13"], ["A14", "14"], ["A15", "15"]]), "pin");
      this.setOutput(true);
      this.setColour(300);
      this.setTooltip("read pos EncoderA Pin 26");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['INPUT_digital'] = {
    init: function () {
      // this.appendDummyInput()
      //     //.appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
      //     .appendField("Read digital status");
      this.appendValueInput("pin")
        .appendField("Read digital status at");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Read digital status at");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['Puppy_beep'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Buzzer beep");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Buzzer beep");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['TCS_color_status'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("TCS color")
        .appendField(new Blockly.FieldDropdown([["1", "F"], ["2", "B"]]), "POS")
        .appendField("at")
        .appendField(new Blockly.FieldDropdown([["R", "0"], ["G", "1"], ["B", "2"], ["colorTemp", "3"], ["lux", "4"], ["clear", "5"], ["rawR", "6"], ["rawG", "7"], ["rawB", "8"]]), "_color");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("color");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['Ultrasonic_sensor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Ulrasonic Config Pin Echo")
        .appendField(new Blockly.FieldDropdown([["A8", "40"], ["A9", "41"], ["A10", "42"], ["A11", "43"],
        ["A12", "44"], ["A13", "45"], ["A14", "46"], ["A15", "47"], ["IO15", "15"], ["IO16", "16"]]), "pin_Echo");
      this.appendDummyInput()
        .appendField("Pin Trig")
        .appendField(new Blockly.FieldDropdown([["A8", "40"], ["A9", "41"], ["A10", "42"], ["A11", "43"],
        ["A12", "44"], ["A13", "45"], ["A14", "46"], ["A15", "47"], ["IO15", "15"], ["IO16", "16"]]), "pin_Trig");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("config pin for Ultrasonic");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['IMU_begin'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("setMode move IMU")
        .appendField(new Blockly.FieldDropdown([["4WD", "0"], ["2WD", "1"]]), "Mode")
        .appendField("Select Encoder At")
        .appendField(new Blockly.FieldDropdown([["Not use encoder", "0"], ["Motor 1", "1"], ["Motor 2", "2"], ["All", "3"]]), "pos_encoder");
      this.appendDummyInput()
        .appendField("Set Data for TurnDirection")
        .appendField("Error=")
        .appendField(new Blockly.FieldNumber(1), "S4")
        .appendField("Min=")
        .appendField(new Blockly.FieldNumber(15), "S0")
        .appendField("Max=")
        .appendField(new Blockly.FieldNumber(60), "S1")
        .appendField("KP=")
        .appendField(new Blockly.FieldNumber(4), "S2")
        .appendField("KD=")
        .appendField(new Blockly.FieldNumber(5), "S3");
      this.setFieldValue("0", "pos_encoder");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("IMU Init");
      this.setHelpUrl("");
    }
  };
    Blockly.Blocks['IMU_resetTo180'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Reset IMU To 180");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Reset IMU To 180");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['IMU_update'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Gyro update");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("IMU update");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['IMU_getData_Yaw'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("getYawData")
        .appendField(new Blockly.FieldDropdown([["Fix_diretion", "3"], ["getCurrentYaw", "0"], ["getContinuousYaw", "1"], ["getOffsetYaw", "2"]]), "axis");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Get Data from IMU");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['IMU_direction_to_angle'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Direction")
        .appendField(new Blockly.FieldDropdown([["⬆ North", "0"], ["➡ East", "1"], ["⬇ South", "2"], ["⬅ West", "3"],
        ["⬋ SW", "4"], ["⬉ NW", "5"], ["⬈ NE", "6"], ["⬊ SE", "7"]]), "direction");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Map direction code to target angle (relative to offset_yaw_loop1).");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['IMU_getData'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("getData")
        // Swapped Pitch/Roll values to match legacy behavior while keeping Pitch on top.
        .appendField(new Blockly.FieldDropdown([["getPitch", "0"], ["getRoll", "1"], ["getYaw", "2"]]), "axis");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Get Data from IMU");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['IMU_TurnPID'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("")
        .appendField(new Blockly.FieldDropdown([["Spin", "0"], ["Turn", "1"]]), "condition");
      this.appendDummyInput()
        .appendField(" PID angle=");
      this.appendValueInput("S0")
        .setCheck("Number")
        .appendField("");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("Min speed=");
      this.appendValueInput("S2")
        .setCheck("Number")
        .appendField("Max speed=");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("KP=");
      this.appendValueInput("S4")
        .setCheck("Number")
        .appendField("KD=");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['IMU_TurnByDirection'] = {
    init: function () {

      this.appendDummyInput()
        .appendField("")
        .appendField(new Blockly.FieldDropdown([["Spin", "0"], ["Turn", "1"]]), "condition")
        .appendField("to Direction=")
        .appendField(new Blockly.FieldDropdown([["⬆ turn_180", "0"], ["➡ turn_270", "1"], ["⬇ turn_390", "2"], ["⬅ turn_90", "3"],
        ["⬋ turn_45", "4"], ["⬉ turn_135", "5"], ["⬈ turn_225", "6"], ["⬊ turn_315", "7"]]), "direction");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Gyro update");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['IMU_TurnByAngle'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("")
        .appendField(new Blockly.FieldDropdown([["Spin", "0"], ["Turn", "1"], ["Turn (Back)", "2"]]), "condition")
        .appendField("By angle =")
        .appendField(new Blockly.FieldDropdown([["90", "0"], ["-90", "1"], ["180", "2"], ["-180", "3"], ["45", "4"], ["-45", "5"]]), "angle");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['IMU_set_dataFor_turnDirection'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Set Data for TurnDirection=");
      this.appendValueInput("S4")
        .setCheck("Number")
        .appendField("Angle Error = ");
      this.appendValueInput("S0")
        .setCheck("Number")
        .appendField("speed Min=");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("Max=");
      this.appendValueInput("S2")
        .setCheck("Number")
        .appendField("KP=");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("KD=");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };



  Blockly.Blocks["move_Go_Straight_Fix"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Move straight")
        .appendField(new Blockly.FieldDropdown([["Forward", "0"], ["Backward", "1"]]), "direction");
      this.appendDummyInput()
        .appendField("At Angle =");
      this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("");
      this.appendDummyInput()
        .appendField("Distance source")
        .appendField(new Blockly.FieldDropdown([["Encoder pulses", "ENC"], ["Time (ms)", "TIME"]]), "RUNMODE");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("Speed (%) =");
      this.appendValueInput("S2")
        .setCheck("Number")
        .appendField("Target (pulses) =", "S2_LABEL");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("Kp =");
      this.appendValueInput("S4")
        .setCheck("Number")
        .appendField("Ki =");
      this.appendValueInput("S5")
        .setCheck("Number")
        .appendField("Kd =");
      this.appendDummyInput()
        .appendField("Slow before Stop")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Slow");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(200);
      this.setTooltip(
        "วิ่งตรงด้วย PID ใช้ encoder + Gyro\n" +
        "• ใช้ Angle ที่ป้อนเป็นมุมเป้าหมาย\n" +
        "• Distance source: encoder pulses หรือเวลา (ms) ถ้าไม่มี encoder\n" +
        "• ต้องตั้ง encoder ผ่าน IMU_begin และอัปเดต Con_yaw_loop1 ในลูป"
      );
      this.setHelpUrl("");
      this.updateTargetLabel_();
    },
    updateTargetLabel_: function () {
      var runMode = this.getFieldValue("RUNMODE") || "ENC";
      var label = (runMode === "TIME") ? "Target (ms) =" : "Target (pulses) =";
      var field = this.getField("S2_LABEL");
      if (field) field.setValue(label);
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateTargetLabel_();
    }
  };
  Blockly.Blocks['IMU_moveStraightCurveStraight_Encoder'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Move straight by encoder")
        .appendField(new Blockly.FieldDropdown([["Forward", "0"], ["Backward", "1"]]), "dir");
      this.appendValueInput("S0")
        .setCheck("Number")
        .appendField("Straight pulses=");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("Straight speed=");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("Straight Kp=");
      this.appendValueInput("S4")
        .setCheck("Number")
        .appendField("Straight Kd=");
      this.appendValueInput("S6")
        .setCheck("Number")
        .appendField("Straight Yaw error=");
      this.appendDummyInput()
        .appendField("Brake before turn")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "BRAKE");
      this.appendDummyInput()
        .appendField("Stop at end")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "STOP");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Encoder mode straight-only move. Uses the same straight control as the smooth curve block.");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['IMU_moveStraightCurveTurn_Encoder'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Curve turn to yaw")
        .appendField(new Blockly.FieldDropdown([["Forward", "0"], ["Backward", "1"]]), "dir");
      this.appendValueInput("S2")
        .setCheck("Number")
        .appendField("Turn until yaw=");
      this.appendValueInput("S7")
        .setCheck("Number")
        .appendField("Turn Max speed=");
      this.appendValueInput("S8")
        .setCheck("Number")
        .appendField("Turn Min speed=");
      this.appendValueInput("S9")
        .setCheck("Number")
        .appendField("Turn Kp=");
      this.appendValueInput("S10")
        .setCheck("Number")
        .appendField("Turn Kd=");
      this.appendValueInput("S11")
        .setCheck("Number")
        .appendField("Turn Yaw error=");
      this.appendDummyInput()
        .appendField("Curve speed")
        .appendField(new Blockly.FieldDropdown([["Slow down", "1"], ["Full speed", "0"]]), "CURVE_SLOWDOWN");
      this.appendDummyInput()
        .appendField("Turn style")
        .appendField(new Blockly.FieldDropdown([["Smooth curve", "0"], ["Pivot (one side stop)", "1"]]), "TURN_STYLE");
      this.appendDummyInput()
        .appendField("Lock angle")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "LOCK");
      this.appendDummyInput()
        .appendField("Stop at end")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "STOP");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Encoder mode turn-only move. Uses the same turn control as the smooth curve block.");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["mecanum_slide_fix"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Mecanum slide")
        .appendField(new Blockly.FieldDropdown([["Left", "0"], ["Right", "1"]]), "direction");
      this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("At angle =");
      this.appendDummyInput()
        .appendField("Distance source")
        .appendField(new Blockly.FieldDropdown([["Encoder pulses", "ENC"], ["Time (ms)", "TIME"]]), "RUNMODE");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("Speed (%) =");
      this.appendValueInput("S2")
        .setCheck("Number")
        .appendField("Target (pulses) =", "S2_LABEL");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("Kp =");
      this.appendValueInput("S4")
        .setCheck("Number")
        .appendField("Ki =");
      this.appendValueInput("S5")
        .setCheck("Number")
        .appendField("Kd =");
      this.appendDummyInput()
        .appendField("Slow before Stop")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Slow");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(65);
      this.setTooltip("Mecanum slide with gyro PID; use target angle input.");
      this.setHelpUrl("");
      this.updateTargetLabel_();
    },
    updateTargetLabel_: function () {
      var runMode = this.getFieldValue("RUNMODE") || "ENC";
      var label = (runMode === "TIME") ? "Target (ms) =" : "Target (pulses) =";
      var field = this.getField("S2_LABEL");
      if (field) field.setValue(label);
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateTargetLabel_();
    }
  };

  Blockly.Blocks['IMU_moveStraightPID_step'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Move  ")
        .appendField(new Blockly.FieldDropdown([["Forward", "0"], ["Backward", "1"]]), "dir");
      this.appendValueInput("S0")
        .setCheck("Number")
        .appendField("At Angle=");
      this.appendValueInput("S2")
        .setCheck("Boolean")
        .appendField("until logic=");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("speed=");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("KP=");
      this.appendValueInput("S5")
        .setCheck("Number")
        .appendField("KD=");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(67);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['IMU_moveStraightDirection_step'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Move  ")
        .appendField(new Blockly.FieldDropdown([["Forward", "0"], ["Backward", "1"]]), "dir");
      this.appendDummyInput()
        .appendField("At ")
        .appendField(new Blockly.FieldDropdown([["North", "0"], ["East", "1"], ["South", "2"], ["West", "3"], ["SW", "4"], ["NW", "5"], ["NE", "6"], ["SE", "7"]]), "angle");
      this.appendValueInput("S2")
        .setCheck("Boolean")
        .appendField("until logic=");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("speed=");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("KP=");
      this.appendValueInput("S5")
        .setCheck("Number")
        .appendField("KD=");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(67);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['reset_Encoder'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Reset Encoder")
        .appendField(new Blockly.FieldDropdown([["Motor 1", "1"], ["Motor 2", "2"], ["All", "3"]]), "Mode");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['read_Encoder'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Read Encoder")
        .appendField(new Blockly.FieldDropdown([["Motor 1", "1"], ["Motor 2", "2"], ["All", "3"]]), "Mode");
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['IMU_moveStraightDirection_noLoop'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("(Want loop)")
        .appendField(new Blockly.FieldDropdown([["Forward", "0"], ["Backward", "1"]]), "dir");
      this.appendValueInput("S2")
        .setCheck("Number")
        .appendField("At angle=");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("speed=");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("KP=");
      this.appendValueInput("S5")
        .setCheck("Number")
        .appendField("KD=");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(67);
      this.setTooltip("");
    }
  };

  Blockly.Blocks['move_straight_mode'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("(Want loop) save enc");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Forward", "0"], ["Backward", "1"]]), "DIR");
      this.appendValueInput("ANGLE").setCheck("Number")
        .appendField("At angle =");
      this.appendValueInput("SPEED").setCheck("Number")
        .appendField("Speed (%) =");
      this.appendValueInput("KP").setCheck("Number")
        .appendField("Kp =");
      this.appendValueInput("KD").setCheck("Number")
        .appendField("Kd =");
      this.appendDummyInput()
        .appendField("Store pulses to")
        .appendField(new Blockly.FieldVariable("enc_FWD"), "VAR");

      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(200);
      this.setTooltip("Loop-only straight PID (no pulses target). Use angle input; log encoder pulses to a variable.");
      this.setHelpUrl("");
    },
  };
  if (typeof Blockly !== "undefined") {
  Blockly.Blocks["wantloop_mecanum_slide_fix"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("(Want loop) Mecanum slide (snap)")
        .appendField(new Blockly.FieldDropdown([["Left", "0"], ["Right", "1"]]), "direction");
      this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("At angle =");
      this.appendValueInput("S1")
        .setCheck("Number")
        .appendField("Speed (%) =");
      this.appendValueInput("S3")
        .setCheck("Number")
        .appendField("Kp =");
      this.appendValueInput("S4")
        .setCheck("Number")
        .appendField("Ki =");
      this.appendValueInput("S5")
        .setCheck("Number")
        .appendField("Kd =");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(200);
      this.setTooltip("Loop-only mecanum slide PID; use target angle input.");
      this.setHelpUrl("");
    }
  };

    Blockly.Blocks["encoder_delta_lt_target"] = {
      init: function () {
        this.appendDummyInput().appendField("Reached target?");
        this.appendDummyInput().appendField("0 pulse to");
        this.appendValueInput("TARGET").setCheck("Number")
          .appendField("Target pulses");
        this.appendDummyInput()
          .appendField("Count both directions")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "ABS");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(120);
        this.setTooltip("Auto-inits and auto-resets encoder at start, then counts from 0 until target.");
        this.setHelpUrl("");
      }
    };
  }




  // Slide left/right with mecanum wheels (snap heading to nearest 0/90/180/270)

  // (Want loop) Mecanum slide fix (no pulses/time)

  /* Math: absolute value */
  Blockly.Blocks["kb_abs"] = {
    init: function () {
      this.appendDummyInput().appendField("abs");
      this.appendValueInput("X").setCheck("Number").appendField("(");
      this.appendDummyInput().appendField(")");
      this.setOutput(true, "Number");
      this.setColour(200); // math tone
      this.setTooltip("Absolute value |x|");
      this.setHelpUrl("");
    },
  };

  // Move straight with mode (setup once with pulses or loop without pulses)

  Blockly.Blocks['knob_menu_n'] = {
    init: function () {
      this.appendDummyInput('WARN_SW1')
        .appendField("(Want loop) ห้ามใช้บล็อกคำสั่ง SW1");
        this.appendDummyInput('WARN_SETUP1')
        .appendField("เพราะ knob_menu จะเลือกโปรแกรมไม่ได้");
      this.appendDummyInput()
        .appendField("SW1 pin")
        .appendField(new Blockly.FieldDropdown([["SW1 Old (IO3)", "3"], ["SW1 New (IO27)", "27"]]), "SWPIN");
      this.appendDummyInput()
        .appendField("Knob menu on ADC")
        .appendField(new Blockly.FieldDropdown([
          ["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"],
          ["A4", "4"], ["A5", "5"], ["A6", "6"], ["A7", "7"],
          ["A8", "8"], ["A9", "9"], ["A10", "10"], ["A11", "11"],
          ["A12", "12"], ["A13", "13"], ["A14", "14"], ["A15", "15"]
        ]), "pin")
        .appendField("Programs N")
        .appendField(new Blockly.FieldNumber(1, 1, 10, 1), "n");

      this.setColour(30);
      this.setTooltip(
        "Knob menu (ADC) with SW1 confirm/exit. Press SW1 to enter/exit program; shows centered program name with custom colors. "
        + "Don't use blocking SW1 wait blocks inside program; SW1 is reserved for menu navigation. "
        + "Place this block in loop, not in setup.");
      this.setHelpUrl("");

      this.itemCount_ = 1; // จำนวนเมนูเริ่มต้น
      this.updateShape_();

      // ✅ ให้เป็น statement block (ต่อกับ setup/loop ได้)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    },

    mutationToDom: function () {
      var container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
    },

    domToMutation: function (xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },

    updateShape_: function () {
      // ลบอินพุตเก่าก่อนสร้างใหม่
      for (var i = 1; this.getInput('P' + i); i++) {
        this.removeInput('P' + i);
        this.removeInput('DO' + i);
        if (this.getInput('C' + i)) this.removeInput('C' + i);
        if (this.getInput('R' + i)) this.removeInput('R' + i);
      }
      // สร้างอินพุตใหม่ตามจำนวนโปรแกรม
      for (var i = 1; i <= this.itemCount_; i++) {
        this.appendDummyInput('P' + i)
          .appendField("Program " + i + " name")
          .appendField(new Blockly.FieldTextInput("Program " + i), "PNAME" + i);
        this.appendDummyInput('C' + i)
          .appendField("Text")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "TCOLOR" + i)
          .appendField("Box BG")
          .appendField(new Blockly.FieldColour("#1A1A3A"), "BGCOLOR" + i);
        this.appendDummyInput('R' + i)
          .appendField("Run once?")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "RUNONCE" + i);
        this.appendStatementInput('DO' + i)
          .appendField("Do when Program " + i);
      }
    },

    onchange: function (e) {
      var n = this.getFieldValue('n');
      if (n != this.itemCount_) {
        this.itemCount_ = n;
        this.updateShape_();
      }
    }
  };


}






