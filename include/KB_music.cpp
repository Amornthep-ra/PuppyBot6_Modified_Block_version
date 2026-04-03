#include "KB_music.h"

#define BUZZER_PIN (7)

void KB_music::begin(void) {
    pinMode(BUZZER_PIN, OUTPUT);
}

void KB_music::_tone(unsigned int frequency, unsigned long duration)
{
    tone(BUZZER_PIN, frequency);
    if (duration) {
        delay(duration);
        noTone(BUZZER_PIN);
    }
}

void KB_music::_noTone()
{
    noTone(BUZZER_PIN);
}

void KB_music::song(std::vector<int>notes,int duration)
{
    for(int freq : notes){
        if(freq == -1){
            this->_noTone();
            delay(duration);
        }else{
            this->_tone(freq,duration);
        }
    }
}