#include <Arduino.h>
// #include <KB_music.h>
#include <puppybot.h>

#ifndef I2C_ADDR
#define I2C_ADDR 0x69
#endif

#include "PuppyBotIMU.h"
#include "PuppyBotTurnPID.h"
#include "KB_PIDFollowHelpers.h"
#include "PuppyBotPID_v2.h"
#include "PuppyBotColorDetect.h"

typedef float Number;
typedef int Boolean;

int R_color;
int G_color;
int B_color;
Number colorId;

void setup() {
  delay(1000);
  puppybot_setup();
  Serial.begin(115200);

  Set_Mode_Gyro = (0);
  init_encoder(1);
  selection_Encoder = (1);
  swpin = 27;
  wait_SW1_ALL(2, 1000, 100);
  tft_.fillScreen(ST77XX_BLACK);

  set_data_for_turnDirection(1, 15, 60, 4, 5);
  setColorReadConfig(7, 5);
  setColorDetectConfig(200, 62, 62, 550, 160, 100, 80, 80, 160, 144, 113, 42,
                       133, 100, 100, 220, 35, 0.22, 0.18, 180);
}

void loop() {
  printnumber(0, 0, ((String("nor=") + String((Read_Color_TCS(0))))), 1.2,
              0x7c0, 0x0);
  printnumber(0, 10, ((String("nor=") + String((Read_Color_TCS(1))))), 1.2,
              0x7c0, 0x0);
  printnumber(0, 20, ((String("nor=") + String((Read_Color_TCS(2))))), 1.2,
              0x7c0, 0x0);
  printnumber(0, 30, ((String("raw=") + String((Read_Color_TCS(6))))), 1.2,
              0x7c0, 0x0);
  printnumber(0, 40, ((String("raw=") + String((Read_Color_TCS(7))))), 1.2,
              0x7c0, 0x0);
  printnumber(0, 50, ((String("raw=") + String((Read_Color_TCS(8))))), 1.2,
              0x7c0, 0x0);
  long tmpColorR = 0;
  long tmpColorG = 0;
  long tmpColorB = 0;
  readColorSmoothedCustom([]() -> long { return (long)((Read_Color_TCS(0))); },
                          []() -> long { return (long)((Read_Color_TCS(1))); },
                          []() -> long { return (long)((Read_Color_TCS(2))); },
                          &tmpColorR, &tmpColorG, &tmpColorB);
  R_color = tmpColorR;
  G_color = tmpColorG;
  B_color = tmpColorB;
  colorId = (detectColorFromRGB(R_color, G_color, B_color));
  if (colorId == 1) {
    tft_.fillScreen(0xf800);
  } else if (colorId == 2) {
    tft_.fillScreen(0x3660);
  } else if (colorId == 3) {
    tft_.fillScreen(0x333f);
  } else if (colorId == 4) {
    tft_.fillScreen(0xffe0);
  } else {
    colorId = 0;
  }
}
void setup1() {
  delay(1000);
  initIMU();
  set_TCS_back();
  updateIMU_fine_offset_Yaw(300);
  offset_yaw_loop1 = getOffsetYaw();
}
void loop1() {
  // Single IMU update per loop1 to reduce repeated reads.
  // If this causes issues, revert by using
  // getPitch/getRoll/getYaw/getContinuousYaw directly.
  updateIMU();
  pitch_loop1 = getPitchCached();
  roll_loop1 = getRollCached();
  yaw_loop1 = getYawCached();
  updateContinuousYawCached();
  Con_yaw_loop1 = continuousYaw + Ref_offset_Con;
  if (status_resetYaw == 1) {
    status_resetYaw = 0;
    resetContinuousYaw();
  }
  if (status_resetYaw180 == 1) {
    resetGyro();
    status_resetYaw180 = 0;
  }
  TCS_R = Read_Color_TCS_B_Raw(0);
  TCS_G = Read_Color_TCS_B_Raw(1);
  TCS_B = Read_Color_TCS_B_Raw(2);
  TCS_T = Read_Color_TCS_B_Raw(3);
  TCS_L = Read_Color_TCS_B_Raw(4);
}
