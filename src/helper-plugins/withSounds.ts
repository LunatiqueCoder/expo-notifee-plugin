import { ConfigPlugin, IOSConfig, withXcodeProject, XcodeProject } from '@expo/config-plugins';
import { copyFileSync } from 'fs';
import { basename, resolve } from 'path';

import { TExpoNotifeeRemote } from '../types';

const withSounds: ConfigPlugin<TExpoNotifeeRemote> = (config, { soundFiles, soundFilesPath }) => {
  return withXcodeProject(config, config => {
    setNotificationSounds(config.modRequest.projectRoot, {
      sounds: soundFiles,
      soundFilesPath,
      project: config.modResults,
      projectName: config.modRequest.projectName,
    });
    return config;
  });
};

export function setNotificationSounds(
  projectRoot: string,
  {
    sounds,
    soundFilesPath,
    project,
    projectName,
  }: { sounds: string[]; soundFilesPath: string; project: XcodeProject; projectName: string | undefined }
): XcodeProject {
  if (!projectName) {
    throw new Error(`An error occurred while configuring iOS notifications. Unable to find iOS project name.`);
  }
  if (!Array.isArray(sounds)) {
    throw new Error(
      `An error occurred while configuring iOS notifications. Must provide an array of sound files in your app config, found ${typeof sounds}.`
    );
  }
  const sourceRoot = IOSConfig.Paths.getSourceRoot(projectRoot);
  for (const soundFileRelativePath of sounds) {
    const fileName = basename(soundFileRelativePath);
    const sourceFilepath = resolve(sourceRoot, soundFilesPath, soundFileRelativePath);
    const destinationFilepath = resolve(sourceRoot, fileName);

    // Since it's possible that the filename is the same, but the
    // file itself id different, let's copy it regardless
    copyFileSync(sourceFilepath, destinationFilepath);
    if (!project.hasFile(`${projectName}/${fileName}`)) {
      project = IOSConfig.XcodeUtils.addResourceFileToGroup({
        filepath: `${projectName}/${fileName}`,
        groupName: projectName,
        isBuildFile: true,
        project,
      });
    }
  }

  return project;
}

export default withSounds;
