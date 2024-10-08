import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoNotifeeRemoteNSEViewProps } from './ExpoNotifeeRemoteNSE.types';

const NativeView: React.ComponentType<ExpoNotifeeRemoteNSEViewProps> =
  requireNativeViewManager('ExpoNotifeeRemoteNSE');

export default function ExpoNotifeeRemoteNSEView(props: ExpoNotifeeRemoteNSEViewProps) {
  return <NativeView {...props} />;
}
