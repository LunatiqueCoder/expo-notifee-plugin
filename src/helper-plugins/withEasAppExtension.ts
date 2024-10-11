import { ConfigPlugin } from '@expo/config-plugins';

import { APPLE_APP_GROUP_SECURITY, EXTENSION_NAME } from '../constants';
import { TExpoNotifeeRemote } from '../types';
import { mergeWithConfigAppGroups } from '../utils';

/**
 * Makes it possible for EAS CLI to know what app extensions exist before the build starts
 * (before the Xcode project has been generated) to ensure that
 * the required credentials are generated and validated.
 * @link https://docs.expo.dev/build-reference/app-extensions/#managed-projects-experimental-support
 */
const withEasAppExtension: ConfigPlugin<TExpoNotifeeRemote> = (config, { appGroups }) => {
  const bundleIdentifier = config.ios?.bundleIdentifier + '.' + EXTENSION_NAME;

  const expoAppExtension = {
    targetName: EXTENSION_NAME,
    bundleIdentifier,
    entitlements: {},
  };

  expoAppExtension.entitlements[APPLE_APP_GROUP_SECURITY] = mergeWithConfigAppGroups(config, appGroups);

  return {
    ...config,
    extra: {
      ...config.extra,
      eas: {
        ...config.extra?.eas,
        build: {
          ...config.extra?.eas?.build,
          experimental: {
            ...config.extra?.eas?.build?.experimental,
            ios: {
              ...config.extra?.eas?.build?.experimental?.ios,
              appExtensions: [...(config.extra?.eas?.build?.experimental?.ios?.appExtensions ?? []), expoAppExtension],
            },
          },
        },
      },
    },
  };
};

export default withEasAppExtension;
