export type TExpoNotifeeRemote = {
  /**
   * Apple App Group if applicable.
   * @link https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_security_application-groups
   */
  appGroup?: string;
  /** Custom target name of the NotificationServiceExtension
   * @default NotifeeNotificationService
   */
  appTarget?: string;
  developmentTeam: string;
  /**
   * An array containing the sound file names (including file extensions)
   * @example soundFiles: ['dm.aiff']
   * */
  soundFiles?: string[];
  /** Path of the folder that contains the sound. Relative to the app.config.js file.
   * @example soundFilesPath: 'assets/audio'
   */
  soundFilesPath?: string;
};
