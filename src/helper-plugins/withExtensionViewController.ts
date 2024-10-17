import { ConfigPlugin, withXcodeProject } from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';

import { EXTENSION_CONTROLLER_NAME, EXTENSION_NAME, EXTENSION_PATH } from '../constants';
import { TExpoNotifeeRemote } from '../types';

const withExtensionViewController: ConfigPlugin<TExpoNotifeeRemote> = (config, pluginParams) => {
  return withXcodeProject(config, newConfig => {
    const { customNotificationServicePath } = pluginParams;
    let controllerPath = '';

    if (customNotificationServicePath) {
      controllerPath = path.join(newConfig.modRequest.projectRoot, customNotificationServicePath);

      if (!fs.existsSync(customNotificationServicePath)) {
        throw new Error(
          `
          ### EXPO-NOTIFEE-PLUGIN ERROR: Incorrect path for NotifeeNotificationService file! File does not exist:
          ### EXPO-NOTIFEE-PLUGIN ERROR: ${controllerPath}`
        );
      }

      if (
        !customNotificationServicePath.endsWith(`${EXTENSION_CONTROLLER_NAME}.m`) &&
        !customNotificationServicePath.endsWith(`${EXTENSION_CONTROLLER_NAME}.swift`)
      ) {
        throw new Error(
          `
          ### EXPO-NOTIFEE-PLUGIN ERROR: Incorrect path for NotifeeNotificationService file! Should end with:
          - NotifeeNotificationService.m
          OR 
          - NotifeeNotificationService.swift
          `
        );
      }
    } else {
      // No custom file path was found, use default
      controllerPath = path.join(
        newConfig.modRequest.projectRoot,
        EXTENSION_PATH,
        EXTENSION_NAME,
        `${EXTENSION_CONTROLLER_NAME}.swift`
      );
    }

    const isObjectiveC = controllerPath.endsWith('.m');

    const targetPath = path.join(
      newConfig.modRequest.platformProjectRoot,
      EXTENSION_NAME,
      `${EXTENSION_CONTROLLER_NAME}.${isObjectiveC ? 'm' : 'swift'}`
    );

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(controllerPath, targetPath);

    // Include header file for Objective-C
    if (isObjectiveC) {
      const headerPath = path.join(
        newConfig.modRequest.projectRoot,
        EXTENSION_PATH,
        EXTENSION_NAME,
        `${EXTENSION_CONTROLLER_NAME}.h`
      );

      const headerTargetPath = path.join(
        newConfig.modRequest.platformProjectRoot,
        EXTENSION_NAME,
        `${EXTENSION_CONTROLLER_NAME}.h`
      );
      fs.copyFileSync(headerPath, headerTargetPath);
    }

    return newConfig;
  });
};

export default withExtensionViewController;
