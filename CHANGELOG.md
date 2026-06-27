# Changelog

All notable changes to this project will be documented in this file.

---

## [4.0.0] - 2026-06-01

### ✨ Added

- **Dashboard**: added donut chart visualization for backup/restore statistics (`StatsSegmentsDonuts`)
- **Backup Expiration**: new ability to update backup expiration date (`useBackupExpiration`, `useBackupUpdateExpiration`, `UpdateExpirationAction`, `UpdateExpirationForm`)
- **Backup Inspect/Download**: new "Download for inspect" action on backups (`useBackupInspect`, `InspectAction`)
- **Create Backup from Schedule**: trigger a backup directly from an existing schedule (`useCreateBackupFromSchedule`, `CreateBackupFromScheduleForm`, `CreateBackupFromScheduleAction`)
- **Schedule Start/Pause**: start or pause schedules from the UI (`useScheduleStart`, `useSchedulePause`, `StartStopActionIcon`)
- **Cron Schedule Heatmap**: new heatmap visualization for cron schedules (`HeatMapBox`, `HeatMapContent`, `SchedulesHeatmap`, `useStatsSchedules`)
- **Backups Overview & Charts**: new overview panel with bar/line charts for schedule backups (`BackupsOverview`, `BackupsCharts`)
- **Storage Class Mapping (SCMapping)**: full feature for managing storage class mappings — CRUD operations, new route `/sc-mapping` (`useStorageClassesMap`, `useSCCreateMap`, `useSCDelete`, `useSCUpdateMap`, `SCDatatable`, `SCMMRT`, forms, actions)
- **Set Default BSL**: set or remove default Backup Storage Location (`useDefaultBsl`, `SetDefaultBsl`)
- **Repository Info/Check**: view repository stats and check status (`useCheckRepository`, `InfoRepositoryActionIcon`)
- **Credential Management**: view and create location credentials (`useLocationCredentials`, `useLocationDefaultCredentials`, `useCreateLocationCredentials`, `CredentialView`, `CreateLocationCredentialsForm`)
- **Backup/Restore Event Stream**: real-time event stream for in-progress backups & restores (`useStatsInProgress`, `BackupRestoreStream`, `BackupsRestoresMRT`)
- **Last Backups Filter**: toggle to show only latest backup per schedule (`LastBackupsFilter`)
- **MultiSelectCreatable Input**: new creatable multi-select input component
- **SearchableMultiSelect Input**: new searchable multi-select input component
- **ConfigurationOptions Input**: new key-value configuration options input (`ConfigurationOptions`, `ConfigurationOptionsField`)
- **AlertLocationEdit**: warning alert for BSL/VSL edit operations
- **Check App Version**: version checking in header with comparison table (`CheckAppVersion`, `CompareVersion`, `TableVersion`, `useGithubRepoVersion`)
- **VUI Pods View**: settings page to view VUI pods (`useVuiPods`, `Vui`, `VuiMRT`, `PodLogsActionIcon`, `PodLogsContent`)
- **Velero Pods View**: settings page to view Velero pods (`useVeleroPods`, `Velero`, `VeleroMRT`)
- **Watchdog Settings**: full watchdog configuration UI — deploy configs, environment, service, user configs, reload/send report actions
- **NATS Settings**: NATS clients settings page (`useNatsClients`, `useReconnectAgent`, `NatsMRT`)
- **API Settings**: new API settings page
- **UI Settings**: new UI settings page with font, badge, and color configuration
- **Security Status**: system security status view (`TableStatusItem`)
- **New route pages**: `/vui`, `/sc-mapping`, `/settings/api`, `/settings/nats`, `/settings/ui`, `/settings/watchdog`

### 🛠️ Fixed

- **VeleroResourceStatusBadge**: expanded status support — `Available`, `Unavailable`, `Enabled`, `Disabled`, `restic`, `kopia`, `true`, `false`
- **LogsView**: enhanced with debounced search, filter mode (search vs. highlight), and ANSI color code parsing
- **Manifest viewer**: added debounced search functionality

### 🎨 Changed

