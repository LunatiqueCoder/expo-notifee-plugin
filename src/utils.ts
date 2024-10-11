import { ExportedConfig } from '@expo/config-plugins';

import { APPLE_APP_GROUP_SECURITY } from './constants';

export const mergeWithConfigAppGroups = (config: ExportedConfig, appGroups: string[] = []) => {
  if (appGroups?.some(item => typeof item !== 'string')) {
    throw new Error('### NotifeeRemoteExtension Plugin Error: appGroups should be an array of strings!');
  }

  /** Get the App Groups from app.config.js */
  const configAppGroups: string[] = config.ios.entitlements[APPLE_APP_GROUP_SECURITY];

  if (Array.isArray(configAppGroups)) {
    if (configAppGroups?.length > 0) {
      /** Merge App Groups and remove duplicates */
      const mergedAppGroups = configAppGroups
        .concat(appGroups)
        .filter((item, index, arr) => arr.indexOf(item) === index);

      if (mergedAppGroups?.length > 0) {
        return mergedAppGroups;
      }
    }
  }

  if (appGroups?.length > 0) {
    // Probably no Apple App Group was found in app.config.js
    // But there are Apple Groups in the plugin params

    return appGroups;
  } else {
    // No Apple App Group was found,
    // not in the plugin params,
    // and not even in app.config.js
    const fallback = [config.ios.bundleIdentifier.replace('com.', 'group.app.')];

    return fallback;
  }
};
