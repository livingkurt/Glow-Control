void loadSettings()
{
  brightness = EEPROM.read(0);

  currentPatternIndex = EEPROM.read(1);
  if (currentPatternIndex < 0)
    currentPatternIndex = 0;
  else if (currentPatternIndex >= patternCount)
    currentPatternIndex = patternCount - 1;

  // currentPatternIndex = 0;

  byte r = EEPROM.read(2);
  byte g = EEPROM.read(3);
  byte b = EEPROM.read(4);

  if (r == 0 && g == 0 && b == 0)
  {
  }
  else
  {
    rgb = CRGB(r, g, b);
  }
  byte h = EEPROM.read(10);
  byte s = EEPROM.read(11);
  byte v = EEPROM.read(12);

  if (h == 0 && s == 0 && v == 0)
  {
  }
  else
  {
    hsv = CHSV(h, s, v);
  }

  power = EEPROM.read(5);

  autoplay = EEPROM.read(6);
  autoplayDuration = EEPROM.read(7);

  currentPaletteIndex = EEPROM.read(8);
  if (currentPaletteIndex < 0)
    currentPaletteIndex = 0;
  else if (currentPaletteIndex >= paletteCount)
    currentPaletteIndex = paletteCount - 1;
}

// // scale the brightness of all pixels down
// void dimAll(byte value)
// {
//   for (int i = 0; i < NUM_LEDS; i++)
//   {
//     leds[i].nscale8(value);
//   }
// }

void setPower(uint8_t value)
{
  power = value == 0 ? 0 : 1;

  EEPROM.write(5, power);
  EEPROM.commit();

  broadcastInt("power", power);
}

void setAutoplay(uint8_t value)
{
  autoplay = value == 0 ? 0 : 1;

  EEPROM.write(6, autoplay);
  EEPROM.commit();

  broadcastInt("autoplay", autoplay);
}

void setBlendMode(uint8_t value)
{
  blendMode = value == 0 ? 0 : 1;

  EEPROM.write(9, blendMode);
  EEPROM.commit();

  broadcastInt("blendMode", blendMode);
}
void setRandomMode(uint8_t value)
{
  randomMode = value == 0 ? 0 : 1;

  EEPROM.write(13, randomMode);
  EEPROM.commit();

  broadcastInt("randomMode", randomMode);
}

void setAutoplayDuration(uint8_t value)
{
  autoplayDuration = value;

  EEPROM.write(7, autoplayDuration);
  EEPROM.commit();

  autoPlayTimeout = millis() + (autoplayDuration * 1000);

  broadcastInt("autoplayDuration", autoplayDuration);
}

void setRGB(CRGB color)
{
  setRGB(color.r, color.g, color.b);
}

void setRGB(uint8_t r, uint8_t g, uint8_t b)
{
  rgb = CRGB(r, g, b);

  EEPROM.write(2, r);
  EEPROM.write(3, g);
  EEPROM.write(4, b);
  EEPROM.commit();

  setPattern(patternCount - 1);

  broadcastString("rgb", String(rgb.r) + "," + String(rgb.g) + "," + String(rgb.b));
}

void setHSV(CHSV color)
{
  setHSV(color.h, color.s, color.v);
}

void setHSV(uint8_t h, uint8_t s, uint8_t v)
{
  hsv = CHSV(h, s, v);

  EEPROM.write(10, h);
  EEPROM.write(11, s);
  EEPROM.write(12, v);
  EEPROM.commit();

  setPattern(patternCount - 1);

  broadcastString("hsv", String(hsv.h) + "," + String(hsv.s) + "," + String(hsv.v));
}

// increase or decrease the current pattern number, and wrap around at the ends
void adjustPattern(bool up)
{
  if (up)
    currentPatternIndex++;
  else
    currentPatternIndex--;

  // wrap around at the ends
  if (currentPatternIndex < 0)
    currentPatternIndex = patternCount - 1;
  if (currentPatternIndex >= patternCount)
    currentPatternIndex = 0;

  if (autoplay == 0)
  {
    EEPROM.write(1, currentPatternIndex);
    EEPROM.commit();
  }

  broadcastInt("pattern", currentPatternIndex);
}
void randomPattern(bool rand)
{
  if (rand)
  {
    currentPatternIndex = random(0, patternCount);
  }
  // if (up)
  //   currentPatternIndex++;
  // else
  //   currentPatternIndex--;

  // // wrap around at the ends
  // if (currentPatternIndex < 0)
  //   currentPatternIndex = patternCount - 1;
  // if (currentPatternIndex >= patternCount)
  //   currentPatternIndex = 0;

  if (autoplay == 0)
  {
    EEPROM.write(1, currentPatternIndex);
    EEPROM.commit();
  }

  broadcastInt("pattern", currentPatternIndex);
}

void setPattern(uint8_t value)
{
  if (value >= patternCount)
    value = patternCount - 1;

  currentPatternIndex = value;

  if (autoplay == 0)
  {
    EEPROM.write(1, currentPatternIndex);
    EEPROM.commit();
  }

  broadcastInt("pattern", currentPatternIndex);
}

void setPatternName(String name)
{
  for (uint8_t i = 0; i < patternCount; i++)
  {
    if (patterns[i].name == name)
    {
      setPattern(i);
      break;
    }
  }
}

void setPalette(uint8_t value)
{
  if (value >= paletteCount)
    value = paletteCount - 1;

  currentPaletteIndex = value;

  EEPROM.write(8, currentPaletteIndex);
  EEPROM.commit();

  broadcastInt("palette", currentPaletteIndex);
}

void setPaletteName(String name)
{
  for (uint8_t i = 0; i < paletteCount; i++)
  {
    if (paletteNames[i] == name)
    {
      setPalette(i);
      break;
    }
  }
}

void adjustBrightness(bool up)
{
  if (up && brightnessIndex < brightnessCount - 1)
    brightnessIndex++;
  else if (!up && brightnessIndex > 0)
    brightnessIndex--;

  brightness = brightnessMap[brightnessIndex];

  FastLED.setBrightness(brightness);

  EEPROM.write(0, brightness);
  EEPROM.commit();

  broadcastInt("brightness", brightness);
}

void setBrightness(uint8_t value)
{
  if (value > 255)
    value = 255;
  else if (value < 0)
    value = 0;

  brightness = value;

  FastLED.setBrightness(brightness);

  EEPROM.write(0, brightness);
  EEPROM.commit();

  broadcastInt("brightness", brightness);
}