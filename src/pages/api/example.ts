export const prerender = false;
import type { APIRoute } from "astro";

export const GET = (async ({ session }) => {
  return new Response(
    JSON.stringify({
      message: "this is a GET request!",
    }),
  );
}) satisfies APIRoute;

export const POST = (async ({ request }) => {
  const data = await request.json();
  return new Response(
    JSON.stringify({
      message: "this is a POST request!",
      data,
    }),
  );
}) satisfies APIRoute;

export const PUT = (async ({ request }) => {
  const data = await request.json();
  return new Response(
    JSON.stringify({
      message: "this is a PUT request!",
      data,
    }),
  );
}) satisfies APIRoute;

export const DELETE = (async ({ request }) => {
  const data = await request.json();
  return new Response(
    JSON.stringify({
      message: "this is a DELETE request!",
      data,
    }),
  );
}) satisfies APIRoute;
