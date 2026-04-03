#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);
  Serial.println("Serial Ready");
}

void loop() {
  Serial.println("Running...");
  delay(1000);
}
