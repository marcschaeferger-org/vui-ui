# Security Notes

## Production Audit

`pnpm audit --prod` passes cleanly — no production vulnerabilities.

## Known Dev-Only Findings

None currently. The previous `elliptic` low-severity finding (via Storybook → webpack → node-polyfill-plugin → crypto-browserify) has been eliminated by removing Storybook from the project.

## Known Compatibility Risks

### mantine-react-table (Mantine 7 vs 8)

- **Package**: `mantine-react-table@^2.0.0-beta.9`
- **Issue**: Built for Mantine v7; the project uses Mantine v8. This creates a peer dependency mismatch.
- **Impact**: Currently works due to Mantine 8's backward compatibility, but may break in future Mantine updates.
- **Mitigation**: Plan migration to `@tanstack/react-table` with Mantine components as a separate task.

### recharts v2 (deprecated)

- **Package**: `recharts@2.15.1` (deprecated, v3 available)
- **Issue**: Cannot upgrade to v3 because `@mantine/charts@8.x` imports recharts v2 APIs (`ResponsiveContainer`, `Funnel`) that were removed in v3.
- **Impact**: Low — v2 still works but is no longer maintained.
- **Mitigation**: Upgrade to recharts v3 when `@mantine/charts` adds v3 support, or when migrating to Mantine 9 (which may include v3 compatibility).

## Reporting

If you discover a security vulnerability, please report it privately via GitHub Security Advisories rather than opening a public issue.
