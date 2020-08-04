void showSolidColor()
{
  fill_solid(leds, NUM_LEDS, solidColor);
}

void cycle()
{
  int start_index;
  start_index = -1 * millis() / colorSpeed;
  for (int i = 0; i < NUM_LEDS; i++)
  {
    // leds[i] = CHSV(start_hue, 255, 255);
    leds[i] = ColorFromPalette(palettes[currentPaletteIndex], start_index, 255, blendMode == 0 ? NOBLEND : LINEARBLEND);
    start_index += colorDensity;
  };
}

void sparkle()
{
  // random colored speckles that blink in and fade smoothly
  fadeToBlackBy(leds, NUM_LEDS, colorFade);
  int pos = random(0, NUM_LEDS);
  int start_index;
  start_index = -1 * millis() / colorSpeed;
  // leds[pos] += CHSV( gHue + random8(64), 200, 255);
  leds[pos] += ColorFromPalette(palettes[currentPaletteIndex], start_index, 255, blendMode == 0 ? NOBLEND : LINEARBLEND);
  // leds[NUM_LEDS - 1 - pos] += ColorFromPalette(palettes[currentPaletteIndex], start_index, 255, blendMode == 0 ? NOBLEND : LINEARBLEND);
  start_index += colorDensity;
  hold(10);
}

void shootingStar()
{
  // a colored dot sweeping back and forth, with fading trails
  fadeToBlackBy(leds, NUM_LEDS, colorFade);
  int pos = beatsin16(speed, 0, NUM_LEDS);
  static int prevpos = 0;
  int start_index;
  start_index = -1 * millis() / colorSpeed;
  CRGB color = ColorFromPalette(palettes[currentPaletteIndex], start_index, 255, blendMode == 0 ? NOBLEND : LINEARBLEND);
  if (pos < prevpos)
  {
    fill_solid(leds + pos, (prevpos - pos) + 1, color);
  }
  else
  {
    fill_solid(leds + prevpos, (pos - prevpos) + 1, color);
  }
  start_index += colorDensity;
  prevpos = pos;
}

void bpm()
{
  // colored stripes pulsing at a defined Beats-Per-Minute (BPM)
  uint8_t beat = beatsin8(speed, 64, colorFade);
  CRGBPalette16 palette = palettes[currentPaletteIndex];
  int start_index;
  start_index = -1 * millis() / colorSpeed;
  for (int i = 0; i < HALF_LEDS; i++)
  {
    leds[i] = ColorFromPalette(palette, start_index + (i * 2), beat - start_index + (i * 10), blendMode == 0 ? NOBLEND : LINEARBLEND);
    leds[NUM_LEDS - 1 - i] = ColorFromPalette(palette, start_index + (i * 2), beat - start_index + (i * 10), blendMode == 0 ? NOBLEND : LINEARBLEND);
  }
  start_index += colorDensity;
}

// void juggle()
// {
//   static uint8_t numdots = 4;                // Number of dots in use.
//   static uint8_t faderate = 2;               // How long should the trails be. Very low value = longer trails.
//   static uint8_t hueinc = 255 / numdots - 1; // Incremental change in hue between each dot.
//   static uint8_t thishue = 0;                // Starting hue.
//   static uint8_t curhue = 0;                 // The current hue
//   static uint8_t thissat = 255;              // Saturation of the colour.
//   static uint8_t thisbright = 255;           // How bright should the LED/display be.
//   static uint8_t basebeat = 5;               // Higher = faster movement.

//   static uint8_t lastSecond = 99;              // Static variable, means it's only defined once. This is our 'debounce' variable.
//   uint8_t secondHand = (millis() / 1000) % 30; // IMPORTANT!!! Change '30' to a different value to change duration of the loop.

//   if (lastSecond != secondHand)
//   { // Debounce to make sure we're not repeating an assignment.
//     lastSecond = secondHand;
//     switch (secondHand)
//     {
//     case 0:
//       numdots = 1;
//       basebeat = 20;
//       hueinc = 16;
//       faderate = 2;
//       thishue = 0;
//       break; // You can change values here, one at a time , or altogether.
//     case 10:
//       numdots = 4;
//       basebeat = 10;
//       hueinc = 16;
//       faderate = 8;
//       thishue = 128;
//       break;
//     case 20:
//       numdots = 8;
//       basebeat = 3;
//       hueinc = 0;
//       faderate = 8;
//       thishue = random8();
//       break; // Only gets called once, and not continuously for the next several seconds. Therefore, no rainbows.
//     case 30:
//       break;
//     }
//   }

