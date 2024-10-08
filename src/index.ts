import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoNotifeeRemoteNSE.web.ts
// and on native platforms to ExpoNotifeeRemoteNSE.ts
import ExpoNotifeeRemoteNSEModule from './ExpoNotifeeRemoteNSEModule';
import ExpoNotifeeRemoteNSEView from './ExpoNotifeeRemoteNSEView';
import { ChangeEventPayload, ExpoNotifeeRemoteNSEViewProps } from './ExpoNotifeeRemoteNSE.types';

// Get the native constant value.
export const PI = ExpoNotifeeRemoteNSEModule.PI;

export function hello(): string {
  return ExpoNotifeeRemoteNSEModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoNotifeeRemoteNSEModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoNotifeeRemoteNSEModule ?? NativeModulesProxy.ExpoNotifeeRemoteNSE);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoNotifeeRemoteNSEView, ExpoNotifeeRemoteNSEViewProps, ChangeEventPayload };
