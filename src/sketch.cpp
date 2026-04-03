#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  while (!Serial);  // รอให้ USB CDC พร้อม
  Serial.println("PuppyBot started!");
}

void loop() {
  Serial.println("Still alive...");
  delay(1000);
}
