import { ConfigPlugin, withEntitlementsPlist } from '@expo/config-plugins';

import { APPLE_APP_GROUP_SECURITY } from '../constants';
import { TExpoNotifeeRemote } from '../types';

const withAppEntitlements: ConfigPlugin<TExpoNotifeeRemote> = (config, { appGroup }) => {
  return withEntitlementsPlist(config, newConfig => {
    if (appGroup) {
      newConfig.modResults[APPLE_APP_GROUP_SECURITY] = [appGroup];
    }

    return newConfig;
  });
};

export default withAppEntitlements;
