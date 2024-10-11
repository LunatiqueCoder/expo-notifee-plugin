import { ConfigPlugin, withEntitlementsPlist } from '@expo/config-plugins';

import { APPLE_APP_GROUP_SECURITY } from '../constants';
import { TExpoNotifeeRemote } from '../types';
import { mergeWithConfigAppGroups } from '../utils';

const withAppEntitlements: ConfigPlugin<TExpoNotifeeRemote> = (config, { appGroups }) => {
  return withEntitlementsPlist(config, newConfig => {
    newConfig.modResults[APPLE_APP_GROUP_SECURITY] = mergeWithConfigAppGroups(config, appGroups);

    return newConfig;
  });
};

export default withAppEntitlements;
