import { Platform } from '../core/platform'
import { PlatformManager } from '../core/platform-manager'

export const mockPlatform = (): Promise<Platform> => {
  PlatformManager.unmount()
  return PlatformManager.get({ Constructor: Platform })
}
