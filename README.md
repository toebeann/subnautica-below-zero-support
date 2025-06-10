# Subnautica: Below Zero Support for [Vortex]

## Description

This extension adds support for Subnautica: Below Zero to [Vortex Mod Manager], enabling you to easily automate installation of mods for Subnautica: Below Zero without having to worry about where the files are supposed to go, etc.

At this time, the following mod types are supported:

- BepInEx Pack for Subnautica: Below Zero
- BepInEx plugins
- BepInEx patchers
- QModManager
- QMods
- CustomHullPlates addon packs
- CustomPosters addon packs
- Miscellaneous BepInEx mods e.g. hybrid BepInEx plugin/patcher combos, BepInEx config files, or any files designed to be installed to at least one of the BepInEx/config, BepInEx/plugins or BepInEx/patchers folders
- Any .zip, .rar or .7z archive designed to have its contents installed directly into the `BepInEx/plugins` folder

If you are developing a different kind of mod and would like it to be supported by this extension, please [raise an issue or pull request on the GitHub repository](https://github.com/toebeann/subnautica-below-zero-support/issues) with a link to your mod page so that I can take a look at how you are packaging it. Please make sure to include instructions for how you would expect it to be installed, so that I can have Vortex automate the process. PRs welcome!

## How to install

This extension requires [Vortex] ^1.9.0. To install, click the Vortex button at the top of [the Nexus Mods page](https://www.nexusmods.com/site/mods/203) to open this extension within Vortex, and then click `Install`. Alternatively, within Vortex, go to the `Extensions` tab, click "`Find More`" at the bottom of the tab, search for "Subnautica Below Zero Support" and then click `Install`.

You can also manually install it by downloading the main file and dragging it into the "drop zone" labelled "`Drop File(s)`" in the `Extensions` tab at the bottom right.

Afterwards, restart Vortex and you can begin installing supported Subnautica: Below Zero mods with Vortex.

***

**<center><big>The rest of this page is intended for mod authors only.<br/>Users can simply follow the instructions above to install, and you're done!</big></center>**

<center><a href="https://ko-fi.com/toebean_" target="_blank"><img src="https://uploads-ssl.webflow.com/5c14e387dab576fe667689cf/61e11d503cc13747866d338b_Button-2-p-800.png" alt="Support toebeann on Ko-fi"/></a></center>

***

## How to make my mod compatible with this extension?

First things first, make sure to set your latest main file as your main Vortex file, and also ensure that the "`Remove the 'Download with Manager' button`" option is unticked. Be sure to double check this whenever you release an update!

Supported mod types should follow the examples listed below.

Mod types which are not explictly supported or detected by this extension are simply unpacked into the `BepInEx/plugins` folder, so you can take advantage of this for any new mod types that require you to install files within `BepInEx/plugins` (or subfolders thereof) by structuring your archive as if you expect its contents to be placed into the `BepInEx/plugins` folder when installed manually. Also see the [Miscellaneous BepInEx mods](#miscellaneous-bepinex-mods) section below for mods that require miscellaneous files to be placed in at least one of the `BepInEx/config`, `BepInEx/plugins` or `BepInEx/patchers` folders (or subfolders thereof).

If your mod is not of a supported type listed below or cannot be installed by simply unpacking its contents into the the `BepInEx/plugins` folder, you will need to [raise an issue or pull request on the GitHub repository](https://github.com/toebeann/subnautica-below-zero-support/issues) with a link to your mod page so that I can take a look at how you are packaging it. Please make sure to include instructions for how you would expect it to be installed.

### Packaging examples

#### BepInEx plugins

Any of the following structures are valid:

```
- MyBepInExPlugin.dll
```

```
- My BepInEx Plugin
  - MyBepInExPlugin.dll
```

```
- plugins
  - MyBepInExPlugin.dll
```

```
- plugins
  - My BepInEx Plugin
    - MyBepInExPlugin.dll
```

```
- BepInEx
  - plugins
      - MyBepInExPlugin.dll
```

```
- BepInEx
  - plugins
    - My BepInEx Plugin
      - MyBepInExPlugin.dll
```

#### BepInEx patchers

Any of the following structures are valid:

```
- patchers
  - MyBepInExPatcher.dll
```

```
- patchers
  - My BepInEx Patcher
    - MyBepInExPlugin.dll
```

```
- BepInEx
  - patchers
      - MyBepInExPatcher.dll
```

```
- BepInEx
  - patchers
    - My BepInEx Patcher
      - MyBepInExPatcher.dll
```

#### BepInEx plugin/patcher combos

Any of the following structures are valid:

```
- patchers
  - MyBepInExPatcher.dll
- plugins
  - MyBepInExPlugin.dll
```

```
- patchers
  - My Mod Name
    - MyBepInExPatcher.dll
- plugins
  - My Mod Name
    - MyBepInExPlugin.dll
```

```
- BepInEx
  - patchers
    - MyBepInExPatcher.dll
  - plugins
    - MyBepInExPlugin.dll
```

```
- BepInEx
  - patchers
    - My Mod Name
      - MyBepInExPatcher.dll
  - plugins
    - My Mod Name
      - MyBepInExPlugin.dll
```

#### BepInEx config files

Any of the following structures are valid:

```
- config
  - MyConfigFile.cfg
```

```
- BepInEx
  - config
    - MyConfigFile.cfg
```

#### Miscellaneous BepInEx mods

**Any** .zip, .rar or .7z archive intending to install **any** file types to at least one of the `BepInEx/config`, `BepInEx/plugins` or `BepInEx/patchers` folders (or subfolders thereof) are valid:

**Note:** Neither Epic Structure Loader nor Terrain Patcher are available for Subnautica: Below Zero as far as I am aware, they are just used as examples to demonstrate that even though explicit support for these mod types has not been added to this Vortex extension, they can nevertheless be installed correctly when packaged appropriately, and the same goes for other mod types for which explicit support has not been added.

```
- EpicStructureLoader
  - Structures
    - My Really Cool Structure.structure
```

```
- TerrainPatcher
  - patches
    - My Really Cool Terrain Patch.optoctreepatch
```

```
- EpicStructureLoader
  - Structures
    - My Really Cool Structure.structure
- TerrainPatcher
  - patches
    - My Really Cool Terrain Patch.optoctreepatch
```

```
- config
  - A config file for some reason.cfg
  - Some other config file type for some reason.json
- plugins
  - EpicStructureLoader
    - Structures
      - My Really Cool Structure.structure
  - TerrainPatcher
    - patches
      - My Really Cool Terrain Patch.optoctreepatch
  - patchers
    - Whatever file you want.txt
    - Literally any file extension is allowed in any of these folders.exe
```

```
- BepInEx
  - config
    - A config file for some reason.cfg
    - Some other config file type for some reason.json
  - plugins
    - EpicStructureLoader
      - Structures
        - My Really Cool Structure.structure
    - TerrainPatcher
      - patches
        - My Really Cool Terrain Patch.optoctreepatch
    - patchers
      - Whatever file you want.txt
      - Literally any file extension is allowed in any of these folders.exe
```

**Note:** The above examples are non-exhausitive, as long as you are trying to install at least _one_ file of _any_ file extension or type to at least _one_ of the `BepInEx/config`, `BepInEx/plugins`, or `BepInEx/patchers` folders (or subfolders thereof), you should be in the clear - the extension will try to figure it out based on the folder structure. If there's nothing obvious to suggest which BepInEx subfolder to unpack the archive into, it will target the `BepInEx/plugins` folder by default.

#### QMods

Any of the following structures are valid:

```
- My QMod
  - mod.json
  - MyQMod.dll
```

```
- QMods
  - My QMod
    - mod.json
    - MyQMod.dll
```

```
- mod.json
- MyQMod.dll
```

#### Mods which can be installed as either a QMod or a BepInEx plugin

Mods which meet all of the following criteria are eligible to be installed as either a QMod or a BepInEx plugin:

- has a `mod.json` manifest for QModManager
- has an assembly containing a `BaseUnityPlugin` class with a `BepInPlugin` attribute applied to it
- has the following structure:
  ```
  - My Mod
    - mod.json
    - MyMod.dll
  ```

When a user installs an eligible mod, they will be prompted to choose whether they would like to install it for QModManager or BepInEx. The one exception to this rule is when the user only has BepInEx installed but not QModManager, to prevent bugging them with annoying questions. In this case, the mod will automatically be installed as a BepInEx plugin.

#### CustomHullPlates addon packs

Any of the following structures are valid. Note that although these examples only include a single hull plate, the extension will happily install packs containing multiple hull plates.

```
- CustomHullPlates
  - HullPlates
    - MyHullPlate
      - icon.png
      - info.json
      - texture.png
```

```
- HullPlates
  - MyHullPlate
    - icon.png
    - info.json
    - texture.png
```

```
- MyHullPlate
  - icon.png
  - info.json
  - texture.png
```

#### CustomPosters addon packs

Any of the following structures are valid. Note that although these examples only include a single poster, the extension will happily install packs containing multiple posters.

```
- CustomPosters
  - Posters
    - MyPoster
      - icon.png
      - info.json
      - texture.png
```

```
- Posters
  - MyPoster
    - icon.png
    - info.json
    - texture.png
```

```
- MyPoster
  - icon.png
  - info.json
  - texture.png
```

### Mixed CustomHullPlates/CustomPosters addon packs

Any of the following structures are valid. Note that although these examples only include a single hull plate and poster each, the extension will happily install packs containing multiple of each.

```
- CustomHullPlates
  - HullPlates
    - MyHullPlate
      - icon.png
      - info.json
      - texture.png
- CustomPosters
  - Posters
    - MyPoster
      - icon.png
      - info.json
      - texture.png
```

```
- HullPlates
  - MyHullPlate
    - icon.png
    - info.json
    - texture.png
- Posters
  - MyPoster
    - icon.png
    - info.json
    - texture.png
```

```
- MyHullPlate
  - icon.png
  - info.json
  - texture.png
- MyPoster
  - icon.png
  - info.json
  - texture.png
```

#### My mod is being installed strangely!

If you have followed the packaging examples above and your mod is still being incorrectly installed by this extension, please [raise an issue on the GitHub repository](https://github.com/toebeann/subnautica-below-zero-support/issues) with a link to your mod page or with a sample archive attached so that I can get it fixed.

## Copyright notice

Subnautica: Below Zero Support - Vortex support for Subnautica

Copyright (C) 2023 Tobey Blaber

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, see <https://www.gnu.org/licenses>.

[Vortex]: https://www.nexusmods.com/about/vortex/
[Vortex Mod Manager]: https://www.nexusmods.com/about/vortex/
