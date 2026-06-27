export function compareVersions(app: string, lastRelease: string): string {
  if (app === undefined || lastRelease === undefined) {
    return '';
  }

  const [major1, minor1, patch1] = app.substring(0).split('.').map(Number);
  const [major2, minor2, patch2] = lastRelease.substring(0).split('.').map(Number);

  if (Number.isNaN(major1) || Number.isNaN(major2) ||
      Number.isNaN(minor1) || Number.isNaN(minor2) ||
      Number.isNaN(patch1) || Number.isNaN(patch2)) {
    return 'incomparable';
  }
  if (major1 > major2) {
    return 'app';
  } else if (major1 < major2) {
    return 'githubRelease';
  }
  if (minor1 > minor2) {
    return 'app';
  } else if (minor1 < minor2) {
    return 'githubRelease';
  }
  if (patch1 > patch2) {
    return 'app';
  } else if (patch1 < patch2) {
    return 'githubRelease';
  }
  return 'Versions are identical.';
}
