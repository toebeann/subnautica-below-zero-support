/**
 * Subnautica: Below Zero Support - Vortex support for Subnautica
 * Copyright (C) 2023 Tobey Blaber
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 3 of the License, or (at your
 * option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * for more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, see <https://www.gnu.org/licenses>.
 */
import { basename, dirname, extname, join, sep } from 'path';
import { BEPINEX_INJECTOR_CORE_FILES } from './bepinex';
import { BEPINEX_CORE_DIR, BEPINEX_DIR, BEPINEX_PLUGINS_DIR, isBepInExEnabled } from '../bepinex';
import { TRANSLATION_OPTIONS } from '../constants';
import { isQModManagerEnabled } from '../qmodmanager';
import { QMM_MOD_DIR } from '../qmodmanager';
import { assemblyHasBepInExPlugins, some, getDiscovery } from '../utils';
import { BEPINEX_PLUGIN_MOD_TYPE } from '../mod-types/bepinex-plugin';
import { QMM_MOD_MANIFEST, QMM_MOD_MOD_TYPE } from '../mod-types/qmodmanager-mod';
import { NEXUS_GAME_ID } from '../platforms/nexus';
import { types, util } from 'vortex-api';
import IDialogResult = types.IDialogResult;
import IExtensionApi = types.IExtensionApi;
import IExtensionContext = types.IExtensionContext;
import IInstallResult = types.IInstallResult;
import IInstruction = types.IInstruction;
import TestSupported = types.TestSupported;
import UserCanceled = util.UserCanceled;

/**
 * Determines whether the installer is supported for the given mod files and game.
 * @param files 
 * @param gameId 
 * @returns 
 */
export const testSupported: TestSupported = async (files, gameId) => {
    const filesLowerCase = files.filter(file => !file.endsWith(sep)).map(file => file.toLowerCase());
    const assemblies = filesLowerCase.filter(file => extname(file) === '.dll');
    const assemblyDirs = assemblies.map(file => dirname(file).split(sep));
    const index = assemblyDirs[0]?.indexOf(BEPINEX_PLUGINS_DIR.toLowerCase());
    return {
        requiredFiles: [],
        supported: gameId === NEXUS_GAME_ID
            && assemblies.length > 0
            && assemblyDirs.every(segments => segments.indexOf(BEPINEX_PLUGINS_DIR.toLowerCase()) === index)
            && !BEPINEX_INJECTOR_CORE_FILES.every(file => filesLowerCase.includes(join(BEPINEX_DIR, BEPINEX_CORE_DIR, file).toLowerCase()))
    };
}

/**
 * Parses the given mod files into installation instructions.
 * @param files 
 * @returns 
 */
export const install = async (api: IExtensionApi, files: string[], workingPath: string) => {
    const sansDirectories = files.filter(file => !file.endsWith(sep));
    const assembly = sansDirectories.find(file => extname(file).toLowerCase() === '.dll')!;
    const assemblyDir = basename(dirname(assembly));
    const assemblyDirIndex = assembly.split(sep).indexOf(assemblyDir);
    const filtered = sansDirectories.filter(file => file.split(sep).indexOf(assemblyDir) === assemblyDirIndex);
    const modType = await getModType(api, filtered, workingPath);
    const index = assembly.split(sep).indexOf(modType === QMM_MOD_MOD_TYPE ? QMM_MOD_DIR : BEPINEX_PLUGINS_DIR);

    const instructions = filtered.map((source): IInstruction => ({
        type: 'copy',
        source,
        destination: join(dirname(source).split(sep).slice(index + 1).join(sep), basename(source)),
    }));

    return <IInstallResult>{
        instructions: hasQmmManifest(filtered) && modType !== QMM_MOD_MOD_TYPE
            ? instructions.filter(instruction => basename(instruction.destination ?? '').toLowerCase() !== QMM_MOD_MANIFEST)
            : instructions
    };
}

/**
 * A helper utility to determine the mod type of the given mod files.
 * @param api 
 * @param files 
 * @param workingPath 
 * @returns 
 */