- **Mantine v8**: major upgrade from Mantine v7 to v8 (`@mantine/*` ^8.0.2, `mantine-react-table` ^2.0.0-beta.9)
- **Next.js 15.5**: upgraded from 15.2.3 to 15.5.18
- **React 19**: upgraded to React 19 with updated type definitions
- **Node 24**: Dockerfile now uses `NODE_VERSION=24-alpine`
- **pnpm 11.5**: package manager updated to `pnpm@11.5.0`
- **TypeScript 5.8.2**: updated from previous version
- **ESLint 9 Flat Config**: migrated to flat config with extended Mantine-style rules
- **BackupDetails restructured**: now uses `VeleroDetailsLayout` with grid layout, includes `UpdateExpirationAction`, `DownloadAction`, `InspectAction` in toolbar
- **ScheduleDetails restructured**: includes `BackupsOverview` tab, `StartStopActionIcon`, `CreateBackupFromScheduleAction`
- **Dashboard restructured**: includes donut charts alongside existing stats
- **App layout**: `AppClientWrapper` now uses `AppInitializer` + `AuthGate` pattern
- **AuthGate improved**: enhanced with `guestOnly` prop, `next` redirect parameter, better auth flow
- **WithCoreAndAgentReady**: includes `renderKey` state and `fallback` prop
- **BackupScheduleFormView**: uses `Stepper` for multi-step form with new input components
- **RestoreFormView**: uses `Stepper` with storage class mapping awareness and `ConfigurationOptions`
- **Contexts expanded**: `ServerContext`, `AgentContext`, `AppContext`, `UIContext` all received new fields

### ⚙️ Performance

- **In-memory cache**: centralized `inMemoryCache` module with configurable TTL via `NEXT_PUBLIC_CACHE_TTL` env var
- **Backup settings caching**: 10-minute cache for backup creation settings
- **Debounce reduced to 150ms**: snappier interactions across watch handlers

### 🔧 Internal / Maintenance

- **Dockerfile rewrite**: complete multi-stage build with `deps`, `builder`, `runner` stages; BuildKit cache mounts; non-root user; standalone output
- **next.config.mjs**: bundle analyzer, standalone output, `optimizePackageImports` for Mantine, turbopack config
- **pnpm-workspace.yaml**: new workspace config with hoisted linker, strict peer deps disabled, security overrides
- **CI workflow**: `ci.yml` with pinned SHA references, full validation pipeline (typecheck, lint, format, test, build, audit)
- **Release workflow**: new `release.yml` — validates tag is on main, builds Docker image with semver tags, pushes to GHCR
- **EventEmitter pattern**: new `EventEmitter.js.ts` using Node.js events for decoupled watch handling
- **WatchedResources**: new `WatchedResources.ts` using `Set` for tracking watched resources per agent
- **AgentStateManager / CoreStateManager**: new state manager classes with boolean tracking and markdown reports
- **New hooks**: `useAppBootstrap`, `usePersistentTableState`, `useUrlAvailability`, `useWatchResources`, context hooks, user hooks, diagnostic hooks
- **Test utilities**: new `test-utils/` directory with custom render and `MantineProvider` wrapper
- **jest.config.cjs / jest.setup.cjs**: updated module mappers, added `ResizeObserver`/`matchMedia` mocks
- **tsconfig.json**: updated with bundler `moduleResolution`, incremental, jest types

### 🧹 Refactored

- **VeleroDetailsLayout**: shared details layout for Backup and Schedule views
- **DetailsBackupRestoreContent/Location/Status**: extracted shared detail sections for both backup and restore views
- **RouteChangeHandler**: new component sending `watch_clear` on route/agent changes
- **API hooks centralized**: all hooks now use `useApiGet`, `useApiPost`, `useApiPatch`, `useApiPut`, `useApiDelete`

## [0.3.1] - 2025-07-30

### 🧹 Maintenance

- Minor code cleanup across components to improve readability and maintainability.
- Updated Mantine React Table configuration to use layoutMode: 'grid' for improved column alignment and layout
  flexibility.

## [0.3.0] - 2025-06-11

### ✨ Added

- **Dashboard**: added overview section with backup statistics (`7ac1eb8`)
- **Dashboard**: updated recent backups table and improved layout (`6842532`)
- **UI**: enhanced deletion modal for improved UX (`bc5eb22`)
- **UI**: added deletion logic for server status and backup requests (`341c5c0`)
- **UI**: updated VeleroResourceStatusBadge with icons and better styling (`93a883c`)
- **UI**: introduced search functionality to Logs component (`574eff4`)
- **UI**: added new logo to login page (`2c52476`)
- **Manifest**: added search capabilities to the manifest viewer (`ddc4880`)
- **Schedule**: added unscheduled namespaces panel with quick scheduling action (`fbf7093`)
- **Table**: added `onlyTable` prop to `BackupDataTable` for embedded views (`2eabbe6`)
- **Core**: wrapped key components (e.g. `BackupDetails`) with `WithCoreAndAgentReady` for better state handling (
  `ca80408`)
