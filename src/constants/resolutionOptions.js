/**
 * @enum
 */
export const Resolutions = {
  unlimited: 'Unlimited',
  highest: '1080p',
  normal: '720p',
  minecraft: 'Minecraft'
}

export const resolutionsValues = {
  [Resolutions.unlimited]: { width: { ideal: 4096 }, height: { ideal: 2160 } },
  [Resolutions.highest]: { width: 1920, height: 1080 },
  [Resolutions.normal]: { width: 1280, height: 720 },
  [Resolutions.minecraft]: { width: 50, height: 25 },
}

export const resolutionOptions = Object.values(Resolutions);
