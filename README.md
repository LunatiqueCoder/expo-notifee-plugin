# Notifee Remote NotificationServiceExtension plugin for Expo

[![Expo][34]][35]
![platforms][7]
[![GitHub top language][31]][32]
[![GitHub][9]][10]
[![npm][13]][14]

# 🖲 `expo-notifee-remote-plugin`
### `expo-notifee-remote-plugin` is an Expo plugin that configures a NotificationServiceExtension to use Notifee for remote notifications

> 📖 Please visit the [`Notifee's Docs: Remote Notification Support`][20] to see what this plugin does behind the scenes 

##  🔧 Installation
### Yarn:
```
yarn add expo-notifee-remote-plugin
```
### NPM:
```
npm install --save expo-notifee-remote-plugin
```

## 🎛 Setup
1. Add it to your [`plugins`](https://docs.expo.dev/config-plugins/introduction/#use-a-config-plugin) in your `app.json` file:  

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifee-remote-plugin",
        {
          "developmentTeam": "MYDEVTEAMID"
        }
      ]
    ]
  }
}
```


2. Run `npx expo prebuild -p ios`
3. Run `yarn ios`


### Types

If you use [`app.config.ts`](https://docs.expo.dev/workflow/configuration/#using-typescript-for-configuration-appconfigts-instead-of-appconfigjs) for example:

```ts

import { ExpoConfig } from 'expo/config';
import { TExpoNotifeeRemote } from 'expo-notifee-remote-plugin';

const notifeeOptions: TExpoNotifeeRemote = {
  /**
   * Apple App Group if applicable.
   * @link https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_security_application-groups
   */
  appGroup?: string;
  /** Custom target name of the NotificationServiceExtension
   * @default NotifeeNotificationService
   */
  appTarget?: string;
  developmentTeam: string;
  /**
   * An array containing the sound file names (including file extensions)
   * @example soundFiles: ['dm.aiff']
   * */
  soundFiles?: string[];
  /** Path of the folder that contains the sound. Relative to the app.config.js file.
   * @example soundFilesPath: 'assets/audio'
   */
  soundFilesPath?: string;
};

export const plugins: ExpoConfig['plugins'] = [
  'expo-localization',
  ['expo-screen-orientation', { initialOrientation: 'PORTRAIT_UP' }],
  '@react-native-firebase/app',
  ['expo-notifee-remote-plugin', notifeeOptions],
];

```

## 🛸 Usage


Example with Firebase Node SDK:


```ts
import type {Notification} from '@notifee/react-native/src/types/Notification';
import {AndroidImportance} from '@notifee/react-native/src/types/NotificationAndroid';
import {MulticastMessage} from 'firebase-admin/lib/messaging/messaging-api';
import admin from '../src/firebase-admin';

/**
 * @link https://notifee.app/react-native/reference/notification
 */
const notifeeOptions: Notification = {
  title: 'Title',
  subtitle: 'Subtitle',
  body: 'Main body content of the notification',
  android: {
    channelId: 'default',
    importance: AndroidImportance.HIGH,
    lightUpScreen: true,
    pressAction: {
      id: 'default',
    },
    sound: 'default',
  },
  ios: {
    sound: 'default',
    // Adding `foregroundPresentationOptions` controls how to
    // behave when app is UP AND RUNNING, not terminated,
    // AND not in background!
    foregroundPresentationOptions: {
      badge: true,
      banner: true,
      list: true,
      sound: true,
    },
  },
};


/** 
 * @description Firebase Message
 * @link https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.basemessage.md#basemessage_interface
 */
const message: MulticastMessage = {
  // ✅ We can continue using local/data-only notification for Android
  // 👍 while triggering iOS remote notifications from `apns`
  data: {notifee_options: JSON.stringify(notifeeOptions)},
  tokens: [],
  android: {
    priority: 'high', // Needed to trigger data-only notifications
  },
  apns: {
    payload: {
      notifee_options: notifeeOptions,
      aps: {
        alert: {
          // 🚧 This is needed to trigger an alert/remote notification only for iOS
          // 👍 but Android will continue using data-only notifications
          title: 'ANY_DUMMY_STRING',
        },
        mutableContent: true,
      },
    },
  },
};

try {
  admin.messaging().sendEachForMulticast(message)
  res.status(200).end();
} catch (e) {
  res.status(400).end();
}
```

## 🤔 What it does?
This plugin handles moving the necessary NotifeeNSE files into their respective iOS directories.

## Steps

1. Updates entitlements
2. Sets the app group to `group.<identifier>` if applicable
3. Adds the extension plist
4. Adds the view controller
5. Adds the NotifeeCore pod in Podfile
6. Adds the sounds (if any) in the iOS project
7. Updates the xcode project's build phases


## 📃 License

> 📃 This project is released under the [MIT License](LICENSE). \
> 💻 By contributing, you agree that your contributions will be licensed under its MIT License.


## 👏 Credits

Adapted from:

- https://github.com/OneSignal/onesignal-expo-plugin/blob/main/onesignal/withOneSignalIos.ts
- https://github.com/bluesky-social/social-app/tree/main/plugins/notificationsExtension

- https://github.com/andrew-levy/react-native-safari-extension
- https://github.com/timedtext/expo-config-plugin-ios-share-extension/blob/master/src/withShareExtensionXcodeTarget.ts


## 🏆 Sponsors

|                           |    
|---------------------------|
| [![jetbrains100][33]][28] |

[7]: https://img.shields.io/badge/platforms-iOS-brightgreen.svg?style=flat-square&colorB=191A17
[9]: https://img.shields.io/github/license/LunatiqueCoder/luna
[10]: https://github.com/LunatiqueCoder/expo-notifee-remote-plugin/blob/master/LICENSE
[13]: https://img.shields.io/npm/v/expo-notifee-remote-plugin
[14]: https://www.npmjs.com/package/expo-notifee-remote-plugin
[28]: https://www.jetbrains.com/
[31]: https://img.shields.io/github/languages/top/LunatiqueCoder/expo-notifee-remote-plugin
[32]: https://github.com/LunatiqueCoder/expo-notifee-remote-plugin/search?l=typescript
[33]: https://user-images.githubusercontent.com/55203625/213786907-b95dfb4b-08bf-4449-a055-72edf401da23.png
[34]: https://img.shields.io/badge/-Expo-282C34?style=flat-square&logo=expo&logoColor=#D04A37
[35]: https://expo.dev/


[20]: https://notifee.app/react-native/docs/ios/remote-notification-support
