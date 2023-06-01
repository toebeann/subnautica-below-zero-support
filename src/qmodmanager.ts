import { TRANSLATION_OPTIONS } from './constants';
import { getMods, enableMods } from './utils';
import { QMM_4_MOD_TYPE } from './mod-types/qmodmanager-4';
import { QMM_MOD_MOD_TYPE } from './mod-types/qmodmanager-mod';
import { types, util } from 'vortex-api';
import IExtensionApi = types.IExtensionApi;
import IState = types.IState;
import opn = util.opn;

/**
 * URL to the QModManager page on Nexus Mods.
 */
export const QMM_URL = 'https://www.nexusmods.com/subnauticabelowzero/mods/1';
/**
 * QModManager directory name.
 */
export const QMM_DIR = 'QModManager';
/**
 * Path to the QModManager mods directory relative to the game directory.
 */
export const QMM_MOD_PATH = 'QMods';

/**
 * Utility function to determine whether QModManager is enabled via the Vortex API.
 * @param state 
 * @returns True if QModManager is enabled, false otherwise.
 */
export const isQModManagerEnabled = (state: IState) =>
    getMods(state, 'enabled').some(mod =>
        mod.attributes?.homepage === QMM_URL ||
        (mod.attributes?.modId === 1 && mod.attributes?.downloadGame === 'subnauticabelowzero') ||
        mod.type === QMM_4_MOD_TYPE);

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
                disabledQmm // if there's only one matching QMM mod, we can enable it automatically
                    ? { title: api.translate('Enable'), action: () => enableMods(api, true, disabledQmm.id) }
                    : { title: api.translate('Get {{qmm}}', TRANSLATION_OPTIONS), action: () => opn(QMM_URL) }
            ],
        });
    } else {
        api.dismissNotification?.('qmodmanager-missing');
    }
}
