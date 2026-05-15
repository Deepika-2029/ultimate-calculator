import { createClient } from "@supabase/supabase-js";

// Environment variables — set in Netlify dashboard
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const HEADERS = {
  "Content-Type":                "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: HEADERS, body: "" };
  }

  try {
    // ── GET /api/history ───────────────────────────
    if (event.httpMethod === "GET") {
      const { data, error } = await supabase
        .from("history")
        .select("id, entry, created_at")
        .order("id", { ascending: false })
        .limit(100);

      if (error) throw error;
      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify({ ok: true, history: data }),
      };
    }

    // ── POST /api/history ──────────────────────────
    if (event.httpMethod === "POST") {
      const { entry } = JSON.parse(event.body || "{}");
      if (!entry || typeof entry !== "string") {
        return {
          statusCode: 400,
          headers: HEADERS,
          body: JSON.stringify({ ok: false, error: "entry is required" }),
        };
      }

      const { data, error } = await supabase
        .from("history")
        .insert({ entry: entry.trim() })
        .select("id")
        .single();

      if (error) throw error;
      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify({ ok: true, id: data.id }),
      };
    }

    // ── DELETE /api/history ────────────────────────
    if (event.httpMethod === "DELETE") {
      const { error } = await supabase
        .from("history")
        .delete()
        .not("id", "is", null);   // delete all rows

      if (error) throw error;
      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify({ ok: true }),
      };
    }

    return {
      statusCode: 405,
      headers: HEADERS,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };

  } catch (err) {
    console.error("[history fn]", err.message);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};
