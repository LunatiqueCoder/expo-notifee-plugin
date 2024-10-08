import * as React from 'react';

import { ExpoNotifeeRemoteNSEViewProps } from './ExpoNotifeeRemoteNSE.types';

export default function ExpoNotifeeRemoteNSEView(props: ExpoNotifeeRemoteNSEViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