//   // Several colored dots, weaving in and out of sync with each other
//   curhue = thishue; // Reset the hue values.
//   fadeToBlackBy(leds, NUM_LEDS, faderate);
//   for (int i = 0; i < numdots; i++)
//   {
//     //beat16 is a FastLED 3.1 function
//     leds[beatsin16(basebeat + i + numdots, 0, NUM_LEDS)] += CHSV(gHue + curhue, thissat, thisbright);
//     curhue += hueinc;
//   }
// }

void fire()
{
  heatMap(HeatColors_p, true);
}

void water()
{
  heatMap(IceColors_p, false);
}

// Pride2015 by Mark Kriegsman: https://gist.github.com/kriegsman/964de772d64c502760e5
// This function draws rainbows with an ever-changing,
// widely-varying set of parameters.
void pride()
{
  static uint16_t sPseudotime = 0;
  static uint16_t sLastMillis = 0;
  static uint16_t sHue16 = 0;

  uint8_t sat8 = beatsin88(87, 220, 250);
  uint8_t brightdepth = beatsin88(341, 96, 224);
  uint16_t brightnessthetainc16 = beatsin88(203, (25 * 256), (40 * 256));
  uint8_t msmultiplier = beatsin88(147, 23, 60);

  uint16_t hue16 = sHue16; //gHue * 256;
  uint16_t hueinc16 = beatsin88(113, 1, 3000);

  uint16_t ms = millis();
  uint16_t deltams = ms - sLastMillis;
  sLastMillis = ms;
  sPseudotime += deltams * msmultiplier;
  sHue16 += deltams * beatsin88(400, 5, 9);
  uint16_t brightnesstheta16 = sPseudotime;

  for (uint16_t i = 0; i < HALF_LEDS; i++)
  {
    hue16 += hueinc16;
    uint8_t hue8 = hue16 / 256;

    brightnesstheta16 += brightnessthetainc16;
    uint16_t b16 = sin16(brightnesstheta16) + 32768;

    uint16_t bri16 = (uint32_t)((uint32_t)b16 * (uint32_t)b16) / 65536;
    uint8_t bri8 = (uint32_t)(((uint32_t)bri16) * brightdepth) / 65536;
    bri8 += (255 - brightdepth);

    CRGB newcolor = CHSV(hue8, sat8, bri8);

    uint16_t pixelnumber = i;
    pixelnumber = (HALF_LEDS - 1) - pixelnumber;

    nblend(leds[pixelnumber], newcolor, 64);
    nblend(leds[NUM_LEDS - 1 - pixelnumber], newcolor, 64);
  }
}

void colorWaves()
{
  colorwaves(leds, NUM_LEDS, gCurrentPalette);
}

void cycle_rainbow_desaturated()
{
  int rate = 20;
  int start_hue;
  int delta_hue = 3;
  start_hue = -1 * millis() / rate;
  for (int i = 0; i < NUM_LEDS; i++)

  {
    leds[i] = CHSV(start_hue, beatsin16(speed, 50, 255), 255);
    // CRGB color = ColorFromPalette(palettes[currentPaletteIndex], gHue, 255);
    start_hue += delta_hue;
  };
  // FastLED.show();
}

void strobe_mode()
{
  int start_index;
  start_index = -1 * millis() / colorSpeed;
  for (int i = 0; i < NUM_LEDS; i++)
  {
    // leds[i] = CHSV(start_hue, 255, 255);
    leds[i] = ColorFromPalette(palettes[currentPaletteIndex], start_index, 255, blendMode == 0 ? NOBLEND : LINEARBLEND);
    start_index += colorDensity;
  };

  FastLED.show();
  hold(strobe);
  fill_solid(leds, NUM_LEDS, CHSV(0, 0, 0));

  FastLED.show();
  hold(blank);
}

void pulse()
{
  int start_index;
  start_index = -1 * millis() / colorSpeed;
  fill_solid(leds, NUM_LEDS, CHSV(start_index, 255, beatsin16(speed, 50, 255))); // Set all to Off.
  start_index += colorDensity;
  FastLED.show();
}

void juggle()
{
  fadeToBlackBy(leds, NUM_LEDS, colorFade);
  int rate = 10;
  int start_hue;
  int delta_hue = 25;
  start_hue = -1 * millis() / colorSpeed;
  for (int i = 0; i < 8; i++)
  {
    leds[beatsin16(i + 4, 0, NUM_LEDS - 1)] |= CHSV(start_hue, 255, 255);
    start_hue += colorDensity;
  }
}
