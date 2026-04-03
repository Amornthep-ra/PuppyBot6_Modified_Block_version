#pragma once

struct PuppyBotPDV2State {
  float prevError;
  float dFiltered;
  unsigned long lastTime;
  bool initialized;
};

static PuppyBotPDV2State _pb_pd_v2_front = {0.0f, 0.0f, 0, false};
static PuppyBotPDV2State _pb_pd_v2_back  = {0.0f, 0.0f, 0, false};

static inline void PuppyBot_Run_PD_V2_Reset(int sideMode) {
  PuppyBotPDV2State* st = (sideMode == 1) ? &_pb_pd_v2_back : &_pb_pd_v2_front;
  st->prevError = 0.0f;
  st->dFiltered = 0.0f;
  st->lastTime = millis();
  st->initialized = false;
}

static inline int pb_v2_clamp_same_direction(int cmd, int signedSpeed) {
  if (signedSpeed >= 0) {
    return constrain(cmd, 0, 100);
  }
  return constrain(cmd, -100, 0);
}

static inline void PuppyBot_Run_PD_V2(int sideMode,
                                      int driveMode,
                                      int signedSpeed,
                                      float kp,
                                      float kd) {
  PuppyBotPDV2State* st = (sideMode == 1) ? &_pb_pd_v2_back : &_pb_pd_v2_front;
  int presentPosition = (sideMode == 1) ? readline_B() : readline();
  int setpoint = (((sideMode == 1) ? PID_NumPin_B : PID_NumPin) - 1) * 100 / 2;
  float error = (float)(presentPosition - setpoint);

  unsigned long now = millis();
  if (!st->initialized) {
    st->prevError = error;
    st->dFiltered = 0.0f;
    st->lastTime = now;
    st->initialized = true;
  }

  float dt = max((now - st->lastTime) / 1000.0f, 0.001f);
  if (dt > 0.1f) {
    dt = 0.1f;
    st->dFiltered = 0.0f;
  }
  st->lastTime = now;

  float derivative = (error - st->prevError) / dt;
  st->prevError = error;

  const float dAlpha = 0.35f;
  st->dFiltered = (dAlpha * derivative) + ((1.0f - dAlpha) * st->dFiltered);

  float output = (kp * error) + (kd * st->dFiltered);
  float maxCorrection = max(6.0f, min(40.0f, (float)abs(signedSpeed) * 0.45f));
  output = constrain(output, -maxCorrection, maxCorrection);

  if (sideMode == 1) {
    int m1Speed = signedSpeed - (int)output;
    int m2Speed = signedSpeed + (int)output;
    m1Speed = pb_v2_clamp_same_direction(m1Speed, signedSpeed);
    m2Speed = pb_v2_clamp_same_direction(m2Speed, signedSpeed);

    if (driveMode == 1) {
      motor(1, -m1Speed);
      motor(2, -m2Speed);
      motor(3, -m1Speed);
      motor(4, -m2Speed);
    } else {
      motor(1, -m1Speed);
      motor(2, -m2Speed);
    }
  } else {
    int m1Speed = signedSpeed + (int)output;
    int m2Speed = signedSpeed - (int)output;
    m1Speed = pb_v2_clamp_same_direction(m1Speed, signedSpeed);
    m2Speed = pb_v2_clamp_same_direction(m2Speed, signedSpeed);

    if (driveMode == 1) {
      motor(1, m1Speed);
      motor(2, m2Speed);
      motor(3, m1Speed);
      motor(4, m2Speed);
    } else {
      motor(1, m1Speed);
      motor(2, m2Speed);
    }
  }
}