- **Table**: centralized layout improvements across app (`48c7b32`)

### 🛠️ Fixed

- **Warnings**: suppressed "deeply nested key returned undefined" warnings (`99f6d19`, `b7e11b0`)
- **UI**: added fallback status to `VeleroResourceStatusBadge` (`79fa579`)

### 🎨 Changed

- **Branding**: updated application logo color scheme (`2fdf60d`)
- **Theme**: updated default color scheme (`646749e`)
- **UI**: updated default loader color for visual consistency (`4920b98`)
- **UI**: refreshed icons across components for better consistency (`9af3161`)

### ⚙️ Performance

- **UI**: reduced debounce delay from 250ms to 150ms for snappier interactions (`708aadd`)

### 🔧 Internal / Maintenance

- **Watchdog**: added reload button to watchdog component (`f2e12e4`)
- **API**: updated `useApiGet` to suppress 401 disconnect notifications (`ef4ceab`)
- **Table**: added `showLoading` prop to `GenericMRTTableLayout` (`7ed94be`)
- **UI**: removed legacy UI code (`dc78f66`)
- **UnscheduledNamespaces**: removed legacy logic (`4117589`)
- **Deps**: removed unused packages and updated `yarn.lock` (`ade8c53`)
- **Logging**: replaced `console.log` with `console.warn` in key areas (`36d950c`)
- **Comments**: cleaned up redundant or outdated comments (`4c7e744`)
- **Release**: synced `package.json` version with project state (`404ec9b`)

### 🧹 Refactored

- **Cache**: extracted `inMemoryCache` from `useApiGet` (`4c2a0be`)
- **Auth**: improved `AuthGate` and related hooks for better control flow (`3bcc0b5`)

## [v0.2.7] - 2025-05-20

### ✨ Features

- **In-memory caching for GET requests**  
  Added support for optional in-memory caching in `useApiGet` with:
  - TTL per endpoint
  - `force` parameter to bypass cache
  - Configurable default TTL via `CACHE_TTL` environment variable  
    _(PRs: `feat(api): add in-memory cache...`, `feat(api): make cache TTL configurable...`)_

### 🔧 Refactoring & Enhancements

- **Core architecture improvements**
  - Introduced `AuthGuard` component for route protection
  - Enhanced API async handling and startup flow
  - Cleaned up legacy/commented code
  - Enabled watchdog in Docker (non cluster mode)
  - Improved context provider variable usage
  - Added support for `next` redirect after login  
    _(PR: `refactor(core): improve auth, API...`)_

- **Improved redirect behavior**
  - Refined redirect logic for `/` path and agent state resets
  - Ensured `watch_clear` is triggered properly on agent switch  
    _(PRs: `refactor(authgate)...`, `fix: trigger watch_clear...`)_

- **API cache key optimization**
  - Introduced `cacheKeyUrl` to exclude `forced` param from cache keys  
    _(PR: `refactor(api): extract cacheKeyUrl...`)_

### 🐛 Bug Fixes

- **Watch state reset**
  - Ensured `watch_clear` triggers on agent name changes  
    _(PR: `fix: trigger watch_clear...`)_

### 🧹 Code Quality

- **Code linting and formatting**
  - Reformatted all JavaScript and TypeScript files to follow ESLint rules
  - No functional changes  
    _(PR: `style(js,tsx): apply linting rules...`)_

## [v0.2.6] - 2025-05-08

🛠️ **Fixes**

- Resolved an issue with version control availability in the new release.

## [v0.2.5] - 2025-05-07

🧱 Maintenance

- Renamed repository from velero-ui to vui-ui to improve project organization

🔧 Improvements

- Improved integration with vui-core

## [v0.2.4] - 2025-04-03

🆕 New Features

- Added pod logs feature

🎨 UI Enhancements

- Various UI improvements for a smoother and more intuitive experience

🔧 Improvements

- 📦 Updated dependencies to their latest stable versions for improved security and performance

## [v0.2.3] - 2025-03-19

🛠️ ️Fixes

- Fixed retrieval of Velero version

## [v0.2.2] - 2025-03-13

🆕 New Features

