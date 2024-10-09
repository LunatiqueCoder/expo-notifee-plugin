import { ConfigPlugin, withXcodeProject } from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';

import { EXTENSION_NAME } from '../constants';
import { TExpoNotifeeRemote } from '../types';

const withSounds: ConfigPlugin<TExpoNotifeeRemote> = (config, { soundFiles, soundFilesPath }) => {
  return withXcodeProject(config, newConfig => {
    for (const file of soundFiles) {
      const soundPath = path.join(newConfig.modRequest.projectRoot, soundFilesPath, file);

      const targetPath = path.join(newConfig.modRequest.platformProjectRoot, EXTENSION_NAME, file);

      if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      }
      fs.copyFileSync(soundPath, targetPath);
    }

    return newConfig;
  });
};

export default withSounds;
