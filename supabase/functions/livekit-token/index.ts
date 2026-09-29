import { AccessToken } from "npm:livekit-server-sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
      return new Response("Missing authentication", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const livekitUrl = Deno.env.get("LIVEKIT_URL");
    const livekitApiKey = Deno.env.get("LIVEKIT_API_KEY");
    const livekitApiSecret = Deno.env.get("LIVEKIT_API_SECRET");

    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      !livekitUrl ||
      !livekitApiKey ||
      !livekitApiSecret
    ) {
      return new Response("Live room service is not configured", {
        status: 503,
        headers: corsHeaders,
      });
    }

    const userResponse = await fetch(supabaseUrl + "/auth/v1/user", {
      headers: {
        Authorization: authorization,
        apikey: supabaseAnonKey,
      },
    });

    if (!userResponse.ok) {
      return new Response("Invalid authentication", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const user = await userResponse.json();
    const body = await request.json();
    const roomId = String(body?.roomId || "").trim();
    const mode = String(body?.mode || "").trim();

    if (!roomId || roomId.length > 120) {
      return new Response("Invalid room", {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (!["voice", "video", "game"].includes(mode)) {
      return new Response("Invalid room mode", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const token = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity: user.id,
      name:
        user.user_metadata?.display_name ||
        user.user_metadata?.name ||
        "Ugo member",
      ttl: "2h",
    });

    token.addGrant({
      room: roomId,
      roomJoin: true,
      canPublish: mode !== "game",
      canSubscribe: true,
      canPublishData: true,
    });

    const jwt = await token.toJwt();

    return Response.json(
      { token: jwt, url: livekitUrl },
      { headers: corsHeaders },
    );
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Unexpected token error",
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});