- Added Server Status Requests monitor
- Added Download Requests monitor
- Added Delete Backup Requests monitor
- Added Pod Volume Backup Management
- Added Pod Volume Restore Management
- Added a new feature
- Implemented event-driven UI management via socket communication

🎨 UI Enhancements

- Introduced a collapsible navbar
- Various UI improvements for a smoother and more intuitive experience

🛠️ Fixes

- Minor bug fixes

## [v0.2.1] - 2025-03-07

🆕 New Features

- Added BSL update feature
- Added VSL update feature

Fixed

- Minor fix

## [v0.2.0] - 2025-03-04

🚀 Major Improvements

- Enhanced Forms: Improved the user experience for creating and modifying backups, schedules, restores, backup
  locations, and volume locations
- Refined Resource Views: Enhanced the display of resource properties for better readability and usability

🆕 New Features

- Clean Manifest View: Added a feature to visualize clean Kubernetes manifests, improving clarity and usability
- Backup Download: Users can now download backups directly from the UI
- Backup Comparison Prototype: Introduced an experimental feature to compare backups with the current Kubernetes
  manifests, providing better insight into changes

🎨 General UI Enhancements

- Various UI improvements for a smoother and more intuitive experience

## [v0.1.22] - 2025-02-17

🔒 Authentication Improvements

- 🔑 Added LDAP authentication for improved integration with directory services
- ⚙️ Added an option for no authentication for environments that don't require authentication

🎨 UI Enhancements

- 🗑️ Removed dependency on next/font/google due to random build errors in Docker images

## [v0.1.21] - 2025-02-07

🚀 New Features

- 🛠️ Added Apprise configuration page to configure Apprise settings
- ⚙️ Added notification settings page for managing notification preferences

🔧 Improvements

- ✨ Various optimizations and minor fixes across the frontend.
- 📦 Updated dependencies to their latest stable versions for improved security and performance

## [v0.1.20] - 2025-01-23

New Features

- Backup Storage Location Management: Added functionality to configure and manage backup storage locations
- Volume Snapshot Location Management: Introduced the ability to configure and manage volume snapshot locations
- Velero Resource Consultation: Added a feature to consult Velero resources

Improvements

- Enhanced UI usability

## [v0.1.19] - 2025-01-11

- Improved code maintainability
- Enhanced UI usability
- Improved contexts
- Improved logger
- Improved check for new versions available

## [v0.1.18] - 2024-12-15

- Improved code maintainability
- Enhanced UI usability

## [v0.1.17] - 2024-09-26

