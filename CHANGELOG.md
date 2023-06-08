# Changelog

## [2.0.3] - 2023-06-08

_Users affected by an issue where some QMods were not being installed correctly should reinstall the affected QMods._

### Fixed

- Resolve issue where QMod archives which include a "QMods" folder result in nested "QMods" folders when installed ([`c9c262b`](https://github.com/toebeann/subnautica-below-zero-support/commit/c9c262b))

## [2.0.2] - 2023-06-01

### Changed

- Change license from LGPL-3.0 to GPL-3.0 ([`e82efca`](https://github.com/toebeann/subnautica-below-zero-support/commit/e82efca))
- Always expand first entry in changelogs when opening dialog ([`d8a5c89`](https://github.com/toebeann/subnautica-below-zero-support/commit/d8a5c89))

### Fixed

- Correct handling of `BepInEx.cfg` for BepInEx packs without an included `BepInEx.legacy.cfg` ([`d42c151`](https://github.com/toebeann/subnautica-below-zero-support/commit/d42c151))
- Stop notifying users to reinstall BepInEx pack when enabling/disabling QModManager if reinstalling would not update the `BepInEx.cfg` file ([`15f150a`](https://github.com/toebeann/subnautica-below-zero-support/commit/15f150a))

## [2.0.1] - 2023-05-13

### Fixed

- Resolve an issue where the latest changelog displays every time you switched to the Subnautica: Below Zero game mode, rather than just when an important update is released ([`eed8028`](https://github.com/toebeann/subnautica-below-zero-support/commit/eed8028))

## [2.0.0] - 2023-05-13

_This release comprises a complete rewrite of the extension from scratch by the new lead maintainer, [toebeann]._

### Changed

- Filter out files which conflict with the BepInEx pack when installing QModManager
- Improve the game version detection so that the actual game version is reported rather than the version of the Unity engine used to compile it
- Suppress the warning about QModManager not being installed until the user has one or more QMods installed

### Added

- Support installing the BepInEx Pack for Subnautica: Below Zero
- Support installing BepInEx plugins and patchers
- Support installing CustomPosters and CustomHullPlates addon packs (QMM only)
- Notify the user that they need to install BepInEx if it is not already installed
- Add a changelog GUI to automatically let users know about updates

### Removed

- Drop support for Vortex versions older than 1.8.0

## 1.2.4 - 2022-06-30

### Added

- Support the Xbox and Microsoft Store apps

## 1.2.3 - 2021-06-14

_Changelogs for this release were not recorded by the prior maintainers._

## 1.2.2 - 2021-04-25

### Changed

- Prevent installing multiple QMods from a single archive

## 1.2.1 - 2021-02-15

### Added

- Support installing QModManager

## 1.2.0 - 2021-02-05

_Changelogs for this release were not recorded by the prior maintainers._

[2.0.3]: https://github.com/toebeann/subnautica-below-zero-support/releases/tag/v2.0.3
[2.0.2]: https://github.com/toebeann/subnautica-below-zero-support/releases/tag/v2.0.2
[2.0.1]: https://github.com/toebeann/subnautica-below-zero-support/releases/tag/v2.0.1
[2.0.0]: https://github.com/toebeann/subnautica-below-zero-support/releases/tag/v2.0.0
[toebeann]: https://github.com/toebeann
