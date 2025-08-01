Deno.serve(async (req) => {
  const body = await req.json()

  const { liteApiApiKey, placeId } = body

  const params = {
    placeId: placeId,
    currency: 'EUR',
    checkin: new Date().toISOString().split('T')[0],
    checkout: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    occupancies: [{
      adults: 2,
    }],
    guestNationality: 'IT'
  }

  console.log(params)

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

  console.log(data)
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    }
  });
});