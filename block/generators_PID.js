
//Block from IKB1 


module.exports = function (Blockly) {

  Blockly.JavaScript['Run_following_of_line'] = function (block) {
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    code += 'Run_following_of_line( ' + value_speed + ');\n';
    return code;
  };
    Blockly.JavaScript['PuppyBot_PID_setPin_select'] = function (block) {
    var side = block.getFieldValue('SIDE');
    var value_numSensor = block.getFieldValue('numSensor');
    var value_s0 = block.getFieldValue('S0_Pin');
    var value_s1 = block.getFieldValue('S1_Pin');
    var value_s2 = block.getFieldValue('S2_Pin');
    var value_s3 = block.getFieldValue('S3_Pin');
    var value_s4 = block.getFieldValue('S4_Pin');
    var value_s5 = block.getFieldValue('S5_Pin');
    var value_s6 = block.getFieldValue('S6_Pin');
    var value_s7 = block.getFieldValue('S7_Pin');
    var code = '';
    if (side === 'BACK') {
      code += 'PID_NumPin_B = ' + value_numSensor + ';	';
      code += 'PID_set_Pin_B(' + value_s0 + ',' + value_s1 + ',' + value_s2 + ',' + value_s3 + ',' + value_s4 + ',' + value_s5 + ',' + value_s6 + ',' + value_s7 + ');\n';
    } else {
      code += 'PID_NumPin = ' + value_numSensor + ';	';
      code += 'PID_set_Pin(' + value_s0 + ',' + value_s1 + ',' + value_s2 + ',' + value_s3 + ',' + value_s4 + ',' + value_s5 + ',' + value_s6 + ',' + value_s7 + ');\n';
    }
    return code;
  };

    Blockly.JavaScript['PuppyBot_PID_setline_color_select'] = function (block) {
    var side = block.getFieldValue('SIDE');
    var value_line_color = block.getFieldValue('line_color');
    var code = '';
    if (side === 'BACK') {
      code += 'Back_color = ' + value_line_color + ';';
    } else {
      code += 'Front_color = ' + value_line_color + ';';
    }
    return code;
  };
    Blockly.JavaScript['PuppyBot_PID_setmode_sensor_select'] = function (block) {
    var side = block.getFieldValue('SIDE');
    var code = '';
    if (side === 'BACK') {
      code += 'PID_NumPin_B = 8;	';
      code += 'PID_set_Pin_B(0,1,2,3,4,5,6,7);\n';
      code += 'Sensor_mode_B = 1;';
    } else {
      code += 'PID_NumPin = 8;	';
      code += 'PID_set_Pin(0,1,2,3,4,5,6,7);\n';
      code += 'Sensor_mode_F = 1;';
    }
    return code;
  };

  Blockly.JavaScript['PID_readLine_select'] = function (block) {
    var value_side = block.getFieldValue('SIDE');
    var code = (value_side === 'BACK') ? 'readline_B()' : 'readline()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  Blockly.JavaScript['PID_readSumSensor_select'] = function (block) {
    var value_side = block.getFieldValue('SIDE');
    var code = (value_side === 'BACK') ? 'Read_sumValue_sensor_B()' : 'Read_sumValue_sensor()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
    Blockly.JavaScript['PuppyBot_PID_setMin_select'] = function (block) {
    var side = block.getFieldValue('SIDE');
    var value_s0 = Blockly.JavaScript.valueToCode(block, 'S0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s6 = Blockly.JavaScript.valueToCode(block, 'S6', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s7 = Blockly.JavaScript.valueToCode(block, 'S7', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    if (side === 'BACK') {
      code += 'PID_set_Min_B(' + value_s0 + ',' + value_s1 + ',' + value_s2 + ',' + value_s3 + ',' + value_s4 + ',' + value_s5 + ',' + value_s6 + ',' + value_s7 + ');\n';
    } else {
      code += 'PID_set_Min(' + value_s0 + ',' + value_s1 + ',' + value_s2 + ',' + value_s3 + ',' + value_s4 + ',' + value_s5 + ',' + value_s6 + ',' + value_s7 + ');\n';
    }
    return code;
  };
  Blockly.JavaScript['PuppyBot_PID_setMax_select'] = function (block) {
    var side = block.getFieldValue('SIDE');
    var value_s0 = Blockly.JavaScript.valueToCode(block, 'S0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s6 = Blockly.JavaScript.valueToCode(block, 'S6', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_s7 = Blockly.JavaScript.valueToCode(block, 'S7', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    if (side === 'BACK') {
      code += 'PID_set_Max_B(' + value_s0 + ',' + value_s1 + ',' + value_s2 + ',' + value_s3 + ',' + value_s4 + ',' + value_s5 + ',' + value_s6 + ',' + value_s7 + ');\n';
    } else {
      code += 'PID_set_Max(' + value_s0 + ',' + value_s1 + ',' + value_s2 + ',' + value_s3 + ',' + value_s4 + ',' + value_s5 + ',' + value_s6 + ',' + value_s7 + ');\n';
    }
    return code;
  };
Blockly.JavaScript['PuppyBot_Run_PID_select'] = function (block) {
    var value_side = block.getFieldValue('SIDE');
    var value_Driver = block.getFieldValue('Driver');
    var value_dir = block.getFieldValue('DIR') || 'FWD';
    var value_check = block.getFieldValue('CHECK_MODE');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_KP = Blockly.JavaScript.valueToCode(block, 'KP', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_KD = Blockly.JavaScript.valueToCode(block, 'KD', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_sum = Blockly.JavaScript.valueToCode(block, 'sumSensor', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var signedSpeed = (value_dir === 'BWD') ? ('-(' + value_speed + ')') : value_speed;
    var code = '';
    if (value_side === 'BACK') {
      if (value_check === 'CHECK') {
        if (value_Driver == '0') { code += 'Run_PID_B_until_backSensor(' + signedSpeed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID_B4DW_until_backSensor(' + signedSpeed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
      } else {
        if (value_Driver == '0') { code += 'Run_PID_B(' + signedSpeed + ',' + value_KP + ',' + value_KD + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID_B4DW(' + signedSpeed + ',' + value_KP + ',' + value_KD + ');\n'; }
      }
    } else {
      if (value_check === 'CHECK') {
        if (value_Driver == '0') { code += 'Run_PID_until_frontSensor(' + signedSpeed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID4DW_until_frontSensor(' + signedSpeed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
      } else {
        if (value_Driver == '0') { code += 'Run_PID(' + signedSpeed + ',' + value_KP + ',' + value_KD + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID4DW(' + signedSpeed + ',' + value_KP + ',' + value_KD + ');\n'; }
      }
    }
    return code;
  };

  Blockly.JavaScript['PuppyBot_Run_PD_V2_select'] = function (block) {
    var value_side = block.getFieldValue('SIDE');
    var value_Driver = block.getFieldValue('Driver');
    var value_dir = block.getFieldValue('DIR') || 'FWD';
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_KP = Blockly.JavaScript.valueToCode(block, 'KP', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_KD = Blockly.JavaScript.valueToCode(block, 'KD', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var signedSpeed = (value_dir === 'BWD') ? ('-(' + value_speed + ')') : value_speed;
    var sideMode = (value_side === 'BACK') ? '1' : '0';
    var code = '';
    code += 'PuppyBot_Run_PD_V2(' + sideMode + ',' + value_Driver + ',' + signedSpeed + ',' + value_KP + ',' + value_KD + ');\n';
    return code;
  };

  Blockly.JavaScript['PuppyBot_Run_PID_color_select'] = function (block) {
    var value_side = block.getFieldValue('SIDE');
    var value_line_color = block.getFieldValue('LINE_COLOR');
    var value_Driver = block.getFieldValue('Driver');
    var value_check_mode = block.getFieldValue('CHECK_MODE');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_KP = Blockly.JavaScript.valueToCode(block, 'KP', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_KD = Blockly.JavaScript.valueToCode(block, 'KD', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var value_sum = Blockly.JavaScript.valueToCode(block, 'sumSensor', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    if (value_side === 'FRONT') {
      code += 'Front_color = ' + value_line_color + ';\n';
      if (value_check_mode === 'CHECK') {
        if (value_Driver == '0') { code += 'Run_PID_until_frontSensor(' + value_speed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID4DW_until_frontSensor(' + value_speed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
      } else {
        if (value_Driver == '0') { code += 'Run_PID(' + value_speed + ',' + value_KP + ',' + value_KD + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID4DW(' + value_speed + ',' + value_KP + ',' + value_KD + ');\n'; }
      }
    } else {
      code += 'Back_color = ' + value_line_color + ';\n';
      if (value_check_mode === 'CHECK') {
        if (value_Driver == '0') { code += 'Run_PID_B_until_backSensor(' + value_speed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID_B4DW_until_backSensor(' + value_speed + ',' + value_KP + ',' + value_KD + ',' + value_sum + ');\n'; }
      } else {
        if (value_Driver == '0') { code += 'Run_PID_B(' + value_speed + ',' + value_KP + ',' + value_KD + ');\n'; }
        if (value_Driver == '1') { code += 'Run_PID_B4DW(' + value_speed + ',' + value_KP + ',' + value_KD + ');\n'; }
      }
    }
    return code;
  };

  Blockly.JavaScript['set_calibrate_sensor_select'] = function (block) {
    var side = block.getFieldValue('SIDE');
    var value_Round = Blockly.JavaScript.valueToCode(block, 'Round', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    if (side === 'BACK') {
      code += 'setCalibrate_B(' + value_Round + ');\n';
    } else {
      code += 'setCalibrate(' + value_Round + ');\n';
    }
    return code;
  };
  Blockly.JavaScript['set_Sensitive_Front_sensor'] = function (block) {
    var value_Round = Blockly.JavaScript.valueToCode(block, 'Sensitive', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    code += 'setSensitive_F(' + value_Round + ');\n';
    return code;
  };
  Blockly.JavaScript['Read_Ref_Sensor_select'] = function (block) {
    var value_side = block.getFieldValue('SIDE');
    var value_Sensor_Pin = block.getFieldValue('Sensor_Pin');
    var minFn = (value_side === 'BACK') ? 'ReadSensorMinValue_B' : 'ReadSensorMinValue';
    var maxFn = (value_side === 'BACK') ? 'ReadSensorMaxValue_B' : 'ReadSensorMaxValue';
    var code = '';
    code += '(' + minFn + '(' + value_Sensor_Pin + ')+' + maxFn + '(' + value_Sensor_Pin + '))/2';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['Read_Status_Sensor_select'] = function (block) {
    var value_side = block.getFieldValue('SIDE');
    var value_Sensor_Pin = block.getFieldValue('Sensor_Pin');
    var value_line_color = block.getFieldValue('line_color');
    var fn = (value_side === 'BACK') ? 'Read_status_sensor_B' : 'Read_status_sensor';
    var code = '';
    if (value_line_color == '0') {
      code += fn + '(' + value_Sensor_Pin + ')';
    }
    else {
      code += '!' + fn + '(' + value_Sensor_Pin + ')';
    }
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };






  Blockly.JavaScript['Run_following_of_line_B'] = function (block) {
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    code += 'Run_following_of_line_B( ' + value_speed + ');\n';
    return code;
  };
              Blockly.JavaScript['set_Sensitive_Back_sensor'] = function (block) {
    var value_Round = Blockly.JavaScript.valueToCode(block, 'Sensitive', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    code += 'setSensitive_B(' + value_Round + ');\n';
    return code;
  };




















  Blockly.JavaScript['EditTextCode'] = function (block) {
    //var value_text = Blockly.JavaScript.valueToCode(block, 'Text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_text = Blockly.JavaScript.valueToCode(block, 'Text', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    code += '' + value_text + '\n';
    code = code.substring(8, code.length - 3);
    return code;
  };

  Blockly.JavaScript['BlockComment'] = function (block) {
    //var value_text = Blockly.JavaScript.valueToCode(block, 'Text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_text = Blockly.JavaScript.valueToCode(block, 'Text', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    return code;
  };

  Blockly.JavaScript['basic_forever_timeout'] = function (block) {
    var value_timer = Blockly.JavaScript.valueToCode(block, 'timer', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var statements_code = Blockly.JavaScript.statementToCode(block, 'HANDLER');
    var code = `loop_timer = millis();
    while(millis() - loop_timer < ${value_timer}) \n{${statements_code}\n}\n`;
    // var code = `
    //   if(${variable_instance}.decode(&results)) \n{${statements_code}\n${variable_instance}.resume();}\n`;
    return code;
  };
  Blockly.JavaScript['basic_forever_count'] = function (block) {
    var value_timer = Blockly.JavaScript.valueToCode(block, 'timer', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var statements_code = Blockly.JavaScript.statementToCode(block, 'HANDLER');
    var code = `for(int _loop_count_time=0;_loop_count_time < ${value_timer};_loop_count_time++) \n{${statements_code}\n}\n`;
    // var code = `
    //   if(${variable_instance}.decode(&results)) \n{${statements_code}\n${variable_instance}.resume();}\n`;
    return code;
  };

  //เพิ่มใหม่ 17/09/2025
 // PID follow line by encoder
Blockly.JavaScript['PID_follow_line_by_encoder'] = function(block) {
  var drive = block.getFieldValue('DRIVE');    
  var dir = block.getFieldValue('DIR');        
  var speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var KP = Blockly.JavaScript.valueToCode(block, 'KP', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var KD = Blockly.JavaScript.valueToCode(block, 'KD', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var encCur = Blockly.JavaScript.valueToCode(block, 'ENC_CUR', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var pulses = Blockly.JavaScript.valueToCode(block, 'PULSES', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var timeoutMode = block.getFieldValue('TIMEOUT_MODE') || 'OFF';
  var timeoutMs = (timeoutMode === 'ON')
    ? (Blockly.JavaScript.valueToCode(block, 'TIMEOUT_MS', Blockly.JavaScript.ORDER_ATOMIC) || '1000')
    : '0';

  // ถ้า user ไม่เสียบ encoder → default selection_Encoder
  var baseRead = encCur ? encCur : 'get_pulse_Encoder(selection_Encoder)';

  var runPID = (drive === '1') ? 'Run_PID4DW' : 'Run_PID';
  var signedSpeed = (dir === 'BWD') ? ('-(' + speed + ')') : (speed);

  var code = '';
  code += '{\n';
  code += '  follow_line_by_encoder_safe(' + drive + ',' + signedSpeed + ',' + KP + ',' + KD + ',' + pulses + ',' + timeoutMs + ', []()->long { return ' + baseRead + '; });\n';
  code += '}\n';

  return code;
};

// PID follow line until cross (+)
Blockly.JavaScript['PID_follow_line_cross'] = function(block) {
  var drive = block.getFieldValue('DRIVE');    
  var dir = block.getFieldValue('DIR');        
  var speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var KP = Blockly.JavaScript.valueToCode(block, 'KP', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var KD = Blockly.JavaScript.valueToCode(block, 'KD', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var encCur = Blockly.JavaScript.valueToCode(block, 'ENC_CUR', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var sumThreshold = Blockly.JavaScript.valueToCode(block, 'SUM_THRESHOLD', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var crosses = Blockly.JavaScript.valueToCode(block, 'CROSS_COUNT', Blockly.JavaScript.ORDER_ATOMIC) || '1';
  var extra = Blockly.JavaScript.valueToCode(block, 'EXTRA_PULSES', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var extraMode = block.getFieldValue('EXTRA_MODE') || 'ENC';
  var stopDelay = Blockly.JavaScript.valueToCode(block, 'STOP_DELAY', Blockly.JavaScript.ORDER_ATOMIC) || '100';
  var timeoutMode = block.getFieldValue('TIMEOUT_MODE') || 'OFF';
  var timeoutMs = (timeoutMode === 'ON')
    ? (Blockly.JavaScript.valueToCode(block, 'TIMEOUT_MS', Blockly.JavaScript.ORDER_ATOMIC) || '1000')
    : '0';

  var baseRead = encCur ? encCur : 'get_pulse_Encoder(selection_Encoder)';
  var runPID = (drive === '1') ? 'Run_PID4DW' : 'Run_PID';
  var signedSpeed = (dir === 'BWD') ? ('-(' + speed + ')') : (speed);

  var extraModeEnum = (extraMode === 'TIME') ? '1' : '0'; // 0=ENC, 1=TIME (int based)

  var code = '';
  code += '{\n';
  code += '  follow_line_cross_safe(' + drive + ',' + signedSpeed + ',' + KP + ',' + KD + ',' + sumThreshold + ',' + crosses + ',' + extra + ',' + extraModeEnum + ',' + stopDelay + ',' + timeoutMs + ', false, []()->long { return ' + baseRead + '; });\n';
  code += '}\n';

  return code;
};

}

