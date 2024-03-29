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
import { TRANSLATION_OPTIONS } from './constants';
import { enableMods, getMods } from './utils';
import { QMM_4_MOD_TYPE } from './mod-types/qmodmanager-4';
import { QMM_MOD_MOD_TYPE } from './mod-types/qmodmanager-mod';
import { NEXUS_GAME_ID } from './platforms/nexus';
import { types, util } from 'vortex-api';
import IExtensionApi = types.IExtensionApi;
import IState = types.IState;
import getModType = util.getModType;
import opn = util.opn;

/**
 * URL to the QModManager page on Nexus Mods.
 */
export const QMM_URL = 'https://www.nexusmods.com/subnauticabelowzero/mods/1';
/**
 * Nexus Mods ID for QModManager.
 */
export const QMM_NEXUS_ID = 1;
/**
 * QModManager directory name.
 */
export const QMM_DIR = 'QModManager';
/**
 * Path to the QModManager mods directory relative to the game directory.
 */
export const QMM_MOD_DIR = 'QMods';

/**
 * Utility function to determine whether QModManager is enabled via the Vortex API.
 * @param state 
 * @returns True if QModManager is enabled, false otherwise.
 */
export const isQModManagerEnabled = (state: IState) =>
    getMods(state, 'enabled').some(mod =>
        mod.type === QMM_4_MOD_TYPE ||
        (mod.attributes?.homepage === QMM_URL ||
            (mod.attributes?.modId === QMM_NEXUS_ID && mod.attributes?.gameId === NEXUS_GAME_ID)) &&
        (mod.type === 'dinput' || getModType(mod.type) === undefined));

/**
 * Utility function to determing whether any QMods are enabled via the Vortex API.
 * @param state 
 * @returns True if any QMods are installed, false otherwise. Always returns false is no QMods were installed and enabled via Vortex.
 */
export const areAnyQModsEnabled = (state: IState) => getMods(state, 'enabled').some(mod => mod.type === QMM_MOD_MOD_TYPE);

/**
 * Utility function to validate the QModManager installation and notify the user of any issues.
 * @param api 
 */
export const validateQModManager = async (api: IExtensionApi) => {

    if (!isQModManagerEnabled(api.getState()) && areAnyQModsEnabled(api.getState())) {
        // user has QMods enabled but has not installed/enabled QModManager

        const potentials = getMods(api.getState(), 'disabled').filter(mod => mod.type === QMM_4_MOD_TYPE);
        const disabledQmm = potentials.length === 1 ? potentials[0] : undefined;

        api.sendNotification?.({
            id: 'qmodmanager-missing',
            type: 'warning',
            title: api.translate(`{{qmodmanager}} is ${disabledQmm ? 'disabled' : 'not installed'}`, TRANSLATION_OPTIONS),
            message: api.translate('{{qmodmanager}} is required to use {{qmods}}.', TRANSLATION_OPTIONS),
            actions: [
                disabledQmm // if QMM is disabled, offer to enable it
                    ? { title: api.translate('Enable'), action: () => enableMods(api, true, disabledQmm.id) }
                    : { title: api.translate('Get {{qmm}}', TRANSLATION_OPTIONS), action: () => opn(QMM_URL) }
            ],
        });
    } else {
        api.dismissNotification?.('qmodmanager-missing');
    }
}
