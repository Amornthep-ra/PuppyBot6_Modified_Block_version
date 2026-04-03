#ifndef PUPPYBOT_COLOR_DETECT_H
#define PUPPYBOT_COLOR_DETECT_H

struct PuppyBotColorReadConfig
{
  int samples;
  int sampleDelayMs;
};

struct PuppyBotColorDetectConfig
{
  float redR;
  float redG;
  float redB;
  float greenR;
  float greenG;
  float greenB;
  float blueR;
  float blueG;
  float blueB;
  float yellowR;
  float yellowG;
  float yellowB;
  float blackR;
  float blackG;
  float blackB;
  long sumMin;
  long chromaMin;
  float normDistMax;
  float blackNormDistMax;
  long yellowRgMin;
};

static PuppyBotColorReadConfig g_colorReadConfig = {7, 5};
static PuppyBotColorDetectConfig g_colorDetectConfig = {
    200.0f, 62.0f, 62.0f,
    80.0f, 140.0f, 100.0f,
    80.0f, 80.0f, 160.0f,
    144.0f, 113.0f, 42.0f,
    133.0f, 100.0f, 100.0f,
    220,
    35,
    0.22f,
    0.18f,
    180};

static inline void setColorReadConfig(int samples, int sampleDelayMs)
{
  if (samples < 1)
  {
    samples = 1;
  }
  if (sampleDelayMs < 0)
  {
    sampleDelayMs = 0;
  }
  g_colorReadConfig.samples = samples;
  g_colorReadConfig.sampleDelayMs = sampleDelayMs;
}

static inline void setColorDetectConfig(float redR, float redG, float redB,
                                        float greenR, float greenG, float greenB,
                                        float blueR, float blueG, float blueB,
                                        float yellowR, float yellowG, float yellowB,
                                        float blackR, float blackG, float blackB,
                                        long sumMin, long chromaMin,
                                        float normDistMax, float blackNormDistMax,
                                        long yellowRgMin)
{
  g_colorDetectConfig.redR = redR;
  g_colorDetectConfig.redG = redG;
  g_colorDetectConfig.redB = redB;
  g_colorDetectConfig.greenR = greenR;
  g_colorDetectConfig.greenG = greenG;
  g_colorDetectConfig.greenB = greenB;
  g_colorDetectConfig.blueR = blueR;
  g_colorDetectConfig.blueG = blueG;
  g_colorDetectConfig.blueB = blueB;
  g_colorDetectConfig.yellowR = yellowR;
  g_colorDetectConfig.yellowG = yellowG;
  g_colorDetectConfig.yellowB = yellowB;
  g_colorDetectConfig.blackR = blackR;
  g_colorDetectConfig.blackG = blackG;
  g_colorDetectConfig.blackB = blackB;
  g_colorDetectConfig.sumMin = sumMin;
  g_colorDetectConfig.chromaMin = chromaMin;
  g_colorDetectConfig.normDistMax = normDistMax;
  g_colorDetectConfig.blackNormDistMax = blackNormDistMax;
  g_colorDetectConfig.yellowRgMin = yellowRgMin;
}

static inline float pb_color_absf(float value)
{
  return value < 0.0f ? -value : value;
}

static inline float pb_color_norm_distance(float rn, float gn, float bn, float rRef, float gRef, float bRef)
{
  float refSum = rRef + gRef + bRef;
  if (refSum <= 0.0f)
  {
    return 9999.0f;
  }
  float rnRef = rRef / refSum;
  float gnRef = gRef / refSum;
  float bnRef = bRef / refSum;
  return pb_color_absf(rn - rnRef) + pb_color_absf(gn - gnRef) + pb_color_absf(bn - bnRef);
}

static inline bool pb_tcs_read_raw_rgb(int sensorPos, uint16_t *r, uint16_t *g, uint16_t *b)
{
  uint16_t clearValue = 0;
  if (sensorPos == 1)
  {
    if (!isConnected_B(0x29))
    {
      return false;
    }
    tcsB.getRawData(r, g, b, &clearValue);
    return true;
  }

  if (!isConnected(0x29))
  {
    return false;
  }
  tcs.getRawData(r, g, b, &clearValue);
  return true;
}

