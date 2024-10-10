import { ConfigPlugin, withPodfile } from '@expo/config-plugins';

import { EXTENSION_NAME } from '../constants';
import { TExpoNotifeeRemote } from '../types';

export const NOTIFEE_CORE_POD = `

$NotifeeExtension = true

target '${EXTENSION_NAME}' do
  # Needed for the notification service extension target
  pod 'RNNotifeeCore', :path => '../node_modules/@notifee/react-native'
  
  use_frameworks! :linkage => podfile_properties['ios.useFrameworks'].to_sym if podfile_properties['ios.useFrameworks']
  use_frameworks! :linkage => ENV['USE_FRAMEWORKS'].to_sym if ENV['USE_FRAMEWORKS']
end

`;

/**
 * Adds NotifeeCore pod to the Podfile for the Notification Service Extension. See:
 * @link https://notifee.app/react-native/docs/ios/remote-notification-support#add-target-to-the-podfile */
const withNotifeeCorePod: ConfigPlugin<TExpoNotifeeRemote> = config => {
  return withPodfile(config, podConfig => {
    // Add the extension target along with NotifeeCore pod at the end of the Podfile
    podConfig.modResults.contents = podConfig.modResults.contents + NOTIFEE_CORE_POD;

    return podConfig;
  });
};

export default withNotifeeCorePod;
