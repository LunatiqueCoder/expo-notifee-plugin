export type TExpoNotifeeRemote = {
  /**
   * @summary Apple App Groups
   * @description Array of Apple App Groups. Merges with config from app.json: <br>
   * `ios.entitlements['com.apple.security.application-groups']`
   *
   * Creates one of none provided.
   * @example appGroups: ['group.app.bluesky']
   * @link https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_security_application-groups
   */
  appGroups?: string[];
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
