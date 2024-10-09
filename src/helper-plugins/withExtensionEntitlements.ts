import { ConfigPlugin, withInfoPlist } from '@expo/config-plugins';
import plist from '@expo/plist';
import fs from 'fs';
import path from 'path';

import { APPLE_APP_GROUP_SECURITY, EXTENSION_NAME } from '../constants';
import { TExpoNotifeeRemote } from '../types';

const withExtensionEntitlements: ConfigPlugin<TExpoNotifeeRemote> = (config, { appGroup }) => {
  return withInfoPlist(config, newConfig => {
    const extensionEntitlementsPath = path.join(
      newConfig.modRequest.platformProjectRoot,
      EXTENSION_NAME,
      `${EXTENSION_NAME}.entitlements`
    );

    const notificationsExtensionEntitlements = {};

    if (appGroup) {
      notificationsExtensionEntitlements[APPLE_APP_GROUP_SECURITY] = appGroup;
    }

    fs.mkdirSync(path.dirname(extensionEntitlementsPath), {
      recursive: true,
    });
    fs.writeFileSync(extensionEntitlementsPath, plist.build(notificationsExtensionEntitlements));

    return newConfig;
  });
};

export default withExtensionEntitlements;
