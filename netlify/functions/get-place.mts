import { Config, Context } from "@netlify/functions"

export default async (request: Request, context: Context): Promise<Response> => {
  if (request.method === 'POST') {
    const body = await request.json()

    const responseData: {
      lng: number,
      lat: number,
      locality: string,
    } = {
      lng: 0,
      lat: 0,
      locality: ''
    }

    if (body.placeId) {
      const response = await fetch(`https://api.liteapi.travel/v3.0/data/places/${body.placeId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': body.liteApiApiKey
        }
      })
      const { data } = await response.json()

      if (!data) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Place not found'
        }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }

      responseData.lng = data.viewport?.high?.longitude
      responseData.lat = data.viewport?.high?.latitude
      responseData.locality = data.addressComponents.find((component: any) => component.locality === 'locality')?.longText || ''
    } else {
      // If no place ID is provided, use the user's location
      responseData.lng = context.geo.longitude || 0
      responseData.lat = context.geo.latitude || 0
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: responseData
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return new Response(JSON.stringify({
    message: 'Method not allowed'
  }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export const config: Config = {
  path: "/api/get-place"
};
