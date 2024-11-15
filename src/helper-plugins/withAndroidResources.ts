import { ConfigPlugin, withDangerousMod } from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';

import { TExpoNotifeeRemote } from '../types';

export const RES_PATH = 'app/src/main/res/';

const withAndroidResources: ConfigPlugin<TExpoNotifeeRemote> = (config, { soundFiles, soundFilesPath }) => {
  return withDangerousMod(config, [
    'android',
    async newConfig => {
      for (const file of soundFiles) {
        const soundPath = path.join(newConfig.modRequest.projectRoot, soundFilesPath, file);
        const targetPath = path.join(newConfig.modRequest.platformProjectRoot, RES_PATH, 'raw/', file);

        if (!fs.existsSync(path.dirname(targetPath))) {
          fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        }
        fs.copyFileSync(soundPath, targetPath);
      }
      return newConfig;
    },
  ]);
};
export default withAndroidResources;
