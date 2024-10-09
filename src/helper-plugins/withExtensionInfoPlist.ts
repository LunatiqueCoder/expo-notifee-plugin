import { ConfigPlugin, withInfoPlist } from '@expo/config-plugins';
import plist from '@expo/plist';
import fs from 'fs';
import path from 'path';

import { EXTENSION_CONTROLLER_NAME, EXTENSION_NAME, EXTENSION_PATH } from '../constants';
import { TExpoNotifeeRemote } from '../types';

const withExtensionInfoPlist: ConfigPlugin<TExpoNotifeeRemote> = config => {
  return withInfoPlist(config, newConfig => {
    const extensionPlistPath = path.join(
      newConfig.modRequest.projectRoot,
      EXTENSION_PATH,
      EXTENSION_NAME,
      'Info.plist'
    );
    const targetPath = path.join(newConfig.modRequest.platformProjectRoot, EXTENSION_NAME, 'Info.plist');

    const extensionPlist = plist.parse(fs.readFileSync(extensionPlistPath).toString());
    extensionPlist.NSExtension = {
      NSExtensionPointIdentifier: 'com.apple.usernotifications.service',
      NSExtensionPrincipalClass: `$(PRODUCT_MODULE_NAME).${EXTENSION_CONTROLLER_NAME}`,
    };
    extensionPlist.MainAppScheme = newConfig.scheme;
    extensionPlist.CFBundleName = '$(PRODUCT_NAME)';
    extensionPlist.CFBundleDisplayName = EXTENSION_NAME;
    extensionPlist.CFBundleIdentifier = '$(PRODUCT_BUNDLE_IDENTIFIER)';
    extensionPlist.CFBundleVersion = '$(CURRENT_PROJECT_VERSION)';
    extensionPlist.CFBundleExecutable = '$(EXECUTABLE_NAME)';
    extensionPlist.CFBundlePackageType = '$(PRODUCT_BUNDLE_PACKAGE_TYPE)';
    extensionPlist.CFBundleShortVersionString = '$(MARKETING_VERSION)';

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, plist.build(extensionPlist));

    return newConfig;
  });
};

export default withExtensionInfoPlist;
