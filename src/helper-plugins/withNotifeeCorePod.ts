import { ConfigPlugin, withPodfile } from '@expo/config-plugins';

import { ENABLE_NOTIFEE_EXTENSION, NOTIFEE_CORE_POD } from '../constants';
import { TExpoNotifeeRemote } from '../types';
const withNotifeeCorePod: ConfigPlugin<TExpoNotifeeRemote> = (config, { appTarget }) => {
  return withPodfile(config, podConfig => {
    if (appTarget) {
      const beforeAppTargetIndex = podConfig.modResults.contents.indexOf(`target '${appTarget}' do`);

      // If `appTarget` is provided, place ENABLE_NOTIFEE_EXTENSION before it
      podConfig.modResults.contents =
        podConfig.modResults.contents.slice(0, beforeAppTargetIndex) +
        ENABLE_NOTIFEE_EXTENSION +
        podConfig.modResults.contents.slice(beforeAppTargetIndex);
    } else {
      // If there's no app target, put ENABLE_NOTIFEE_EXTENSION before NotifeeNSE target (NOTIFEE_CORE_POD)
      podConfig.modResults.contents = podConfig.modResults.contents + ENABLE_NOTIFEE_EXTENSION;
    }

    // Add the extension target along with NotifeeCore pod at the end of the Podfile
    podConfig.modResults.contents = podConfig.modResults.contents + NOTIFEE_CORE_POD;

    return podConfig;
  });
};

export default withNotifeeCorePod;
