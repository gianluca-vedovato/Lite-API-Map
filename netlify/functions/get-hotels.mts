import { Config, Context } from "@netlify/functions"

export default async (request: Request, context: Context) => {
  if (request.method === 'POST') {
    const body = await request.json()

    const { liteApiApiKey, placeId, placeCoordinates, language, currency, locality, checkin, checkout, adults, children, minRating } = body
  
    const params = {
      placeId: placeId,
      currency,
      checkin: checkin || new Date().toISOString().split('T')[0],
      checkout: checkout || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      occupancies: [{
        adults: adults || 2,
        ...(children?.length > 0 ? { children } : {}),
      }],
      maxRatesPerHotel: 1,
      guestNationality: language,
      minRating: minRating || 0
    }
  
    const response = await fetch('https://api.liteapi.travel/v3.0/hotels/rates', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": liteApiApiKey
      },
      body: JSON.stringify(params)
    })
  
    const data = await response.json()

    const hotels = await Promise.all(
      data.hotels
        .map(async (hotel: any) => {
          // Find hotels coordinates using Mapbox geocoding
          const mapBoxGeocodingResponse = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?access_token=pk.eyJ1IjoiaWNpbGl2ZSIsImEiOiJjbWR0YXEwbnYwNjYxMnZzaXFiajNqOG83In0.a7dih_G8Uwgr9gNauqSexA&proximity=${String(placeCoordinates.lng)},${String(placeCoordinates.lat)}&q=${hotel.address.replace(/ /g, '+')}&limit=1`, {
            method: "GET",
            redirect: "follow"
          })

          const geocodingData = await mapBoxGeocodingResponse.json()
          return {
            id: hotel.id,
            address: hotel.address,
            name: hotel.name,
            image: hotel.main_photo,
            rating: hotel.rating,
            coordinates: {
              lng: geocodingData.features[0].geometry.coordinates[0],
              lat: geocodingData.features[0].geometry.coordinates[1]
            },
            rate: Math.round(data.data.find((rate: any) => rate.hotelId === hotel.id)?.roomTypes[0].rates[0].retailRate.total[0].amount),
            placeId,
            locality,
          }
        })
    )

    return new Response(JSON.stringify({
      success: true,
      data: {
        hotels
      }
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
  path: "/api/get-hotels"
};
