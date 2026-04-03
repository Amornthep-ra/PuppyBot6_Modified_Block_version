
//Block from IKB1 

module.exports = function(Blockly){
  'use strict';

Blockly.Blocks['PuppyBotmotor_Mecanum'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Move Mecanum 🚀")
      .appendField("direction")
      .appendField(new Blockly.FieldDropdown([["⬆ Forward","1"], ["⬇ Backward", "2"]
                                              , ["⬅ TurnLeft", "3"], ["➡ TurnRight", "4"]
                                              , ["⬅ SpinLeft", "5"], ["➡ SpinRight", "6"]
                                              , ["↔ Side way Left", "7"], ["↔ Side way Right", "8"]
                                              , ["↖ diagonal Left", "9"], ["↗ diagonal Right", "10"]]), "dir");
    this.appendValueInput("speed")
      .setCheck("Number")
      .appendField("speed");
    this.appendDummyInput()
      .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
  }
};

Blockly.Blocks['PuppyBot'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("set motor")
      .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["ALL","7"]]), "ch")
      .appendField("direction")
      .appendField(new Blockly.FieldDropdown([["Forward"," "], ["Backward", "-"]]), "dir");
    this.appendValueInput("speed")
      .setCheck("Number")
      .appendField("speed");
    this.appendDummyInput()
      .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
  }
};

Blockly.Blocks['PuppyBot_servo'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("set servo")
      .appendField(new Blockly.FieldDropdown([["1","0"], ["2","1"], ["3","2"], ["4","3"], ["5","4"], ["6","5"]]), "ch");
    this.appendValueInput("angle")
      .setCheck("Number")
      .appendField("degree");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
  }
};

Blockly.Blocks['PuppyBot_servo2'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("set servo")
      .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "ch")
      .appendField("direction")
      .appendField(new Blockly.FieldDropdown([["Forward","1"], ["Backward", "2"]]), "dir");
    this.appendValueInput("speed")
      .setCheck("Number")
      .appendField("speed");
    this.appendDummyInput()
      .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
  }
};
Blockly.Blocks['PuppyBot_servo_speed_control'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("set servo")
      .appendField(new Blockly.FieldDropdown([["1","0"], ["2","1"], ["3","2"], ["4","3"], ["5","4"], ["6","5"]]), "ch");
    this.appendValueInput("servo_degree")
      .setCheck("Number")
      .appendField("Degree:");
    this.appendValueInput("traget_degree")
      .setCheck("Number")
      .appendField("To");
    this.appendValueInput("Step")
      .setCheck("Number")
      .appendField("By");
    this.appendDummyInput()
      .appendField("At speed:")
      .appendField(new Blockly.FieldDropdown([["1","15"],
                                              ["2","14"],
                                              ["3","13"],
                                              ["4","12"],
                                              ["5","11"],
                                              ["6","10"],
                                              ["7","9"],
                                              ["8","8"],
                                              ["9","7"],
                                              ["10","6"]]), "speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
  }
};


