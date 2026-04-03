#ifndef KB_MUSIC_h
#define KB_MUSIC_h

#include <Arduino.h>

//static const uint8_t KB_BUZZER = 13;
class KB_music
{
 public:
  void begin(void);
  void _tone(unsigned int frequency, unsigned long duration = 0);
  void _noTone();
  void song(std::vector<int> notes,int duration);

 protected:
  uint16_t channel;
  uint16_t bit;

 private:
};

#endif /* KB_LDR_h */