template <typename ReadR, typename ReadG, typename ReadB>
static inline void readColorSmoothedCustom(ReadR readR, ReadG readG, ReadB readB, long *outR, long *outG, long *outB)
{
  long sumR = 0;
  long sumG = 0;
  long sumB = 0;

  for (int i = 0; i < g_colorReadConfig.samples; ++i)
  {
    sumR += (long)readR();
    sumG += (long)readG();
    sumB += (long)readB();
    delay(g_colorReadConfig.sampleDelayMs);
  }

  int samples = g_colorReadConfig.samples;
  if (samples <= 0)
  {
    samples = 1;
  }

  if (outR != NULL)
    *outR = sumR / samples;
  if (outG != NULL)
    *outG = sumG / samples;
  if (outB != NULL)
    *outB = sumB / samples;
}

static inline void readColorSmoothed(int sensorPos, long *outR, long *outG, long *outB)
{
  readColorSmoothedCustom(
      [sensorPos]() -> long {
        uint16_t r = 0, g = 0, b = 0;
        if (!pb_tcs_read_raw_rgb(sensorPos, &r, &g, &b))
        {
          return 0;
        }
        return (long)r;
      },
      [sensorPos]() -> long {
        uint16_t r = 0, g = 0, b = 0;
        if (!pb_tcs_read_raw_rgb(sensorPos, &r, &g, &b))
        {
          return 0;
        }
        return (long)g;
      },
      [sensorPos]() -> long {
        uint16_t r = 0, g = 0, b = 0;
        if (!pb_tcs_read_raw_rgb(sensorPos, &r, &g, &b))
        {
          return 0;
        }
        return (long)b;
      },
      outR, outG, outB);
}

static inline int detectColorFromRGB(long r, long g, long b)
{
  long sum = r + g + b;
  if (sum < g_colorDetectConfig.sumMin)
  {
    return 0;
  }

  long maxValue = r;
  if (g > maxValue)
    maxValue = g;
  if (b > maxValue)
    maxValue = b;

  long minValue = r;
  if (g < minValue)
    minValue = g;
  if (b < minValue)
    minValue = b;

  if ((maxValue - minValue) < g_colorDetectConfig.chromaMin)
  {
    return 0;
  }

  float rn = (float)r / (float)sum;
  float gn = (float)g / (float)sum;
  float bn = (float)b / (float)sum;

  float blackDist = pb_color_norm_distance(rn, gn, bn,
                                           g_colorDetectConfig.blackR,
                                           g_colorDetectConfig.blackG,
                                           g_colorDetectConfig.blackB);
  if (blackDist <= g_colorDetectConfig.blackNormDistMax)
  {
    return 0;
  }

  float bestDist = 9999.0f;
  int bestId = 0;

  float distRed = pb_color_norm_distance(rn, gn, bn,
                                         g_colorDetectConfig.redR,
                                         g_colorDetectConfig.redG,
                                         g_colorDetectConfig.redB);
  if (distRed < bestDist)
  {
    bestDist = distRed;
    bestId = 1;
  }

  float distGreen = pb_color_norm_distance(rn, gn, bn,
                                           g_colorDetectConfig.greenR,
                                           g_colorDetectConfig.greenG,
                                           g_colorDetectConfig.greenB);
  if (distGreen < bestDist)
  {
    bestDist = distGreen;
    bestId = 2;
  }

  float distBlue = pb_color_norm_distance(rn, gn, bn,
                                          g_colorDetectConfig.blueR,
                                          g_colorDetectConfig.blueG,
                                          g_colorDetectConfig.blueB);
  if (distBlue < bestDist)
  {
    bestDist = distBlue;
    bestId = 3;
  }

  float distYellow = pb_color_norm_distance(rn, gn, bn,
                                            g_colorDetectConfig.yellowR,
                                            g_colorDetectConfig.yellowG,
                                            g_colorDetectConfig.yellowB);
  if (distYellow < bestDist)
  {
    bestDist = distYellow;
    bestId = 4;
  }

  if (bestDist > g_colorDetectConfig.normDistMax)
  {
    return 0;
  }

  if (bestId == 4 && (r + g) < g_colorDetectConfig.yellowRgMin)
  {
    return 0;
  }

  return bestId;
}

#endif

