import { withXcodeProject, ConfigPlugin } from '@expo/config-plugins';

import { EXTENSION_CONTROLLER_NAME, EXTENSION_NAME } from '../constants';
import { TExpoNotifeeRemote } from '../types';

const withXcodeTarget: ConfigPlugin<TExpoNotifeeRemote> = (config, { developmentTeam, soundFiles }) => {
  return withXcodeProject(config, newConfig => {
    const pbxProject = newConfig.modResults;

    // WORK AROUND for codeProject.addTarget BUG
    // Xcode projects don't contain these if there is only one target
    // An upstream fix should be made to the code referenced in this link:
    //   - https://github.com/apache/cordova-node-xcode/blob/8b98cabc5978359db88dc9ff2d4c015cba40f150/lib/pbxProject.js#L860
    const projObjects = pbxProject.hash.project.objects;
    projObjects.PBXTargetDependency = projObjects.PBXTargetDependency || {};
    projObjects.PBXContainerItemProxy = projObjects.PBXTargetDependency || {};

    const target = pbxProject.addTarget(EXTENSION_NAME, 'app_extension', EXTENSION_NAME);
    pbxProject.addBuildPhase([], 'PBXSourcesBuildPhase', 'Sources', target.uuid);
    pbxProject.addBuildPhase([], 'PBXResourcesBuildPhase', 'Resources', target.uuid);
    const pbxGroupKey = pbxProject.pbxCreateGroup(EXTENSION_NAME, EXTENSION_NAME);
    pbxProject.addFile(`${EXTENSION_NAME}/Info.plist`, pbxGroupKey);
    pbxProject.addSourceFile(
      `${EXTENSION_NAME}/${EXTENSION_CONTROLLER_NAME}.swift`,
      { target: target.uuid },
      pbxGroupKey
    );

    for (const file of soundFiles) {
      pbxProject.addSourceFile(`${EXTENSION_NAME}/${file}`, { target: target.uuid }, pbxGroupKey);
    }

    const configurations = pbxProject.pbxXCBuildConfigurationSection();
    for (const key in configurations) {
      if (typeof configurations[key].buildSettings !== 'undefined') {
        const buildSettingsObj = configurations[key].buildSettings;
        if (
          typeof buildSettingsObj.PRODUCT_NAME !== 'undefined' &&
          buildSettingsObj.PRODUCT_NAME === `"${EXTENSION_NAME}"`
        ) {
          buildSettingsObj.CLANG_ENABLE_MODULES = 'YES';
          buildSettingsObj.INFOPLIST_FILE = `"${EXTENSION_NAME}/Info.plist"`;
          buildSettingsObj.CODE_SIGN_ENTITLEMENTS = `"${EXTENSION_NAME}/${EXTENSION_NAME}.entitlements"`;
          buildSettingsObj.CODE_SIGN_STYLE = 'Automatic';
          buildSettingsObj.CURRENT_PROJECT_VERSION = `"${newConfig.ios?.buildNumber}"`;
          buildSettingsObj.GENERATE_INFOPLIST_FILE = 'YES';
          buildSettingsObj.MARKETING_VERSION = `"${newConfig.version}"`;
          buildSettingsObj.PRODUCT_BUNDLE_IDENTIFIER = `"${newConfig.ios?.bundleIdentifier}.${EXTENSION_NAME}"`;
          buildSettingsObj.SWIFT_EMIT_LOC_STRINGS = 'YES';
          buildSettingsObj.SWIFT_VERSION = '5.0';
          buildSettingsObj.TARGETED_DEVICE_FAMILY = '"1,2"';
          buildSettingsObj.DEVELOPMENT_TEAM = developmentTeam;
        }
      }
    }

    pbxProject.addTargetAttribute('DevelopmentTeam', developmentTeam, EXTENSION_NAME);
    pbxProject.addTargetAttribute('DevelopmentTeam', developmentTeam);

    return newConfig;
  });
};

export default withXcodeTarget;
