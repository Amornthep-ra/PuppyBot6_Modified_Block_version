
//Block from IKB1 


module.exports = function(Blockly) {

Blockly.JavaScript['PuppyBot'] = function(block) {
  var dropdown_ch = block.getFieldValue('ch');
  var dropdown_dir = block.getFieldValue('dir');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'motor(' + dropdown_ch + ', ' + dropdown_dir + '' + value_speed + ');\n';
  return code;
};
Blockly.JavaScript['PuppyBotmotor_Mecanum'] = function(block) {
  var dropdown_dir = block.getFieldValue('dir');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'motor(' + dropdown_ch + ', ' + dropdown_dir + ', ' + value_speed + ');\n';
  var code = '';
  if(dropdown_dir == '1'){code += 'motor_control(0,'+ value_speed +');';}
  if(dropdown_dir == '2'){code += 'motor_control(1,'+ value_speed +');';}
  if(dropdown_dir == '3'){code += 'motor_control(2,'+ value_speed +');';}
  if(dropdown_dir == '4'){code += 'motor_control(3,'+ value_speed +');';}
  if(dropdown_dir == '5'){code += 'motor_control(4,'+ value_speed +');';}
  if(dropdown_dir == '6'){code += 'motor_control(5,'+ value_speed +');';}
  if(dropdown_dir == '7'){code += 'motor_control(6,'+ value_speed +');';}
  if(dropdown_dir == '8'){code += 'motor_control(7,'+ value_speed +');';}
  if(dropdown_dir == '9'){code += 'motor_control(8,'+ value_speed +');';}
  if(dropdown_dir == '10'){code += 'motor_control(9,'+ value_speed +');';}
  return code;
};
Blockly.JavaScript['PuppyBot_servo'] = function(block) {
  var dropdown_ch = block.getFieldValue('ch');
  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var code = 'servoRun(' + dropdown_ch + ', ' + value_angle + ');\n';
  return code;
};

Blockly.JavaScript['PuppyBot_servo2'] = function(block) {
  var dropdown_ch = block.getFieldValue('ch');
  var dropdown_dir = block.getFieldValue('dir');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var code = 'servo2(' + dropdown_ch + ', ' + dropdown_dir +', ' + value_speed + ');\n';
  return code;
};
Blockly.JavaScript['PuppyBot_servo_speed_control'] = function(block) {
  var dropdown_ch = block.getFieldValue('ch');
  var dropdown_speed = block.getFieldValue('speed');
  var value_servo_degree = Blockly.JavaScript.valueToCode(block, 'servo_degree', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_Step = Blockly.JavaScript.valueToCode(block, 'Step', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_traget_degree = Blockly.JavaScript.valueToCode(block, 'traget_degree', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  
  var code = 'servoSweep(' + dropdown_ch + ', ' + value_servo_degree + ', ' + value_traget_degree + ', ' + value_Step + ', ' + dropdown_speed + ');\n';
  return code;
};
Blockly.JavaScript['PuppyBot_turn_spin_move'] = function(block) {
  var drive = block.getFieldValue('drive');
  var mode = block.getFieldValue('MODE');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var code = '';

  if (drive === '2') {
    if (mode === 'TL') {
      code += 'motor(1,0);';
      code += 'motor(2,-' + value_speed + ');';
    }
    if (mode === 'TR') {
      code += 'motor(1,-' + value_speed + ');';
      code += 'motor(2,0);';
    }
    if (mode === 'SL') {
      code += 'motor(1,-' + value_speed + ');';
      code += 'motor(2,' + value_speed + ');';
    }
    if (mode === 'SR') {
      code += 'motor(1,' + value_speed + ');';
      code += 'motor(2,-' + value_speed + ');';
    }
  } else if (drive === '4') {
    if (mode === 'TL') code += 'motor_control(2,' + value_speed + ');';
    if (mode === 'TR') code += 'motor_control(3,' + value_speed + ');';
    if (mode === 'SL') code += 'motor_control(4,' + value_speed + ');';
    if (mode === 'SR') code += 'motor_control(5,' + value_speed + ');';
  } else {
    if (mode === 'TL') {
      code += 'motor(1,0); motor(3,0); motor(5,0);';
      code += 'motor(2,' + value_speed + '); motor(4,' + value_speed + '); motor(6,' + value_speed + ');';
    }
    if (mode === 'TR') {
      code += 'motor(1,' + value_speed + '); motor(3,' + value_speed + '); motor(5,' + value_speed + ');';
      code += 'motor(2,0); motor(4,0); motor(6,0);';
    }
    if (mode === 'SL') {
      code += 'motor(1,-' + value_speed + '); motor(3,-' + value_speed + '); motor(5,-' + value_speed + ');';
      code += 'motor(2,' + value_speed + '); motor(4,' + value_speed + '); motor(6,' + value_speed + ');';
    }
    if (mode === 'SR') {
      code += 'motor(1,' + value_speed + '); motor(3,' + value_speed + '); motor(5,' + value_speed + ');';
      code += 'motor(2,-' + value_speed + '); motor(4,-' + value_speed + '); motor(6,-' + value_speed + ');';
    }
  }
  return code;
};

Blockly.JavaScript['PuppyBot_stop_select'] = function(block) {
  var target = block.getFieldValue('TARGET');
  var mode = block.getFieldValue('MODE');
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var code = '';

  if (target === 'ALL') {
    code += 'ao();\n';
  } else {
    code += 'motor(' + target + ',0);\n';
  }

  if (mode === 'TIME') {
    code += 'delay(' + value_time + ');\n';
  }

  return code;
};

Blockly.JavaScript['PuppyBot_dual_motor_drive'] = function(block) {
  var drive = block.getFieldValue('drive');
  var dir = block.getFieldValue('dir');
  var left = Blockly.JavaScript.valueToCode(block, 'left_speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var right = Blockly.JavaScript.valueToCode(block, 'right_speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var leftExpr = (dir === 'BWD') ? ('-' + left) : left;
  var rightExpr = (dir === 'BWD') ? ('-' + right) : right;
  var code = '';

  if (drive === '2') {
    code += 'motor(1,' + leftExpr + ');';
    code += 'motor(2,' + rightExpr + ');';
  } else if (drive === '4') {
    code += 'motor(1,' + leftExpr + ');';
    code += 'motor(2,' + rightExpr + ');';
    code += 'motor(3,' + leftExpr + ');';
    code += 'motor(4,' + rightExpr + ');';
  } else {
    code += 'motor(1,' + leftExpr + ');';
    code += 'motor(2,' + rightExpr + ');';
    code += 'motor(3,' + leftExpr + ');';
    code += 'motor(4,' + rightExpr + ');';
    code += 'motor(5,' + leftExpr + ');';
    code += 'motor(6,' + rightExpr + ');';
  }
  return code;
};

//??????????????????????????? 17/09/2025
Blockly.JavaScript['PuppyBot_drive_move'] = function(block) {
    var drive = block.getFieldValue('drive');   // "2" | "4" | "6"
    var dir   = block.getFieldValue('dir');     // FWD|BWD|TL|TR|SL|SR
    var spd   = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var dly   = Blockly.JavaScript.valueToCode(block, 'delay_ms', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var stop  = block.getFieldValue('STOP_MODE') === 'STOP';
    var sDly  = Blockly.JavaScript.valueToCode(block, 'stop_delay', Blockly.JavaScript.ORDER_ATOMIC) || '0';

    var code = '';

    // ---------- 2WD ----------
    if (drive === '2') {
      if (dir === 'FWD') { code += 'motor(1,'+spd+'); motor(2,'+spd+');\n'; }
      if (dir === 'BWD') { code += 'motor(1,-'+spd+'); motor(2,-'+spd+');\n'; }
      if (dir === 'TL')  { code += 'motor(1,0); motor(2,-'+spd+');\n'; }
      if (dir === 'TR')  { code += 'motor(1,-'+spd+'); motor(2,0);\n'; }
      if (dir === 'SL')  { code += 'motor(1,-'+spd+'); motor(2,'+spd+');\n'; }
      if (dir === 'SR')  { code += 'motor(1,'+spd+'); motor(2,-'+spd+');\n'; }
    }
    // ---------- 4WD ----------
    else if (drive === '4') {
      if (dir === 'FWD') { code += 'motor_control(0,'+spd+');\n'; }
      if (dir === 'BWD') { code += 'motor_control(1,'+spd+');\n'; }
      if (dir === 'TL')  { code += 'motor_control(2,'+spd+');\n'; }
      if (dir === 'TR')  { code += 'motor_control(3,'+spd+');\n'; }
      if (dir === 'SL')  { code += 'motor_control(4,'+spd+');\n'; }
      if (dir === 'SR')  { code += 'motor_control(5,'+spd+');\n'; }
    }
    // ---------- 6WD ----------
    else {
      if (dir === 'FWD') {
        code += 'motor(1,'+spd+'); motor(3,'+spd+'); motor(5,'+spd+');\n';
        code += 'motor(2,'+spd+'); motor(4,'+spd+'); motor(6,'+spd+');\n';
      }
      if (dir === 'BWD') {
        code += 'motor(1,-'+spd+'); motor(3,-'+spd+'); motor(5,-'+spd+');\n';
        code += 'motor(2,-'+spd+'); motor(4,-'+spd+'); motor(6,-'+spd+');\n';
      }
      if (dir === 'TL') {
        code += 'motor(1,0); motor(3,0); motor(5,0);\n';
        code += 'motor(2,'+spd+'); motor(4,'+spd+'); motor(6,'+spd+');\n';
      }
      if (dir === 'TR') {
        code += 'motor(1,'+spd+'); motor(3,'+spd+'); motor(5,'+spd+');\n';
        code += 'motor(2,0); motor(4,0); motor(6,0);\n';
      }
      if (dir === 'SL') {
        code += 'motor(1,-'+spd+'); motor(3,-'+spd+'); motor(5,-'+spd+');\n';
        code += 'motor(2,'+spd+'); motor(4,'+spd+'); motor(6,'+spd+');\n';
      }
      if (dir === 'SR') {
        code += 'motor(1,'+spd+'); motor(3,'+spd+'); motor(5,'+spd+');\n';
        code += 'motor(2,-'+spd+'); motor(4,-'+spd+'); motor(6,-'+spd+');\n';
      }
    }

    // ---------- Delay ----------
    code += 'delay('+dly+');\n';

    // ---------- Stop + stop delay ----------
    if (stop) {
      code += 'ao();\n';
      code += 'if ('+sDly+'>0) delay('+sDly+');\n';
    }

    return code;
  };

}
