/** Name of the NotificationServiceExtension */
export const EXTENSION_NAME = 'NotifeeNSE';

export const EXTENSION_CONTROLLER_NAME = 'NotifeeNotificationService';

export const EXTENSION_PATH = 'node_modules/expo-notifee-remote-plugin/ios';

export const APPLE_APP_GROUP_SECURITY = 'com.apple.security.application-groups';

export const ENABLE_NOTIFEE_EXTENSION = `

$NotifeeExtension = true

`;

/**
 * Needed in Podfile to enable to use NotifeeExtensionHelper
 * in our NotificationServiceExtension
 * @link https://notifee.app/react-native/docs/ios/remote-notification-support#add-target-to-the-podfile */
export const NOTIFEE_CORE_POD = `

target '${EXTENSION_NAME}' do
  # Needed for the notification service extension target
  pod 'RNNotifeeCore', :path => '../node_modules/@notifee/react-native'
  
  use_frameworks! :linkage => podfile_properties['ios.useFrameworks'].to_sym if podfile_properties['ios.useFrameworks']
  use_frameworks! :linkage => ENV['USE_FRAMEWORKS'].to_sym if ENV['USE_FRAMEWORKS']

end

`;
