import { basename, dirname, join, sep } from 'path';
import { getDiscovery, getMods } from '../utils';
import { QMM_MOD_PATH } from '../qmodmanager';
import { CUSTOMPOSTERS_FOLDER, MRPURPLE6411_ADDON_FILES, MRPURPLE6411_ADDON_MANIFEST } from '../installers/mrpurple6411-addon-pack';
import { NEXUS_GAME_ID } from '../platforms/nexus';
import { types } from 'vortex-api';
import IExtensionContext = types.IExtensionContext;
import IGame = types.IGame;
import IInstruction = types.IInstruction;
import IState = types.IState;

/**
 * CustomPosters Pack mod type.
 */
export const CUSTOMPOSTERS_PACK_MOD_TYPE = 'customposters-pack';

/**
 * Determines whether the mod type is supported for the specified game.
 * @param gameId 
 * @returns 
 */
export const isSupported = (gameId: string): boolean => gameId === NEXUS_GAME_ID;

/**
 * Retrieves the absolute path to the installation directory for this mod type.
 * @param state 
 * @param game 
 * @returns 
 */
// TODO: improve the logic to test whether customposters is installed as a bepinex plugin or a qmod
export const getPath = (state: IState, game: IGame): string => join(getDiscovery(state, game.id)?.path ?? '', QMM_MOD_PATH);

/**
 * Determines whether a given mod is of this mod type.
 * @returns 
 */
export const test = async (installInstructions: IInstruction[]): Promise<boolean> => {
    const copy = installInstructions.filter(instruction => instruction.type === 'copy');
    const copyDestinationsLowerCase = copy.filter(instruction => instruction.destination)
        .map(instruction => instruction.destination!.toLowerCase());
    const manifests = copyDestinationsLowerCase.filter(dest => basename(dest) === MRPURPLE6411_ADDON_MANIFEST.toLowerCase());
    const rootDir = basename(dirname(dirname(dirname(manifests[0] ?? ''))));
    const destinationDirs = copyDestinationsLowerCase.map(dest => dirname(dest).split(sep));
    const index = destinationDirs[0]?.indexOf(rootDir);
    return rootDir.toLowerCase() === CUSTOMPOSTERS_FOLDER.toLowerCase()
        && destinationDirs.every(segments => segments.indexOf(rootDir.toLowerCase()) === index)
        && MRPURPLE6411_ADDON_FILES.every(file => copyDestinationsLowerCase.map(f => basename(f)).includes(file.toLowerCase()));
}

/**
 * Registers the CustomPosters Pack mod type with the Vortex API.
 * @param context 
 * @returns 
 */
export const register = (context: IExtensionContext) =>
    context.registerModType(
        CUSTOMPOSTERS_PACK_MOD_TYPE,
        90,
        isSupported,
        (game: IGame) => getPath(context.api.getState(), game),
        test,
        {
            name: 'CustomPosters Pack',
            mergeMods: true
        }
    );
export default register;