Blockly.Blocks['PuppyBot_dual_motor_drive'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('Drive')
      .appendField(new Blockly.FieldDropdown([['2WD','2'],['4WD','4'],['6WD','6']]), 'drive')
      .appendField('Move')
      .appendField(new Blockly.FieldDropdown([['Forward','FWD'],['Backward','BWD']]), 'dir');
    this.appendValueInput('left_speed')
      .setCheck('Number')
      .appendField('Left Motor Speed%');
    this.appendDummyInput()
    this.appendValueInput('right_speed')
      .setCheck('Number')
      .appendField('Right Motor Speed%');
    this.appendDummyInput()
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
  }
};
Blockly.Blocks['PuppyBot_turn_spin_move'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('Drive')
      .appendField(new Blockly.FieldDropdown([['2WD','2'],['4WD','4'],['6WD','6']]), 'drive')
      .appendField('Move')
      .appendField(new Blockly.FieldDropdown([
        ['\u2B05 TurnLeft', 'TL'],
        ['\u27A1 TurnRight', 'TR'],
        ['\u21BA SpinLeft', 'SL'],
        ['\u21BB SpinRight', 'SR']
      ]), 'MODE');
    this.appendValueInput('speed')
      .setCheck('Number')
      .appendField('at speed');
    this.appendDummyInput()
      .appendField('%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
  }
};
Blockly.Blocks['PuppyBot_stop_select'] = {
  init: function() {
    this.appendDummyInput('MAIN')
      .appendField('Stop Moving')
      .appendField(new Blockly.FieldDropdown([
        ['all', 'ALL'],
        ['M1', '1'],
        ['M2', '2'],
        ['M3', '3'],
        ['M4', '4']
      ]), 'TARGET')
      .appendField(new Blockly.FieldDropdown([
        ['Now', 'NOW'],
        ['With Time', 'TIME']
      ]), 'MODE');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('Stop all motors or a selected channel, immediately or with delay.');
    this._updatingTimeInput = false;
    this._autoShadowIds = {};
    this._customCacheNum = { time: '500' };
    this.updateTimeInput_(true);
    setTimeout(() => {
      if (!this.workspace || this.isInFlyout) return;
      this.updateTimeInput_();
    }, 0);
  },
  updateTimeInput_: function(skipRender) {
    if (this._updatingTimeInput) return;
    this._updatingTimeInput = true;
    try {
      var mode = this.getFieldValue('MODE');
      var useTime = (mode === 'TIME');

      var ensureShadow = (inputName, defaultNum) => {
        var input = this.getInput(inputName);
        if (!input || !input.connection || input.connection.targetBlock()) return;
        var shadowBlock = this.workspace.newBlock('math_number');
        shadowBlock.setShadow(true);
        shadowBlock.data = 'PuppyBot_stop_select_auto_shadow';
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

      if (useTime) {
        if (!this.getInput('time')) {
          this.appendValueInput('time').setCheck('Number').appendField('Delay(ms)');
        }
        ensureShadow('time', this._customCacheNum.time || '500');
      } else {
        cacheInputNumber('time');
        if (this.getInput('time')) {
          disposeTrackedAuto('time');
          this.removeInput('time');
        }
      }
    } finally {
      this._updatingTimeInput = false;
    }
    if (!skipRender && this.rendered) this.render();
  },
  onchange: function() {
    if (!this.workspace || this.isInFlyout) return;
    this.updateTimeInput_();
  },
  mutationToDom: function() {
    var m = document.createElement('mutation');
    m.setAttribute('mode', this.getFieldValue('MODE') || 'NOW');
    m.setAttribute('time_cache', (this._customCacheNum && this._customCacheNum.time) ? String(this._customCacheNum.time) : '500');
    return m;
  },
  domToMutation: function(xml) {
    if (!xml) return;
    var mode = xml.getAttribute('mode');
    var timeCache = xml.getAttribute('time_cache');
    if (!this._customCacheNum) this._customCacheNum = { time: '500' };
    if (timeCache) this._customCacheNum.time = String(timeCache);
    if (mode) {
      try { this.setFieldValue(mode, 'MODE'); } catch (e) {}
    }
    this.updateTimeInput_(true);
  }
};
Blockly.Blocks['PuppyBot_drive_move'] = {
  init: function() {
    this.appendDummyInput('MAIN')
      .appendField("Drive")
      .appendField(new Blockly.FieldDropdown([["2WD","2"],["4WD","4"],["6WD","6"]]), "drive")
      .appendField("Move")
      .appendField(new Blockly.FieldDropdown([
        ["⬆ Forward","FWD"],
        ["⬇ Backward","BWD"],
        ["⬅ TurnLeft","TL"],
        ["➡ TurnRight","TR"],
        ["↺ SpinLeft","SL"],
        ["↻ SpinRight","SR"]
      ]), "dir")

    this.appendValueInput("speed").setCheck("Number").appendField("speed%");
    this.appendValueInput("delay_ms").setCheck("Number").appendField("delay (ms)");
    this.appendDummyInput("STOP_ROW")
      .appendField(new Blockly.FieldDropdown([["No Stop","NO_STOP"],["Stop","STOP"]]), "STOP_MODE");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this._updatingStopDelay = false;
    this._autoShadowIds = {};
    this._customCacheNum = { stop_delay: '200' };
    this.updateStopDelayInput_(true);
    setTimeout(() => {
      if (!this.workspace || this.isInFlyout) return;
      this.updateStopDelayInput_();
    }, 0);
  },
  updateStopDelayInput_: function(skipRender) {
    if (this._updatingStopDelay) return;
    this._updatingStopDelay = true;
    try {
      var stopMode = this.getFieldValue('STOP_MODE');
      var useStopDelay = (stopMode === 'STOP');

      var ensureShadow = (inputName, defaultNum) => {
        var input = this.getInput(inputName);
        if (!input || !input.connection || input.connection.targetBlock()) return;
        var shadowBlock = this.workspace.newBlock('math_number');
        shadowBlock.setShadow(true);
        shadowBlock.data = 'PuppyBot_drive_move_auto_shadow';
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

      if (useStopDelay) {
        if (!this.getInput('stop_delay')) {
          this.appendValueInput('stop_delay').setCheck('Number').appendField('delay (ms)');
        }
        ensureShadow('stop_delay', this._customCacheNum.stop_delay || '200');
      } else {
        cacheInputNumber('stop_delay');
        if (this.getInput('stop_delay')) {
          disposeTrackedAuto('stop_delay');
          this.removeInput('stop_delay');
        }
      }
    } finally {
      this._updatingStopDelay = false;
    }
    if (!skipRender && this.rendered) this.render();
  },
  onchange: function() {
    if (!this.workspace || this.isInFlyout) return;
    this.updateStopDelayInput_();
  },
  mutationToDom: function() {
    var m = document.createElement('mutation');
    m.setAttribute('stop_mode', this.getFieldValue('STOP_MODE') || 'NO_STOP');
    m.setAttribute('stop_delay_cache', (this._customCacheNum && this._customCacheNum.stop_delay) ? String(this._customCacheNum.stop_delay) : '200');
    return m;
  },
  domToMutation: function(xml) {
    if (!xml) return;
    var stopMode = xml.getAttribute('stop_mode');
    var stopDelayCache = xml.getAttribute('stop_delay_cache');
    if (!this._customCacheNum) this._customCacheNum = { stop_delay: '200' };
    if (stopDelayCache) this._customCacheNum.stop_delay = String(stopDelayCache);
    if (stopMode) {
      try { this.setFieldValue(stopMode, 'STOP_MODE'); } catch (e) {}
    }
    this.updateStopDelayInput_(true);
  }
};


}
