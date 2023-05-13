import { types } from 'vortex-api';
import IGameStoreEntry = types.IGameStoreEntry;

/**
 * Xbox game id for Subnautica: Below Zero.
 */
export const XBOX_GAME_ID = 'UnknownWorldsEntertainmen.SubnauticaBelowZero';

/**
 * Xbox app executable name used to launch the game.
 */
export const XBOX_APP_EXEC_NAME = 'App';

/**
 * Gets the Xbox app executable name used to launch the game.
 * @param gameStoreEntry 
 * @returns The Xbox app executable name used to launch the game.
 */
export const getAppExecName = (gameStoreEntry: IGameStoreEntry) =>
    'executionName' in gameStoreEntry && typeof gameStoreEntry.executionName === 'string'
        ? gameStoreEntry.executionName
        : XBOX_APP_EXEC_NAME;