import { ConfigPlugin, withXcodeProject } from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';

import { EXTENSION_CONTROLLER_NAME, EXTENSION_NAME, EXTENSION_PATH } from '../constants';
import { TExpoNotifeeRemote } from '../types';

const withExtensionViewController: ConfigPlugin<TExpoNotifeeRemote> = config => {
  return withXcodeProject(config, newConfig => {
    const controllerPath = path.join(
      newConfig.modRequest.projectRoot,
      EXTENSION_PATH,
      EXTENSION_NAME,
      `${EXTENSION_CONTROLLER_NAME}.swift`
    );

    const targetPath = path.join(
      newConfig.modRequest.platformProjectRoot,
      EXTENSION_NAME,
      `${EXTENSION_CONTROLLER_NAME}.swift`
    );

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(controllerPath, targetPath);

    return newConfig;
  });
};

export default withExtensionViewController;
