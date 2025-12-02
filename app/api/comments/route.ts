import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const videoId = searchParams.get("videoId");

  try {
    const response = await fetch(
      `http://dev2025.7gapp.me/api/post_comments/${videoId}`
    );
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching from external API:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), {
      status: 500,
    });
  }
}