- [Fix issue 43](https://github.com/seriohub/velero-ui/issues/43)

## [v0.1.16] - 2024-08-01

- Added help link
- Added markdown diagnostic report
- Fix compare version

## [v0.1.15] - 2024-07-26

- Added Velero-Core features
- Several improvements
- Fix minor bugs

## [v0.1.14] - 2024-06-28

- Added the feature to select a cluster to connect to before logging in

## [v0.1.13] - 2024-06-18

- Added new feature backup size
- Added sparkline response time

## [v0.1.12] - 2024-05-31

- Added Cron Schedule Heatmap

## [v0.1.11] - 2024-05-21

- Updated the dropdown for resources available on the cluster

## [v0.1.10] - 2024-05-05

- Updated API url mount point

## [v0.1.9] - 2024-04-24

- Added test channel notifications
- Added new versions available notification

## [v0.1.8] - 2024-03-31

- Added watchdog feature

## [v0.1.7] - 2024-03-16

- Added websocket authentication
- Added restic check features
- Improved notifications and messages system
- Fixed issue of multiple API calls upon page load

## [v0.1.6] - 2024-03-06

- Added restic features (check locks, unlock, unlock --remove-all)
- Improved responsive UI

## [v0.1.5] - 2024-03-02

- Improved debug feature
- Fixed error in backup expiration update

## [v0.1.4] - 2024-02-21

- Some improvements

## [v0.1.3] - 2024-02-17

- Added diagnostic feature
- Added arm64 support
- Some improvements
- Fix minor bug

## [v0.1.2] - 2024-02-12

- Added storage class mapping feature
- Minor fix

## [v0.1.1] - 2024-02-04

- Some improvements

## [v0.1.0] - 2024-01-29

- 🎉 first release!

---

## Tags

[4.0.0] : [https://github.com/seriohub/vui-ui/releases/tag/v4.0.0](https://github.com/seriohub/vui-ui/releases/tag/v4.0.0)

[v0.3.1] : [https://github.com/seriohub/vui-ui/releases/tag/v0.3.1](https://github.com/seriohub/vui-ui/releases/tag/v0.3.1)

[v0.3.0] : [https://github.com/seriohub/vui-ui/releases/tag/v0.3.0](https://github.com/seriohub/vui-ui/releases/tag/v0.3.0)

[v0.2.7] : [https://github.com/seriohub/vui-ui/releases/tag/v0.2.7](https://github.com/seriohub/vui-ui/releases/tag/v0.2.7)

[v0.2.6] : [https://github.com/seriohub/vui-ui/releases/tag/v0.2.6](https://github.com/seriohub/vui-ui/releases/tag/v0.2.6)

[v0.2.5] : [https://github.com/seriohub/vui-ui/releases/tag/v0.2.5](https://github.com/seriohub/vui-ui/releases/tag/v0.2.5)

[v0.2.4] : [https://github.com/seriohub/velero-ui/releases/tag/v0.2.4](https://github.com/seriohub/velero-ui/releases/tag/v0.2.4)

[v0.2.3] : [https://github.com/seriohub/velero-ui/releases/tag/v0.2.3](https://github.com/seriohub/velero-ui/releases/tag/v0.2.3)

[v0.2.2] : [https://github.com/seriohub/velero-ui/releases/tag/v0.2.2](https://github.com/seriohub/velero-ui/releases/tag/v0.2.2)

[v0.2.1] : [https://github.com/seriohub/velero-ui/releases/tag/v0.2.1](https://github.com/seriohub/velero-ui/releases/tag/v0.2.1)

[v0.2.0] : [https://github.com/seriohub/velero-ui/releases/tag/v0.2.0](https://github.com/seriohub/velero-ui/releases/tag/v0.2.0)

[v0.1.22] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.22](https://github.com/seriohub/velero-ui/releases/tag/v0.1.22)

[v0.1.21] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.21](https://github.com/seriohub/velero-ui/releases/tag/v0.1.21)

[v0.1.20] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.20](https://github.com/seriohub/velero-ui/releases/tag/v0.1.20)

[v0.1.19] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.19](https://github.com/seriohub/velero-ui/releases/tag/v0.1.19)

[v0.1.18] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.18](https://github.com/seriohub/velero-ui/releases/tag/v0.1.18)

[v0.1.17] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.17](https://github.com/seriohub/velero-ui/releases/tag/v0.1.17)

[v0.1.16] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.16](https://github.com/seriohub/velero-ui/releases/tag/v0.1.16)

[v0.1.15] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.15](https://github.com/seriohub/velero-ui/releases/tag/v0.1.15)

[v0.1.14] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.14](https://github.com/seriohub/velero-ui/releases/tag/v0.1.14)

[v0.1.13] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.13](https://github.com/seriohub/velero-ui/releases/tag/v0.1.13)

[v0.1.12] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.12](https://github.com/seriohub/velero-ui/releases/tag/v0.1.12)

[v0.1.11] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.11](https://github.com/seriohub/velero-ui/releases/tag/v0.1.11)

[v0.1.10] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.10](https://github.com/seriohub/velero-ui/releases/tag/v0.1.10)

[v0.1.9] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.9](https://github.com/seriohub/velero-ui/releases/tag/v0.1.9)

[v0.1.8] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.8](https://github.com/seriohub/velero-ui/releases/tag/v0.1.8)

[v0.1.7] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.7](https://github.com/seriohub/velero-ui/releases/tag/v0.1.7)

[v0.1.6] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.6](https://github.com/seriohub/velero-ui/releases/tag/v0.1.6)

[v0.1.5] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.5](https://github.com/seriohub/velero-ui/releases/tag/v0.1.5)

[v0.1.4] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.4](https://github.com/seriohub/velero-ui/releases/tag/v0.1.4)

[v0.1.3] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.3](https://github.com/seriohub/velero-ui/releases/tag/v0.1.3)

[v0.1.2] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.2](https://github.com/seriohub/velero-ui/releases/tag/v0.1.2)

[v0.1.1] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.1](https://github.com/seriohub/velero-ui/releases/tag/v0.1.1)

[v0.1.0] : [https://github.com/seriohub/velero-ui/releases/tag/v0.1.0](https://github.com/seriohub/velero-ui/releases/tag/v0.1.0)