const getModType = async (api: IExtensionApi, files: string[], workingPath: string) => {
    if (!hasQmmManifest(files)) {
        return BEPINEX_PLUGIN_MOD_TYPE;
    }

    if (!await hasBepInExPlugins(api, files, workingPath)) {
        return QMM_MOD_MOD_TYPE;
    }

    const qmmEnabled = isQModManagerEnabled(api.getState());
    const bepinexEnabled = isBepInExEnabled(api.getState());

    // when the user has both or neither QMM and BepInEx enabled
    // (or only QMM, because it won't work without BepInEx anyway),
    // we should ask the user which mod loader to use
    if ((qmmEnabled && bepinexEnabled) ||
        (!qmmEnabled && !bepinexEnabled) ||
        qmmEnabled) {

        const result = await api.showDialog?.('question', 'Choose mod type', {
            text: 'This mod can be installed for either {{qmodmanager}} or {{bepinex}}. Would you like to:',
            choices: [
                {
                    id: 'bepinex',
                    value: true,
                    text: 'Install as the "BepInEx Plugin" mod type',
                    subText: api.translate('This is the recommended option, and will use {{bepinex}} as the mod loader for this mod.', TRANSLATION_OPTIONS),
                },
                {
                    id: 'qmodmanager',
                    value: false,
                    text: 'Install as the "QModManager Mod" mod type',
                    subText: api.translate(
                        'This will use {{qmodmanager}} as the mod loader for this mod. ' +
                        'Please note that {{qmodmanager}} has been deprecated and will no longer be receiving updates.',
                        TRANSLATION_OPTIONS),
                },
            ],
            bbcode:
                'If you later change your mind about which mod loader to use for this mod, you can change it ' +
                'by double-clicking the mod in the mods list and changing the changing the "Mod Type" option:{{br}}{{br}}' +
                '[b]BepInEx Plugin[/b] will cause the mod to be loaded by {{bepinex}}.{{br}}{{br}}' +
                '[b]QModManager Mod[/b] will cause the mod to be loaded by {{qmodmanager}}.{{br}}{{br}}' +
                'You may also install a variant of the mod by right-clicking it in the mods list and selecting "Reinstall," and choosing ' +
                '"[b]Install as variant of the existing mod[/b]." This will enable you to easily toggle between the mod types.',
            options: {
                wrap: true,
                order: ['text', 'choices', 'bbcode']
            },
            parameters: TRANSLATION_OPTIONS.replace
        }, [
            { label: 'Cancel' },
            { label: 'Continue' },
        ]) as IDialogResult | undefined;

        if (result?.action === 'Cancel') {
            throw new UserCanceled();
        }

        return result?.input['qmodmanager'] ? QMM_MOD_MOD_TYPE : BEPINEX_PLUGIN_MOD_TYPE;
    }

    return BEPINEX_PLUGIN_MOD_TYPE;
}

/**
 * A helper utility to determine whether the given mod files contain a QModManager manifest.
 * @param files 
 * @returns
 */
const hasQmmManifest = (files: string[]) => files.some(f => basename(f).toLowerCase() === QMM_MOD_MANIFEST);

/**
 * A helper utility to determine whether the given mod files contain BepInEx plugins via the BepInEx.AssemblyInspection.Console.exe command-line utility.
 * @param api 
 * @param files 
 * @param workingPath 
 * @param discovery 
 * @returns 
 */
const hasBepInExPlugins = (api: IExtensionApi, files: string[], workingPath: string, discovery = getDiscovery(api.getState())) => {
    const sansDirectories = files.filter(file => !file.endsWith(sep));
    const assemblies = sansDirectories.filter(file => extname(file).toLowerCase() === '.dll'.toLowerCase());

    return some(assemblies, assembly => assemblyHasBepInExPlugins(api, join(workingPath, assembly), discovery));
}

/**
 * Registers the BepInEx plugin installer with the Vortex API.
 * @param context 
 * @returns 
 */
export const register = (context: IExtensionContext) => context.registerInstaller('bepinex-plugin', 35, testSupported, (files, workingPath) => install(context.api, files, workingPath));
export default register;

