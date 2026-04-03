
//Block from IKB1 

module.exports = function (Blockly) {
  'use strict';



  Blockly.Blocks['Run_following_of_line'] = {
    init: function () {
      this.appendValueInput("speed")
        .setCheck("Number")
        .appendField("speed for line following");
      this.appendDummyInput()
        .appendField("%");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['PuppyBot_PID_setPin_select'] = {
    init: function () {
      this.appendDummyInput('HEADER')
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('SetPin')
        .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']]), 'numSensor');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this.updatePinInputs_();
    },
    getPinOptions_: function () {
      return [['-', '19'], ['A0', '0'], ['A1', '1'], ['A2', '2'], ['A3', '3'], ['A4', '4'], ['A5', '5'], ['A6', '6'], ['A7', '7'], ['A8', '8'], ['A9', '9'], ['A10', '10'], ['A11', '11'], ['A12', '12'], ['A13', '13'], ['A14', '14'], ['A15', '15']];
    },
    updatePinInputs_: function () {
      var prefix = this.getFieldValue('SIDE') === 'BACK' ? 'SB' : 'S';
      var count = parseInt(this.getFieldValue('numSensor') || '1', 10);
      var currentValues = {};
      for (var i = 0; i < 8; i++) {
        if (this.getField('S' + i + '_Pin')) {
          currentValues[i] = this.getFieldValue('S' + i + '_Pin') || '19';
        }
      }
      for (var j = 0; j < 8; j++) {
        var inputName = 'PIN_INPUT_' + j;
        if (j < count) {
          if (!this.getInput(inputName)) {
            this.appendDummyInput(inputName)
              .appendField(prefix + j + '_Pin', 'PIN' + j + '_LABEL')
              .appendField(new Blockly.FieldDropdown(this.getPinOptions_()), 'S' + j + '_Pin');
          } else if (this.getField('PIN' + j + '_LABEL')) {
            this.setFieldValue(prefix + j + '_Pin', 'PIN' + j + '_LABEL');
          }
          if (this.getField('S' + j + '_Pin')) {
            this.getField('S' + j + '_Pin').setValue(currentValues[j] || '19');
          }
        } else if (this.getInput(inputName)) {
          this.removeInput(inputName);
        }
      }
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('side', this.getFieldValue('SIDE') || 'FRONT');
      m.setAttribute('count', this.getFieldValue('numSensor') || '1');
      for (var i = 0; i < 8; i++) {
        if (this.getField('S' + i + '_Pin')) {
          m.setAttribute('pin' + i, this.getFieldValue('S' + i + '_Pin') || '19');
        }
      }
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var side = xml.getAttribute('side');
      var count = xml.getAttribute('count');
      if (side) {
        try { this.setFieldValue(side, 'SIDE'); } catch (e) { }
      }
      if (count) {
        try { this.setFieldValue(count, 'numSensor'); } catch (e) { }
      }
      this.updatePinInputs_();
      for (var i = 0; i < 8; i++) {
        var pinValue = xml.getAttribute('pin' + i);
        if (pinValue && this.getField('S' + i + '_Pin')) {
          try { this.getField('S' + i + '_Pin').setValue(pinValue); } catch (e) { }
        }
      }
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updatePinInputs_();
    }
  };
  Blockly.Blocks['PuppyBot_PID_setline_color_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('Set line color:')
        .appendField(new Blockly.FieldDropdown([['Black', '0'], ['White', '1']]), 'line_color');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
    }
  };
  Blockly.Blocks['PuppyBot_PID_setmode_sensor_select'] = {
    init: function () {
      this.appendDummyInput('MAIN')
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('Mux: Out=A8 CH1=A9 CH2=A10 CH3=A11', 'MUX_TEXT');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this.updateMuxText_();
    },
    updateMuxText_: function () {
      var text = this.getFieldValue('SIDE') === 'BACK'
        ? 'Mux: Out=A12 CH1=A13 CH2=A14 CH3=A15'
        : 'Mux: Out=A8 CH1=A9 CH2=A10 CH3=A11';
      if (this.getField('MUX_TEXT')) {
        this.setFieldValue(text, 'MUX_TEXT');
      }
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateMuxText_();
    }
  };
  Blockly.Blocks['PID_readLine_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Front", "FRONT"], ["Back", "BACK"]]), "SIDE")
        .appendField("PID_readLine");
      this.setInputsInline(true);
      this.setOutput(true);
      this.setColour(65);
      this.setTooltip("PID_readLine");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['PID_readSumSensor_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Front", "FRONT"], ["Back", "BACK"]]), "SIDE")
        .appendField("PID_readSumSensor");
      this.setInputsInline(true);
      this.setOutput(true);
      this.setColour(65);
      this.setTooltip("PID_readSumSensor");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['PuppyBot_PID_setMin_select'] = {
    init: function () {
      this.appendDummyInput('HEADER')
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('SetMin(Black) Select')
        .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']]), 'numSensor');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this._autoShadowIds = {};
      this._customCacheNum = {};
      this.updateSensorInputs_();
    },
    ensureNumberShadow_: function (inputName, defaultNum) {
      var input = this.getInput(inputName);
      if (!input || !input.connection || input.connection.targetBlock()) return;
      var shadowBlock = this.workspace.newBlock('math_number');
      shadowBlock.setShadow(true);
      shadowBlock.data = 'PuppyBot_PID_setMin_select_auto_shadow';
      shadowBlock.setFieldValue(String(defaultNum), 'NUM');
      var canInitSvg = !!(this.workspace && this.workspace.rendered && this.rendered);
      if (canInitSvg && shadowBlock.initSvg) shadowBlock.initSvg();
      input.connection.connect(shadowBlock.outputConnection);
      this._autoShadowIds[inputName] = shadowBlock.id;
      if (canInitSvg && shadowBlock.render) shadowBlock.render();
    },
    disposeTrackedAuto_: function (inputName) {
      if (!this.workspace || !this._autoShadowIds) return;
      var blockId = this._autoShadowIds[inputName];
      if (!blockId) return;
      var block = this.workspace.getBlockById(blockId);
      if (block) block.dispose();
      delete this._autoShadowIds[inputName];
    },
    cacheInputNumber_: function (inputName) {
      var input = this.getInput(inputName);
      if (!input || !input.connection) return;
      var target = input.connection.targetBlock();
      if (!target) return;
      if (target.type === 'math_number') {
        var num = target.getFieldValue('NUM');
        if (typeof num !== 'undefined' && num !== null && String(num).length > 0) {
          this._customCacheNum[inputName] = String(num);
        }
      }
    },
    updateSensorInputs_: function () {
      var prefix = this.getFieldValue('SIDE') === 'BACK' ? 'SB' : 'S';
      var count = parseInt(this.getFieldValue('numSensor') || '1', 10);
      for (var i = 0; i < 8; i++) {
        var inputName = 'S' + i;
        if (i < count) {
          if (!this.getInput(inputName)) {
            this.appendValueInput(inputName).setCheck('Number').appendField(prefix + i, 'S' + i + '_LABEL');
            this.ensureNumberShadow_(inputName, this._customCacheNum[inputName] || '0');
          } else if (this.getField('S' + i + '_LABEL')) {
            this.setFieldValue(prefix + i, 'S' + i + '_LABEL');
          }
        } else if (this.getInput(inputName)) {
          this.cacheInputNumber_(inputName);
          this.disposeTrackedAuto_(inputName);
          this.removeInput(inputName);
        }
      }
      if (this.rendered) this.render();
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('side', this.getFieldValue('SIDE') || 'FRONT');
      m.setAttribute('count', this.getFieldValue('numSensor') || '1');
      for (var i = 0; i < 8; i++) {
        var inputName = 'S' + i;
        var cache = (this._customCacheNum && this._customCacheNum[inputName]) ? this._customCacheNum[inputName] : null;
        if (!cache) {
          var input = this.getInput(inputName);
          if (input && input.connection) {
            var target = input.connection.targetBlock();
            if (target && target.type === 'math_number') {
              cache = target.getFieldValue('NUM') || '0';
            }
          }
        }
        if (cache !== null && typeof cache !== 'undefined') {
          m.setAttribute('cache_' + i, String(cache));
        }
      }
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var side = xml.getAttribute('side');
      var count = xml.getAttribute('count');
      if (!this._customCacheNum) this._customCacheNum = {};
      for (var i = 0; i < 8; i++) {
        var cache = xml.getAttribute('cache_' + i);
        if (cache !== null) {
          this._customCacheNum['S' + i] = String(cache);
        }
      }
      if (side) {
        try { this.setFieldValue(side, 'SIDE'); } catch (e) { }
      }
      if (count) {
        try { this.setFieldValue(count, 'numSensor'); } catch (e) { }
      }
      this.updateSensorInputs_();
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateSensorInputs_();
    }
  };
  Blockly.Blocks['PuppyBot_PID_setMax_select'] = {
    init: function () {
      this.appendDummyInput('HEADER')
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('SetMax(White) Select')
        .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']]), 'numSensor');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this._autoShadowIds = {};
      this._customCacheNum = {};
      this.updateSensorInputs_();
    },
    ensureNumberShadow_: function (inputName, defaultNum) {
      var input = this.getInput(inputName);
      if (!input || !input.connection || input.connection.targetBlock()) return;
      var shadowBlock = this.workspace.newBlock('math_number');
      shadowBlock.setShadow(true);
      shadowBlock.data = 'PuppyBot_PID_setMax_select_auto_shadow';
      shadowBlock.setFieldValue(String(defaultNum), 'NUM');
      var canInitSvg = !!(this.workspace && this.workspace.rendered && this.rendered);
      if (canInitSvg && shadowBlock.initSvg) shadowBlock.initSvg();
      input.connection.connect(shadowBlock.outputConnection);
      this._autoShadowIds[inputName] = shadowBlock.id;
      if (canInitSvg && shadowBlock.render) shadowBlock.render();
    },
    disposeTrackedAuto_: function (inputName) {
      if (!this.workspace || !this._autoShadowIds) return;
      var blockId = this._autoShadowIds[inputName];
      if (!blockId) return;
      var block = this.workspace.getBlockById(blockId);
      if (block) block.dispose();
      delete this._autoShadowIds[inputName];
    },
    cacheInputNumber_: function (inputName) {
      var input = this.getInput(inputName);
      if (!input || !input.connection) return;
      var target = input.connection.targetBlock();
      if (!target) return;
      if (target.type === 'math_number') {
        var num = target.getFieldValue('NUM');
        if (typeof num !== 'undefined' && num !== null && String(num).length > 0) {
          this._customCacheNum[inputName] = String(num);
        }
      }
    },
    updateSensorInputs_: function () {
      var prefix = this.getFieldValue('SIDE') === 'BACK' ? 'SB' : 'S';
      var count = parseInt(this.getFieldValue('numSensor') || '1', 10);
      for (var i = 0; i < 8; i++) {
        var inputName = 'S' + i;
        if (i < count) {
          if (!this.getInput(inputName)) {
            this.appendValueInput(inputName).setCheck('Number').appendField(prefix + i, 'S' + i + '_LABEL');
            this.ensureNumberShadow_(inputName, this._customCacheNum[inputName] || '0');
          } else if (this.getField('S' + i + '_LABEL')) {
            this.setFieldValue(prefix + i, 'S' + i + '_LABEL');
          }
        } else if (this.getInput(inputName)) {
          this.cacheInputNumber_(inputName);
          this.disposeTrackedAuto_(inputName);
          this.removeInput(inputName);
        }
      }
      if (this.rendered) this.render();
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('side', this.getFieldValue('SIDE') || 'FRONT');
      m.setAttribute('count', this.getFieldValue('numSensor') || '1');
      for (var i = 0; i < 8; i++) {
        var inputName = 'S' + i;
        var cache = (this._customCacheNum && this._customCacheNum[inputName]) ? this._customCacheNum[inputName] : null;
        if (!cache) {
          var input = this.getInput(inputName);
          if (input && input.connection) {
            var target = input.connection.targetBlock();
            if (target && target.type === 'math_number') {
              cache = target.getFieldValue('NUM') || '0';
            }
          }
        }
        if (cache !== null && typeof cache !== 'undefined') {
          m.setAttribute('cache_' + i, String(cache));
        }
      }
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var side = xml.getAttribute('side');
      var count = xml.getAttribute('count');
      if (!this._customCacheNum) this._customCacheNum = {};
      for (var i = 0; i < 8; i++) {
        var cache = xml.getAttribute('cache_' + i);
        if (cache !== null) {
          this._customCacheNum['S' + i] = String(cache);
        }
      }
      if (side) {
        try { this.setFieldValue(side, 'SIDE'); } catch (e) { }
      }
      if (count) {
        try { this.setFieldValue(count, 'numSensor'); } catch (e) { }
      }
      this.updateSensorInputs_();
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateSensorInputs_();
    }
  };
  Blockly.Blocks['PuppyBot_Run_PID_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Select')
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('Sensor | Drive=')
        .appendField(new Blockly.FieldDropdown([['2WD', '0'], ['4WD', '1']]), 'Driver')
        .appendField('Move')
        .appendField(new Blockly.FieldDropdown([['Forward', 'FWD'], ['Backward', 'BWD']]), 'DIR');
      this.appendValueInput('speed')
        .setCheck('Number')
        .appendField('Run_PD Speed=');
      this.appendValueInput('KP')
        .setCheck('Number')
        .appendField('Kp=');
      this.appendValueInput('KD')
        .setCheck('Number')
        .appendField('Kd=');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['No CheckSum', 'NO'], ['CheckSum', 'CHECK']]), 'CHECK_MODE');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this._updatingCheckInput = false;
      this._autoShadowIds = {};
      this._customCacheNum = { sumSensor: '200' };
      this.updateCheckInput_(true);
      setTimeout(() => {
        if (!this.workspace || this.isInFlyout) return;
        this.updateCheckInput_();
      }, 0);
    },
    updateCheckInput_: function (skipRender) {
      if (this._updatingCheckInput) return;
      this._updatingCheckInput = true;
      try {
        var useCheck = this.getFieldValue('CHECK_MODE') === 'CHECK';
        var ensureShadow = (inputName, defaultNum) => {
          var input = this.getInput(inputName);
          if (!input || !input.connection || input.connection.targetBlock()) return;
          var shadowBlock = this.workspace.newBlock('math_number');
          shadowBlock.setShadow(true);
          shadowBlock.data = 'PuppyBot_Run_PID_select_auto_shadow';
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
          if (target.type === 'math_number') {
            var num = target.getFieldValue('NUM');
            if (typeof num !== 'undefined' && num !== null && String(num).length > 0) {
              this._customCacheNum[inputName] = String(num);
            }
          }
        };
        if (useCheck) {
          if (!this.getInput('sumSensor')) {
            this.appendValueInput('sumSensor').setCheck('Number').appendField('Value:');
          }
          ensureShadow('sumSensor', this._customCacheNum.sumSensor || '200');
        } else {
          cacheInputNumber('sumSensor');
          if (this.getInput('sumSensor')) {
            disposeTrackedAuto('sumSensor');
            this.removeInput('sumSensor');
          }
        }
      } finally {
        this._updatingCheckInput = false;
      }
      if (!skipRender && this.rendered) this.render();
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateCheckInput_();
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('check_mode', this.getFieldValue('CHECK_MODE') || 'NO');
      m.setAttribute('sum_cache', (this._customCacheNum && this._customCacheNum.sumSensor) ? String(this._customCacheNum.sumSensor) : '200');
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var checkMode = xml.getAttribute('check_mode');
      var sumCache = xml.getAttribute('sum_cache');
      if (!this._customCacheNum) this._customCacheNum = { sumSensor: '200' };
      if (sumCache) this._customCacheNum.sumSensor = String(sumCache);
      if (checkMode) {
        try { this.setFieldValue(checkMode, 'CHECK_MODE'); } catch (e) { }
      }
      this.updateCheckInput_(true);
    }
  };
  Blockly.Blocks['PuppyBot_Run_PD_V2_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Select')
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('Sensor | Drive=')
        .appendField(new Blockly.FieldDropdown([['2WD', '0'], ['4WD', '1']]), 'Driver')
        .appendField('Move')
        .appendField(new Blockly.FieldDropdown([['Forward', 'FWD'], ['Backward', 'BWD']]), 'DIR');
      this.appendValueInput('speed')
        .setCheck('Number')
        .appendField('Run_PD_V2 Speed=');
      this.appendValueInput('KP')
        .setCheck('Number')
        .appendField('Kp=');
      this.appendValueInput('KD')
        .setCheck('Number')
        .appendField('Kd=');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
    }
  };
  Blockly.Blocks['PuppyBot_Run_PID_color_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Select")
        .appendField(new Blockly.FieldDropdown([["Front", "FRONT"], ["Back", "BACK"]]), "SIDE")
        .appendField("Sensor | Line color")
        .appendField(new Blockly.FieldDropdown([["Black", "0"], ["White", "1"]]), "LINE_COLOR")
        .appendField("Drive")
        .appendField(new Blockly.FieldDropdown([["2WD", "0"], ["4WD", "1"]]), "Driver");
      this.appendValueInput("speed")
        .setCheck("Number")
        .appendField("Run_PD_Speed:");
      this.appendValueInput("KP")
        .setCheck("Number")
        .appendField("KP:");
      this.appendValueInput("KD")
        .setCheck("Number")
        .appendField("KD:");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["No CheckSum", "NO"], ["CheckSum", "CHECK"]]), "CHECK_MODE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this._updatingCheckInput = false;
      this._autoShadowIds = {};
      this._customCacheNum = { sumSensor: '200' };
      this.updateCheckInput_(true);
      setTimeout(() => {
        if (!this.workspace || this.isInFlyout) return;
        this.updateCheckInput_();
      }, 0);
    },
    updateCheckInput_: function (skipRender) {
      if (this._updatingCheckInput) return;
      this._updatingCheckInput = true;
      try {
        var useCheck = this.getFieldValue('CHECK_MODE') === 'CHECK';
        var ensureShadow = (inputName, defaultNum) => {
          var input = this.getInput(inputName);
          if (!input || !input.connection || input.connection.targetBlock()) return;
          var shadowBlock = this.workspace.newBlock('math_number');
          shadowBlock.setShadow(true);
          shadowBlock.data = 'PuppyBot_Run_PID_color_select_auto_shadow';
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
          if (target.type === 'math_number') {
            var num = target.getFieldValue('NUM');
            if (typeof num !== 'undefined' && num !== null && String(num).length > 0) {
              this._customCacheNum[inputName] = String(num);
            }
          }
        };
        if (useCheck && !this.getInput('sumSensor')) {
          this.appendValueInput('sumSensor')
            .setCheck('Number')
            .appendField('Check sumSensor:');
          ensureShadow('sumSensor', this._customCacheNum.sumSensor || '200');
        } else if (!useCheck && this.getInput('sumSensor')) {
          cacheInputNumber('sumSensor');
          disposeTrackedAuto('sumSensor');
          this.removeInput('sumSensor', true);
        }
        if (!skipRender && this.rendered) this.render();
      } finally {
        this._updatingCheckInput = false;
      }
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateCheckInput_();
    },
    mutationToDom: function () {
      var container = document.createElement('mutation');
      container.setAttribute('check_mode', this.getFieldValue('CHECK_MODE') || 'NO');
      container.setAttribute('sumsensor_cache', (this._customCacheNum && this._customCacheNum.sumSensor) ? this._customCacheNum.sumSensor : '200');
      return container;
    },
    domToMutation: function (xmlElement) {
      if (!xmlElement) return;
      var mode = xmlElement.getAttribute('check_mode');
      if (mode) this.setFieldValue(mode, 'CHECK_MODE');
      this._customCacheNum = this._customCacheNum || {};
      var cache = xmlElement.getAttribute('sumsensor_cache');
      if (cache) this._customCacheNum.sumSensor = cache;
      setTimeout(() => {
        if (!this.workspace || this.isInFlyout) return;
        this.updateCheckInput_();
      }, 0);
    }
  };

  Blockly.Blocks['set_calibrate_sensor_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Calibrate')
        .appendField(new Blockly.FieldDropdown([['Front', 'FRONT'], ['Back', 'BACK']]), 'SIDE')
        .appendField('Sensor');
      this.appendValueInput('Round')
        .setCheck('Number')
        .appendField('round');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
    }
  };
  Blockly.Blocks['set_Sensitive_Front_sensor'] = {
    init: function () {
      this.appendValueInput("Sensitive")
        .setCheck("Number")
        .appendField("5.set Sensitive Front sensor");
      this.appendDummyInput()
        .appendField("%");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['Read_Status_Sensor_select'] = {
    init: function () {
      this.appendDummyInput('MAIN')
        .appendField("Select")
        .appendField(new Blockly.FieldDropdown([["Front", "FRONT"], ["Back", "BACK"]]), "SIDE");
      this.setInputsInline(true);
      this.setOutput(true);
      this.setColour(65);
      this.setTooltip("");
      this.updateMainRow_();
    },
    updateMainRow_: function () {
      var input = this.getInput('MAIN');
      if (!input) return;
      var prefix = this.getFieldValue('SIDE') === 'BACK' ? 'SB' : 'S';
      var currentValue = this.getFieldValue('Sensor_Pin') || '0';
      var currentColor = this.getFieldValue('line_color') || '0';
      try { input.removeField('SENSOR_TEXT'); } catch (e) { }
      try { input.removeField('Sensor_Pin'); } catch (e) { }
      try { input.removeField('DETECT_TEXT'); } catch (e) { }
      try { input.removeField('line_color'); } catch (e) { }
      input.appendField('Sensor | Pin=', 'SENSOR_TEXT');
      input.appendField(new Blockly.FieldDropdown([
        [prefix + '0', '0'],
        [prefix + '1', '1'],
        [prefix + '2', '2'],
        [prefix + '3', '3'],
        [prefix + '4', '4'],
        [prefix + '5', '5'],
        [prefix + '6', '6'],
        [prefix + '7', '7'],
        [prefix + '8', '8'],
        [prefix + '9', '9']
      ]), 'Sensor_Pin');
      input.appendField('is detect:', 'DETECT_TEXT');
      input.appendField(new Blockly.FieldDropdown([["Black", "0"], ["White", "1"]]), 'line_color');
      try { this.setFieldValue(String(currentValue), 'Sensor_Pin'); } catch (e) { }
      try { this.setFieldValue(String(currentColor), 'line_color'); } catch (e) { }
      if (this.rendered) this.render();
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('side', this.getFieldValue('SIDE') || 'FRONT');
      m.setAttribute('sensor_pin', this.getFieldValue('Sensor_Pin') || '0');
      m.setAttribute('line_color', this.getFieldValue('line_color') || '0');
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var side = xml.getAttribute('side');
      var sensorPin = xml.getAttribute('sensor_pin');
      var lineColor = xml.getAttribute('line_color');
      if (side) {
        try { this.setFieldValue(side, 'SIDE'); } catch (e) { }
      }
      this.updateMainRow_();
      if (sensorPin !== null) {
        try { this.setFieldValue(String(sensorPin), 'Sensor_Pin'); } catch (e) { }
      }
      if (lineColor !== null) {
        try { this.setFieldValue(String(lineColor), 'line_color'); } catch (e) { }
      }
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateMainRow_();
    }
  };
  Blockly.Blocks['Read_Ref_Sensor_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Ref")
        .appendField(new Blockly.FieldDropdown([["Front", "FRONT"], ["Back", "BACK"]]), "SIDE")
        .appendField("sensor:")
        .appendField(new Blockly.FieldDropdown([["S0", "0"], ["S1", "1"], ["S2", "2"], ["S3", "3"], ["S4", "4"], ["S5", "5"], ["S6", "6"], ["S7", "7"], ["S8", "8"], ["S9", "9"]]), "Sensor_Pin");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("");
    }
  };



  Blockly.Blocks['Run_following_of_line_B'] = {
    init: function () {
      this.appendValueInput("speed")
        .setCheck("Number")
        .appendField("speed for line following");
      this.appendDummyInput()
        .appendField("%");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['set_Sensitive_Back_sensor'] = {
    init: function () {
      this.appendValueInput("Sensitive")
        .setCheck("Number")
        .appendField("set Sensitive Back sensor");
      this.appendDummyInput()
        .appendField("%");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };







  Blockly.Blocks['EditTextCode'] = {
    init: function () {
      this.appendValueInput("Text")
        .appendField("custom code:");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };
  Blockly.Blocks['BlockComment'] = {
    init: function () {
      this.appendValueInput("Text")
        .appendField("Comment:");
      this.setInputsInline(false);
      this.setPreviousStatement(false, null);
      this.setNextStatement(false, null);
      this.setColour(65);
      this.setTooltip("");
    }
  };

  Blockly.Blocks["basic_forever_timeout"] = {
    init: function () {
      // this.appendDummyInput()
      //   .appendField('Forever');
      this.appendValueInput("timer")
        .appendField("Forever timeout:");
      this.appendDummyInput()
        .appendField("ms  do");

      // this.appendDummyInput()
      //   .appendField("do");
      this.appendStatementInput('HANDLER');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["basic_forever_count"] = {
    init: function () {
      // this.appendDummyInput()
      //   .appendField('Forever');
      this.appendValueInput("timer")
        .appendField("Repeat :");
      this.appendDummyInput()
        .appendField("time");

      // this.appendDummyInput()
      //   .appendField("do");
      this.appendStatementInput('HANDLER');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  // Blockly.Blocks[''] = {
  //   init: function() {
  //     this.appendValueInput("Text")
  //       .appendField("Comment:");
  //     this.setInputsInline(false);
  //     this.setPreviousStatement(false, null);
  //     this.setNextStatement(false, null);
  //     this.setColour(180);
  //     this.setTooltip("");
  //   }
  // };

  //เพิ่มใหม่ 17/09/2025

  // PID follow line by encoder (2WD/4WD, Forward/Backward, Speed, KP, KD, Encoder input, Pulses)
  Blockly.Blocks['PID_follow_line_by_encoder'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Drive")
        .appendField(new Blockly.FieldDropdown([["2WD", "0"], ["4WD", "1"]]), "DRIVE")
        .appendField("PID Line by Encoder");

      this.appendDummyInput()
        .appendField("Move")
        .appendField(new Blockly.FieldDropdown([["Forward", "FWD"], ["Backward", "BWD"]]), "DIR");

      this.appendValueInput("SPEED").setCheck("Number").appendField("Speed=");
      this.appendValueInput("KP").setCheck("Number").appendField("KP=");
      this.appendValueInput("KD").setCheck("Number").appendField("KD=");

      // ผู้ใช้ต้องเสียบบล็อก Read Pulse Encoder At …
      this.appendValueInput("ENC_CUR").setCheck("Number").appendField("Encoder");

      this.appendValueInput("PULSES").setCheck("Number").appendField("Target Pulses=");
      this.appendDummyInput("TIMEOUT_MODE_ROW")
        .appendField("Timeout")
        .appendField(new Blockly.FieldDropdown([["No Timeout", "OFF"], ["Timeout", "ON"]]), "TIMEOUT_MODE");

      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Follow line with PID until encoder reaches target pulses, then stop.");
      this._updatingTimeoutInput = false;
      this._autoShadowIds = {};
      this._customCacheNum = { timeout: '1000' };
      this.updateTimeoutInput_(true);
      setTimeout(() => {
        if (!this.workspace || this.isInFlyout) return;
        this.updateTimeoutInput_();
      }, 0);
    },
    updateTimeoutInput_: function (skipRender) {
      if (this._updatingTimeoutInput) return;
      this._updatingTimeoutInput = true;
      try {
        var useTimeout = this.getFieldValue('TIMEOUT_MODE') === 'ON';
        var ensureShadow = (inputName, defaultNum) => {
          var input = this.getInput(inputName);
          if (!input || !input.connection || input.connection.targetBlock()) return;
          var shadowBlock = this.workspace.newBlock('math_number');
          shadowBlock.setShadow(true);
          shadowBlock.data = 'PID_follow_line_by_encoder_auto_shadow';
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
          if (target.type === 'math_number') {
            var num = target.getFieldValue('NUM');
            if (typeof num !== 'undefined' && num !== null && String(num).length > 0) {
              this._customCacheNum[inputName] = String(num);
            }
          }
        };
        if (useTimeout && !this.getInput('TIMEOUT_MS')) {
          this.appendValueInput('TIMEOUT_MS')
            .setCheck('Number')
            .appendField('(ms)');
          ensureShadow('TIMEOUT_MS', this._customCacheNum.timeout || '1000');
        } else if (!useTimeout && this.getInput('TIMEOUT_MS')) {
          cacheInputNumber('TIMEOUT_MS');
          disposeTrackedAuto('TIMEOUT_MS');
          this.removeInput('TIMEOUT_MS', true);
        }
        if (!skipRender && this.rendered) this.render();
      } finally {
        this._updatingTimeoutInput = false;
      }
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateTimeoutInput_();
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('timeout_mode', this.getFieldValue('TIMEOUT_MODE') || 'OFF');
      m.setAttribute('timeout_cache', (this._customCacheNum && this._customCacheNum.timeout) ? String(this._customCacheNum.timeout) : '1000');
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var timeoutMode = xml.getAttribute('timeout_mode');
      var timeoutCache = xml.getAttribute('timeout_cache');
      if (!this._customCacheNum) this._customCacheNum = { timeout: '1000' };
      if (timeoutCache) this._customCacheNum.timeout = String(timeoutCache);
      if (timeoutMode) {
        try { this.setFieldValue(timeoutMode, 'TIMEOUT_MODE'); } catch (e) { }
      }
      this.updateTimeoutInput_(true);
    }
  };

  // PID follow line until cross (+)
  Blockly.Blocks['PID_follow_line_cross'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Drive")
        .appendField(new Blockly.FieldDropdown([["2WD", "0"], ["4WD", "1"]]), "DRIVE")
        .appendField("Move")
        .appendField(new Blockly.FieldDropdown([["Forward", "FWD"], ["Backward", "BWD"]]), "DIR")
        .appendField("PIDlineCross+");

      this.appendValueInput("SPEED").setCheck("Number").appendField("Speed=");
      this.appendValueInput("KP").setCheck("Number").appendField("KP=");
      this.appendValueInput("KD").setCheck("Number").appendField("KD=");

      this.appendValueInput("ENC_CUR").setCheck("Number").appendField("Read Encoder");
      this.appendValueInput("SUM_THRESHOLD").setCheck("Number").appendField("Sumsensor >=");

      this.appendValueInput("CROSS_COUNT").setCheck("Number").appendField("Crosses");
      this.appendDummyInput()
        .appendField("Mode")
        .appendField(new Blockly.FieldDropdown([["Encoder pulses", "ENC"], ["Time (ms)", "TIME"]]), "EXTRA_MODE");
      this.appendValueInput("EXTRA_PULSES").setCheck("Number");

      this.appendValueInput("STOP_DELAY").setCheck("Number").appendField("Stop Delay (ms)=");
      this.appendDummyInput("TIMEOUT_MODE_ROW")
        .appendField("Timeout")
        .appendField(new Blockly.FieldDropdown([["No Timeout", "OFF"], ["Timeout", "ON"]]), "TIMEOUT_MODE");

      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("Follow line with PID until N crosses (+), then extra pulses, stop and delay. Optional encoder reset and timeout.");
      this._updatingTimeoutInput = false;
      this._autoShadowIds = {};
      this._customCacheNum = { timeout: '1000' };
      this._extraLabelText = '';
      this.updateExtraLabel_();
      this.updateTimeoutInput_(true);
      setTimeout(() => {
        if (!this.workspace || this.isInFlyout) return;
        this.updateExtraLabel_();
        this.updateTimeoutInput_();
      }, 0);
    },
    updateExtraLabel_: function () {
      var input = this.getInput('EXTRA_PULSES');
      if (!input) return;
      var nextLabel = (this.getFieldValue('EXTRA_MODE') === 'TIME')
        ? 'Move more after line ms='
        : 'Move more after line pulses=';
      if (this._extraLabelText === nextLabel) return;
      if (typeof input.removeField === 'function') {
        try { input.removeField('EXTRA_PULSES_LABEL'); } catch (e) { }
      }
      input.appendField(nextLabel, 'EXTRA_PULSES_LABEL');
      this._extraLabelText = nextLabel;
      if (this.rendered) this.render();
    },
    updateTimeoutInput_: function (skipRender) {
      if (this._updatingTimeoutInput) return;
      this._updatingTimeoutInput = true;
      try {
        var useTimeout = this.getFieldValue('TIMEOUT_MODE') === 'ON';
        var ensureShadow = (inputName, defaultNum) => {
          var input = this.getInput(inputName);
          if (!input || !input.connection || input.connection.targetBlock()) return;
          var shadowBlock = this.workspace.newBlock('math_number');
          shadowBlock.setShadow(true);
          shadowBlock.data = 'PID_follow_line_cross_auto_shadow';
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
          if (target.type === 'math_number') {
            var num = target.getFieldValue('NUM');
            if (typeof num !== 'undefined' && num !== null && String(num).length > 0) {
              this._customCacheNum[inputName] = String(num);
            }
          }
        };
        if (useTimeout && !this.getInput('TIMEOUT_MS')) {
          this.appendValueInput('TIMEOUT_MS')
            .setCheck('Number')
            .appendField('Timeout(ms)');
          ensureShadow('TIMEOUT_MS', this._customCacheNum.timeout || '1000');
        } else if (!useTimeout && this.getInput('TIMEOUT_MS')) {
          cacheInputNumber('TIMEOUT_MS');
          disposeTrackedAuto('TIMEOUT_MS');
          this.removeInput('TIMEOUT_MS', true);
        }
        if (!skipRender && this.rendered) this.render();
      } finally {
        this._updatingTimeoutInput = false;
      }
    },
    onchange: function () {
      if (!this.workspace || this.isInFlyout) return;
      this.updateExtraLabel_();
      this.updateTimeoutInput_();
    },
    mutationToDom: function () {
      var m = document.createElement('mutation');
      m.setAttribute('timeout_mode', this.getFieldValue('TIMEOUT_MODE') || 'OFF');
      m.setAttribute('timeout_cache', (this._customCacheNum && this._customCacheNum.timeout) ? String(this._customCacheNum.timeout) : '1000');
      return m;
    },
    domToMutation: function (xml) {
      if (!xml) return;
      var timeoutMode = xml.getAttribute('timeout_mode');
      var timeoutCache = xml.getAttribute('timeout_cache');
      if (!this._customCacheNum) this._customCacheNum = { timeout: '1000' };
      if (timeoutCache) this._customCacheNum.timeout = String(timeoutCache);
      if (timeoutMode) {
        try { this.setFieldValue(timeoutMode, 'TIMEOUT_MODE'); } catch (e) { }
      }
      this.updateTimeoutInput_(true);
    }
  };



}


