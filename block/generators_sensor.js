module.exports = function(Blockly){
  'use strict';
Blockly.JavaScript['sw1_press_select'] = function(block) {  
  var pin = block.getFieldValue('pin_sw1') || '3';
  var showMode = block.getFieldValue('show_mode') || 'ALL';
  var feedback = block.getFieldValue('feedback_mode') || 'BUZZER';
  var feedbackMode = '1';
  var buzzerHz = Blockly.JavaScript.valueToCode(block, 'BUZZER_HZ', Blockly.JavaScript.ORDER_ATOMIC) || '1000';
  var delayMs = Blockly.JavaScript.valueToCode(block, 'DELAY_MS', Blockly.JavaScript.ORDER_ATOMIC) || '200';
  if (feedback === 'SILENT_NO_DELAY') feedbackMode = '0';
  else if (feedback === 'BUZZER_CUSTOM') feedbackMode = '2';
  var code = `swpin = ${pin}; `;
  if (showMode === 'ONE') {
    code += `wait_SW1_one(${feedbackMode}, ${buzzerHz}, ${delayMs});\n`;
  } else {
    code += `wait_SW1_ALL(${feedbackMode}, ${buzzerHz}, ${delayMs});\n`;
  }
  // Always clear to black after SW1 is pressed.
  code += `tft_.fillScreen(ST77XX_BLACK);\n`;
  return code;
};
Blockly.JavaScript['button_1_status'] = function(block) {  
  var code = '(digitalRead(6))';  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['INPUT_digital'] = function(block) { 
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC) || '0'; 
  var code = '(IN('+value_pin+'))';  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['TCS_color_status'] = function(block) {
  var dropdown_pos = block.getFieldValue('POS') || 'F';
  var dropdown_pin = block.getFieldValue('_color');
  var readFn = (dropdown_pos == 'B') ? 'Read_Color_TCS_B' : 'Read_Color_TCS';
  var code = `(${readFn}(${dropdown_pin}))`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['TCS_setColorReadConfig'] = function(block) {
  var samples = block.getFieldValue('SAMPLES') || '7';
  var delayMs = block.getFieldValue('DELAY_MS') || '5';
  var code = `setColorReadConfig(${samples}, ${delayMs});\n`;
  return code;
};

Blockly.JavaScript['TCS_setColorDetectConfig'] = function(block) {
  var redR = block.getFieldValue('RED_R') || '200';
  var redG = block.getFieldValue('RED_G') || '62';
  var redB = block.getFieldValue('RED_B') || '62';
  var greenR = block.getFieldValue('GREEN_R') || '80';
  var greenG = block.getFieldValue('GREEN_G') || '140';
  var greenB = block.getFieldValue('GREEN_B') || '100';
  var blueR = block.getFieldValue('BLUE_R') || '80';
  var blueG = block.getFieldValue('BLUE_G') || '80';
  var blueB = block.getFieldValue('BLUE_B') || '160';
  var yellowR = block.getFieldValue('YELLOW_R') || '144';
  var yellowG = block.getFieldValue('YELLOW_G') || '113';
  var yellowB = block.getFieldValue('YELLOW_B') || '42';
  var blackR = block.getFieldValue('BLACK_R') || '133';
  var blackG = block.getFieldValue('BLACK_G') || '100';
  var blackB = block.getFieldValue('BLACK_B') || '100';
  var sumMin = block.getFieldValue('SUM_MIN') || '220';
  var chromaMin = block.getFieldValue('CHROMA_MIN') || '35';
  var normDistMax = block.getFieldValue('NORM_DIST_MAX') || '0.22';
  var blackNormDistMax = block.getFieldValue('BLACK_NORM_DIST_MAX') || '0.18';
  var yellowRgMin = block.getFieldValue('YELLOW_RG_MIN') || '180';
  var code = `setColorDetectConfig(${redR}, ${redG}, ${redB}, ${greenR}, ${greenG}, ${greenB}, ${blueR}, ${blueG}, ${blueB}, ${yellowR}, ${yellowG}, ${yellowB}, ${blackR}, ${blackG}, ${blackB}, ${sumMin}, ${chromaMin}, ${normDistMax}, ${blackNormDistMax}, ${yellowRgMin});\n`;
  return code;
};

Blockly.JavaScript['TCS_readColorSmoothed'] = function(block) {
  var readR = Blockly.JavaScript.valueToCode(block, 'READ_R', Blockly.JavaScript.ORDER_NONE) || '0';
  var readG = Blockly.JavaScript.valueToCode(block, 'READ_G', Blockly.JavaScript.ORDER_NONE) || '0';
  var readB = Blockly.JavaScript.valueToCode(block, 'READ_B', Blockly.JavaScript.ORDER_NONE) || '0';
  var varR = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR_R'), Blockly.Variables.NAME_TYPE);
  var varG = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR_G'), Blockly.Variables.NAME_TYPE);
  var varB = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR_B'), Blockly.Variables.NAME_TYPE);
  var tmpR = Blockly.JavaScript.variableDB_.getDistinctName('tmpColorR', Blockly.Variables.NAME_TYPE);
  var tmpG = Blockly.JavaScript.variableDB_.getDistinctName('tmpColorG', Blockly.Variables.NAME_TYPE);
  var tmpB = Blockly.JavaScript.variableDB_.getDistinctName('tmpColorB', Blockly.Variables.NAME_TYPE);
  var code = '';
  code += `long ${tmpR} = 0;\n`;
  code += `long ${tmpG} = 0;\n`;
  code += `long ${tmpB} = 0;\n`;
  code += `readColorSmoothedCustom([]() -> long { return (long)(${readR}); }, []() -> long { return (long)(${readG}); }, []() -> long { return (long)(${readB}); }, &${tmpR}, &${tmpG}, &${tmpB});\n`;
  code += `${varR} = ${tmpR};\n`;
  code += `${varG} = ${tmpG};\n`;
  code += `${varB} = ${tmpB};\n`;
  return code;
};

Blockly.JavaScript['TCS_detectColorFromRGB'] = function(block) {
  var r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_NONE) || '0';
  var g = Blockly.JavaScript.valueToCode(block, 'G', Blockly.JavaScript.ORDER_NONE) || '0';
  var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = `(detectColorFromRGB(${r}, ${g}, ${b}))`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['TCS_color_config'] = function(block) {
  var dropdown_pinSDA = block.getFieldValue('pin_SDA');
  var dropdown_pinSCL = block.getFieldValue('pin_SCL');
  var code = `
              #SETUP  Wire1.setSDA(${dropdown_pinSDA});Wire1.setSCL(${dropdown_pinSCL});if (tcsB.begin(0x29,&Wire1)) {Serial.println("Found sensor");} #END `;
              // (Read_Color_TCS(${dropdown_pin}))`;
  return code;
};

Blockly.JavaScript['Light_Sensor'] = function(block) {
  var dropdown_pos = block.getFieldValue('POS') || 'F';
  var dropdown_pin = block.getFieldValue('pin');
  var readFn = (dropdown_pos == 'B') ? 'ADC_B' : 'ADC';
  var code = `(${readFn}(${dropdown_pin}))`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['Light_Sensor_F'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var code = `(ADC_F(${dropdown_pin}))`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['Ultrasonic_sensor'] = function(block) {  
  var dropdown_pin_Echo = block.getFieldValue('pin_Echo');
  var dropdown_pin_Trig = block.getFieldValue('pin_Trig');
  var code = `(ultrasonic(${dropdown_pin_Echo},${dropdown_pin_Trig}))`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['IMU_begin'] = function(block) {  
  var dropdown_Mode = block.getFieldValue('Mode');
  var dropdown_pos_encoder = block.getFieldValue('pos_encoder');
  var value_s0 = block.getFieldValue('S0') || '15';
  var value_s1 = block.getFieldValue('S1') || '60';
  var value_s2 = block.getFieldValue('S2') || '4';
  var value_s3 = block.getFieldValue('S3') || '5';
  var value_s4 = block.getFieldValue('S4') || '1';
  var code = '';
  if (dropdown_pos_encoder === '0') {
    code = '#SETUP sw1_enable_gyro_countdown(); Set_Mode_Gyro = ('+dropdown_Mode+'); #END\n';
  } else {
    code = '#SETUP sw1_enable_gyro_countdown(); Set_Mode_Gyro = ('+dropdown_Mode+'); init_encoder('+dropdown_pos_encoder+'); selection_Encoder = ('+dropdown_pos_encoder+');  #END\n';
  }
  code += 'set_data_for_turnDirection('+value_s4+','+value_s0+','+value_s1+','+value_s2+','+value_s3+');\n';
  return code;
};
   Blockly.JavaScript['IMU_resetTo180'] = function (block) {
    var code = 'status_resetYaw180=1;\n';
    return code;
  };
Blockly.JavaScript['IMU_update'] = function(block) {  
  var code = 'mpu6050.update();\n';
  return code;
};
Blockly.JavaScript['IMU_getData_Yaw'] = function(block) {
  var dropdown_axis = block.getFieldValue('axis');

  var code = ``;
  if(dropdown_axis == '0'){code += `yaw_loop1`}
    if(dropdown_axis == '1'){code += `Con_yaw_loop1`}
      if(dropdown_axis == '2'){code += `offset_yaw_loop1`}
      if(dropdown_axis == '3'){code += `Fix_direction()`}
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['IMU_direction_to_angle'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');

  var code = ``;
  if(dropdown_direction == '0'){code += `normalizeAngle(offset_yaw_loop1)`}
    if(dropdown_direction == '1'){code += `normalizeAngle(offset_yaw_loop1 + 90)`}
      if(dropdown_direction == '2'){code += `normalizeAngle(offset_yaw_loop1 + 180)`}
        if(dropdown_direction == '3'){code += `normalizeAngle(offset_yaw_loop1 - 90)`}
          if(dropdown_direction == '4'){code += `normalizeAngle(offset_yaw_loop1 - 135)`}
            if(dropdown_direction == '5'){code += `normalizeAngle(offset_yaw_loop1 - 45)`}
              if(dropdown_direction == '6'){code += `normalizeAngle(offset_yaw_loop1 + 45)`}
                if(dropdown_direction == '7'){code += `normalizeAngle(offset_yaw_loop1 + 135)`}
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['IMU_getData'] = function(block) {
  var dropdown_axis = block.getFieldValue('axis');

  var code = ``;
  // Use loop1-cached IMU values to avoid extra reads in loop().
  if(dropdown_axis == '0'){code += `pitch_loop1`}
    if(dropdown_axis == '1'){code += `roll_loop1`}
      if(dropdown_axis == '2'){code += `yaw_loop1`}
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['IMU_set_dataFor_turnDirection'] = function(block) {
  var value_s0 = Blockly.JavaScript.valueToCode(block, 'S0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var code = '';
  //code += 'PID_NumPin = ' + value_numSensor+';\t';
  code += 'set_data_for_turnDirection('+value_s4+','+value_s0+','+value_s1+','+value_s2+','+value_s3+');\n';
  return code;
};

Blockly.JavaScript['Puppy_beep'] = function(block) {
  return 'buzzer(1000,100);\n';
};

Blockly.JavaScript['IMU_TurnByDirection'] = function(block) {
  var dropdown_condition = block.getFieldValue('condition') || '0';
  var dropdown_direction = block.getFieldValue('direction') || '0';
  var targetExpr = 'normalizeAngle(offset_yaw_loop1)';
  if (dropdown_direction == '1') targetExpr = 'normalizeAngle(offset_yaw_loop1 + 90)';
  if (dropdown_direction == '2') targetExpr = 'normalizeAngle(offset_yaw_loop1 + 180)';
  if (dropdown_direction == '3') targetExpr = 'normalizeAngle(offset_yaw_loop1 - 90)';
  if (dropdown_direction == '4') targetExpr = 'normalizeAngle(offset_yaw_loop1 - 135)';
  if (dropdown_direction == '5') targetExpr = 'normalizeAngle(offset_yaw_loop1 - 45)';
  if (dropdown_direction == '6') targetExpr = 'normalizeAngle(offset_yaw_loop1 + 45)';
  if (dropdown_direction == '7') targetExpr = 'normalizeAngle(offset_yaw_loop1 + 135)';
  return 'turnPID(' + dropdown_condition + ',' + targetExpr + ', speedMin_turnDirection, speedMax_turnDirection, turnDirection_PID_KP, turnDirection_PID_KD);\n';
};

Blockly.JavaScript['IMU_TurnByAngle'] = function(block) {
  var dropdown_condition = block.getFieldValue('condition') || '0';
  var dropdown_angle = block.getFieldValue('angle') || '0';
  var turnAngle = '90';
  if (dropdown_angle == '1') turnAngle = '-90';
  if (dropdown_angle == '2') turnAngle = '180';
  if (dropdown_angle == '3') turnAngle = '-180';
  if (dropdown_angle == '4') turnAngle = '45';
  if (dropdown_angle == '5') turnAngle = '-45';
  return 'turnByAngle(' + turnAngle + ',' + dropdown_condition + ');\n';
};

Blockly.JavaScript['IMU_TurnPID'] = function(block) {
  var value_s0 = Blockly.JavaScript.valueToCode(block, 'S0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var dropdown_condition = block.getFieldValue('condition');
  var code = '';
  //code += 'PID_NumPin = ' + value_numSensor+';\t';
  code += 'turnPID('+dropdown_condition+','+value_s0+','+value_s1+','+value_s2+','+value_s3+','+value_s4+');\n';
  return code;
};


Blockly.JavaScript['IMU_moveStraightCurveStraight_Encoder'] = function(block) {
  var dropdown_dir = block.getFieldValue('dir');
  var value_s0 = Blockly.JavaScript.valueToCode(block, 'S0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s6 = Blockly.JavaScript.valueToCode(block, 'S6', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var checkbox_brake = (block.getFieldValue('BRAKE') == 'TRUE') ? '1' : '0';
  var checkbox_stop = (block.getFieldValue('STOP') == 'TRUE') ? '1' : '0';

  var code = '#SETUP init_encoder(selection_Encoder);\n#END\n';
  code += 'moveStraightOnlyToPulse_Encoder('
    + dropdown_dir + ',' + value_s0 + ',' + value_s1 + ',' + value_s3 + ',' + value_s4 + ',' + value_s6 + ',' + checkbox_brake + ',' + checkbox_stop + ');\n';
  return code;
};

Blockly.JavaScript['IMU_moveStraightCurveTurn_Encoder'] = function(block) {
  var dropdown_dir = block.getFieldValue('dir');
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s7 = Blockly.JavaScript.valueToCode(block, 'S7', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s8 = Blockly.JavaScript.valueToCode(block, 'S8', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s9 = Blockly.JavaScript.valueToCode(block, 'S9', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s10 = Blockly.JavaScript.valueToCode(block, 'S10', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s11 = Blockly.JavaScript.valueToCode(block, 'S11', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var checkbox_lock = (block.getFieldValue('LOCK') == 'TRUE') ? '1' : '0';
  var checkbox_stop = (block.getFieldValue('STOP') == 'TRUE') ? '1' : '0';
  var dropdown_curve_slowdown = block.getFieldValue('CURVE_SLOWDOWN') || '1';
  var dropdown_turn_style = block.getFieldValue('TURN_STYLE') || '0';

  var code = '#SETUP init_encoder(selection_Encoder);\n#END\n';
  code += 'curveTurnToYaw_Encoder('
    + dropdown_dir + ',' + value_s2 + ',' + value_s7 + ',' + value_s8 + ',' + value_s9 + ',' + value_s10 + ',' + value_s11 + ','
    + checkbox_lock + ',' + checkbox_stop + ',' + dropdown_curve_slowdown + ',' + dropdown_turn_style + ');\n';
  return code;
};

Blockly.JavaScript['IMU_moveStraightPID_step'] = function(block) {
  var dropdown_dir = block.getFieldValue('dir');
  //var dropdown_angle = block.getFieldValue('angle');
  var value_s0 = Blockly.JavaScript.valueToCode(block, 'S0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';

  var code = '';
  code += 'while(!'+value_s2+'){\n';
  code += 'moveStraightPID_step('+dropdown_dir+','+value_s0+','+value_s1+','+value_s3+','+value_s5+');\n';
  code += '}ao();';
  return code;
};

Blockly.JavaScript['IMU_moveStraightDirection_step'] = function(block) {
  var dropdown_dir = block.getFieldValue('dir');
  var dropdown_angle = block.getFieldValue('angle');
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';

  var code = '';
  code += 'while(!'+value_s2+'){\n';
  code += 'MoveStraightDirection_step('+dropdown_dir+','+dropdown_angle+','+value_s1+','+value_s3+','+value_s5+');\n';
  code += '}ao();';
  return code;
};



Blockly.JavaScript['reset_Encoder'] = function(block) {
  var dropdown_Mode = block.getFieldValue('Mode');  
  var code = 'resetEncoder('+dropdown_Mode+');\n';
  return code;
};
Blockly.JavaScript['read_Encoder'] = function(block) {
  var dropdown_Mode = block.getFieldValue('Mode');

  var code = 'get_pulse_Encoder('+dropdown_Mode+')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['IMU_moveStraightDirection_noLoop'] = function(block) {
  var dropdown_dir = block.getFieldValue('dir');
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';

  var code = '';
  code += 'moveStraightPID_step('+dropdown_dir+','+value_s2+','+value_s1+','+value_s3+','+value_s5+');\n';
  return code;
};


//เพิ่มใหม่ 17/09/2025


/* ===== Generator: Encoder Δ < target ? ===== */
if (typeof Blockly !== "undefined") {
  Blockly.JavaScript["encoder_delta_lt_target"] = function (block) {
    var target = Blockly.JavaScript.valueToCode(block, "TARGET", Blockly.JavaScript.ORDER_NONE) || "0";
    var absChk = (block.getFieldValue("ABS") === "TRUE");
    var absLiteral = absChk ? "true" : "false";

    var expr =
      "([&]()->bool{" +
      " static bool _enc_inited = false;" +
      " static bool _enc_started = false;" +
      " if(!_enc_inited){ init_encoder(selection_Encoder); _enc_inited = true; }" +
      " if(!_enc_started){ resetEncoder(selection_Encoder); _enc_started = true; }" +
      " long _cur = (long)(get_pulse_Encoder(selection_Encoder));" +
      " long _target = labs((long)(" + target + "));" +
      " long _delta = " + absLiteral + " ? labs(_cur) : _cur;" +
      " bool _keep = (_delta < _target);" +
      " if(!_keep){ _enc_started = false; }" +
      " return _keep;" +
      "})()";

    return [expr, Blockly.JavaScript.ORDER_LOGICAL_OR];
  };
}

Blockly.JavaScript['move_Go_Straight_Fix'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || 'Con_yaw_loop1';
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var runMode = block.getFieldValue('RUNMODE') || 'ENC';
  var checkbox_newline = (block.getFieldValue('Slow') == 'TRUE')? '1' : '0';

  var code = ``;
  if (runMode === 'TIME') {
    // วิ่งตามเวลา (ms) เผื่อไม่มี encoder
    code += 'moveStraightPID('+dropdown_direction+', '+value_angle+','+value_s1+','+value_s2+','+value_s3+','+value_s4+','+value_s5+','+checkbox_newline+');\n';
  } else { // ENC
    code += 'moveStraightPID_Encoder('+dropdown_direction+', '+value_angle+','+value_s1+','+value_s2+','+value_s3+','+value_s4+','+value_s5+','+checkbox_newline+');\n';
  }
  return code;
};





Blockly.JavaScript['mecanum_slide_fix'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || 'getClosestAngle(Con_yaw_loop1)';
  var runMode = block.getFieldValue('RUNMODE') || 'ENC';
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var checkbox_newline = (block.getFieldValue('Slow') == 'TRUE')? '1' : '0';

  var code = '';
  if (runMode === 'TIME') {
    code += 'mecanumSlidePID_time('+dropdown_direction+','+value_s1+','+value_s2+','+value_angle+','+value_s3+','+value_s4+','+value_s5+','+checkbox_newline+');\n';
  } else {
    code += 'mecanumSlidePID_Encoder('+dropdown_direction+','+value_s1+','+value_s2+','+value_angle+','+value_s3+','+value_s4+','+value_s5+','+checkbox_newline+');\n';
  }
  return code;
};

Blockly.JavaScript['wantloop_mecanum_slide_fix'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || 'getClosestAngle(Con_yaw_loop1)';
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC) || '0';

  var code = '';
  code += 'mecanumSlidePID_step('+dropdown_direction+','+value_s1+','+value_angle+','+value_s3+','+value_s4+','+value_s5+');\n';
  return code;
};

// Math: absolute value
Blockly.JavaScript["kb_abs"] = function (block) {
  var x = Blockly.JavaScript.valueToCode(block, "X", Blockly.JavaScript.ORDER_NONE) || "0";
  var code = "((" + x + ") < 0 ? -(" + x + ") : (" + x + "))";
  return [code, Blockly.JavaScript.ORDER_UNARY_MINUS];
};

// Move straight (loop only, snap heading; log pulses)
Blockly.JavaScript['move_straight_mode'] = function (block) {
  const dir = block.getFieldValue('DIR') || '0';
  const angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_NONE) || 'getClosestAngle(Con_yaw_loop1)';
  const speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_NONE) || '0';
  const kp   = Blockly.JavaScript.valueToCode(block, 'KP',    Blockly.JavaScript.ORDER_NONE) || '0';
  const kd   = Blockly.JavaScript.valueToCode(block, 'KD',    Blockly.JavaScript.ORDER_NONE) || '0';
  const varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

  let code = '';
  code += `moveStraightPID_step(${dir}, ${angle}, ${speed}, ${kp}, ${kd});\n`;
  code += `${varName} = get_pulse_Encoder(selection_Encoder);\n`;
  return code;
};

Blockly.JavaScript['knob_menu_n'] = function(block) {
    var pin = block.getFieldValue('pin');
    var n = parseInt(block.getFieldValue('n'));
    var swpin = block.getFieldValue('SWPIN') || '3';
    // helper convert #RRGGBB to 565
    function hexTo565(hex) {
      var r = parseInt(hex.substr(1, 2), 16);
      var g = parseInt(hex.substr(3, 2), 16);
      var b = parseInt(hex.substr(5, 2), 16);
      return ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);
    }

    var code = '';
    code += '{\n';
    code += '  static int prevIdx = -1;\n';
    code += '  static int currentIdx = -1;\n';
    code += '  static bool inProgram = false;\n';
    code += '  static bool btnLast = false;\n';
    code += '  static bool initPin = false;\n';
    code += '  static bool exitMsgShown = false;\n';
    code += '  static bool ranOnce[10] = {false};\n';
    code += '  if (!initPin) { pinMode(' + swpin + ', INPUT_PULLUP); initPin = true; }\n';
    code += '  int ADC_MAX = 1023;\n'; // PuppyBot6 ADC via MCP3008 wrapper
    code += '  int raw = ADC(' + pin + ');\n'; // use board ADC wrapper (works with A0..A15 mapping)
    code += '  raw = constrain(raw, 0, ADC_MAX);\n';
    code += '  int idx = map(raw, 0, ADC_MAX, 0, ' + n + ');\n';
    code += '  if (idx >= ' + n + ') idx = ' + (n-1) + ';\n';
    code += '  bool btn = (digitalRead(' + swpin + ') == 0);\n';
    code += '  bool pressed = btn && !btnLast;\n';
    code += '  btnLast = btn;\n';
    code += '  static const char* names[' + n + '] = {';
    var nameParts = [];
    for (var i = 1; i <= n; i++) {
      var pname = block.getFieldValue('PNAME' + i) || ('Program ' + i);
      nameParts.push('"' + pname + '"');
    }
    code += nameParts.join(', ') + '};\n';

    code += '  static const uint16_t txtColors[' + n + '] = {';
    var txtParts = [];
    var bgParts = [];
    for (var i = 1; i <= n; i++) {
      var txtColor = hexTo565(block.getFieldValue('TCOLOR' + i) || '#FFFFFF');
      var bgColor  = hexTo565(block.getFieldValue('BGCOLOR' + i) || '#1A1A3A');
      txtParts.push('0x' + txtColor.toString(16));
      bgParts.push('0x' + bgColor.toString(16));
    }
    code += txtParts.join(', ') + '};\n';

    code += '  static const uint16_t bgColors[' + n + '] = {' + bgParts.join(', ') + '};\n';
    code += '  static const bool runOnceFlags[' + n + '] = {' + (function(){let arr=[]; for(var i=1;i<=n;i++){arr.push((block.getFieldValue("RUNONCE"+i)==="TRUE")?"true":"false");} return arr.join(", ");})() + '};\n';

    code += '  auto showLabel = [&](int i) {\n';
    code += '    const char* name = names[i];\n';
    code += '    uint16_t txt = txtColors[i];\n';
    code += '    uint16_t bg = bgColors[i];\n';
    code += '    tft_.fillScreen(ST77XX_BLACK);\n';
    code += '    int W = tft_.width(); int H = tft_.height(); int size = 2;\n';
    code += '    int tw = textWidth(name, size); int th = textHeight(size);\n';
    code += '    int x = (W - tw) / 2; int y = (H - th) / 2; int pad = 8;\n';
    code += '    tft_.fillRoundRect(x - pad, y - pad, tw + pad * 2, th + pad * 2, 6, bg);\n';
    code += '    tft_.drawRoundRect(x - pad, y - pad, tw + pad * 2, th + pad * 2, 6, txt);\n';
    code += '    printText(x, y, name, size, txt);\n';
    code += '    const char* hint = "Press SW1 to run";\n';
    code += '    int hw = textWidth(hint, 1);\n';
    code += '    int hx = (W - hw) / 2;\n';
    code += '    int hy = y + th + pad + 6;\n';
    code += '    printText(hx, hy, hint, 1, ST77XX_YELLOW);\n';
    code += '  };\n';

    code += '  if (!inProgram) {\n';
    code += '    if (idx != prevIdx) { prevIdx = idx; showLabel(idx); }\n';
    code += '    if (pressed) { inProgram = true; currentIdx = idx; exitMsgShown = false; tft_.fillScreen(ST77XX_BLACK); if(currentIdx>=0 && currentIdx<10) ranOnce[currentIdx] = false; }\n';
    code += '  } else {\n';
    code += '    if (pressed) { inProgram = false; exitMsgShown = false; showLabel(currentIdx); return; }\n';
    code += '    switch(currentIdx) {\n';

    for (var i = 1; i <= n; i++) {
      var pname = block.getFieldValue('PNAME' + i) || ('Program ' + i);
      var branch = Blockly.JavaScript.statementToCode(block, 'DO' + i);
      code += '      case ' + (i-1) + ': {\n';
      code += '        if (runOnceFlags[' + (i-1) + ']) { if (ranOnce[' + (i-1) + ']) break; }\n';
      code += '        // ' + pname + '\n';
      code += branch;
      code += '        if (runOnceFlags[' + (i-1) + ']) { ranOnce[' + (i-1) + '] = true; }\n';
      code += '        break;\n';
      code += '      }\n';
    }

    code += '    }\n';
    code += '    bool showMsgAllowed = true;\n';
    code += '    if (currentIdx >= 0 && currentIdx < ' + n + ') {\n';
    code += '      if (runOnceFlags[currentIdx] && !ranOnce[currentIdx]) showMsgAllowed = false; // wait until run-once job finishes\n';
    code += '    }\n';
    code += '    if (!showMsgAllowed) { exitMsgShown = false; }\n';
    code += '    if (showMsgAllowed && !exitMsgShown) {\n';
    code += '      tft_.fillScreen(ST77XX_BLACK);\n';
    code += '      const char* line1 = "Press SW1";\n';
    code += '      const char* line2 = "to return to menu";\n';
    code += '      int W = tft_.width(); int H = tft_.height();\n';
    code += '      int size = 1;\n';
    code += '      int tw1 = textWidth(line1, size);\n';
    code += '      int tw2 = textWidth(line2, size);\n';
    code += '      int th = textHeight(size);\n';
    code += '      int x1 = (W - tw1) / 2;\n';
    code += '      int x2 = (W - tw2) / 2;\n';
    code += '      int yMid = H / 2;\n';
    code += '      printText(x1, yMid - th / 2, line1, size, ST77XX_YELLOW);\n';
    code += '      printText(x2, yMid + th, line2, size, ST77XX_YELLOW);\n';
    code += '      exitMsgShown = true;\n';
    code += '    }\n';
    code += '  }\n';
    code += '}\n';
    return code;
  };


}






