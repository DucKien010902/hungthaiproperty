import type { NextRequest } from "next/server";

const DRIVE_IMAGE_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
};

function buildCandidateUrls(fileId: string) {
  return [
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`,
    `https://drive.usercontent.google.com/download?id=${fileId}&export=view&authuser=0`,
    `https://lh3.googleusercontent.com/d/${fileId}=w2000`,
    `https://lh3.googleusercontent.com/u/0/d/${fileId}`,
  ];
}

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("id")?.trim();

  if (!fileId) {
    return new Response("Missing Drive file id.", { status: 400 });
  }

  for (const url of buildCandidateUrls(fileId)) {
    try {
      const response = await fetch(url, {
        headers: DRIVE_IMAGE_HEADERS,
        redirect: "follow",
      });

      if (!response.ok) {
        continue;
      }

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.startsWith("image/")) {
        continue;
      }

      return new Response(response.body, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    } catch {
      continue;
    }
  }

  return new Response("Unable to load Google Drive image.", { status: 404 });
}
