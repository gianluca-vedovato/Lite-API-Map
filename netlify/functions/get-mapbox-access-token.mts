import { Config, Context } from "@netlify/functions"

export default async (): Promise<Response> => {
  // TODO: Improve security by checking the origin of the request
  return new Response(JSON.stringify({
    accessToken: process.env.MAPBOX_ACCESS_TOKEN
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export const config: Config = {
  path: "/api/get-mapbox-access-token"
};