function extractDriveFileId(url: string): string | null {
  const normalizedUrl = url.trim();

  if (!normalizedUrl) {
    return null;
  }

  const regexes = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const regex of regexes) {
    const match = normalizedUrl.match(regex);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

export function getDriveImageUrl(url: string): string {
  const normalizedUrl = url.trim();

  if (!normalizedUrl) {
    return "";
  }

  if (
    normalizedUrl.startsWith("/api/drive-image") ||
    normalizedUrl.includes("drive.google.com/thumbnail") ||
    normalizedUrl.includes("lh3.googleusercontent.com") ||
    normalizedUrl.includes("drive.usercontent.google.com")
  ) {
    return normalizedUrl;
  }

  const fileId = extractDriveFileId(normalizedUrl);

  if (!fileId) {
    return normalizedUrl;
  }

  return `/api/drive-image?id=${encodeURIComponent(fileId)}`;
}

export function getDriveFileId(url: string): string | null {
  return extractDriveFileId(url);
}
