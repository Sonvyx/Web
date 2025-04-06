import { ConfigService } from '../services/config.service';

export const APP_INITIALIZER_FN = (config: ConfigService) => {
  return (): Promise<boolean> => {
    return config.loadAppConfig();
  };
};
