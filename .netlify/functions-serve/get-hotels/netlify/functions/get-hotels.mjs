
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/get-hotels.mts
import "@netlify/functions";
var get_hotels_default = async (request, context) => {
  if (request.method === "POST") {
    const body = await request.json();
    const { liteApiApiKey, placeId, placeCoordinates, language, currency, locality, checkin, checkout, adults, children, minRating } = body;
    const params = {
      placeId,
      currency,
      checkin: checkin || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      checkout: checkout || new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 1)).toISOString().split("T")[0],
      occupancies: [{
        adults: adults || 2,
        ...children?.length > 0 ? { children } : {}
      }],
      maxRatesPerHotel: 1,
      guestNationality: language,
      minRating: minRating || 0
    };
    const response = await fetch("https://api.liteapi.travel/v3.0/hotels/rates", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": liteApiApiKey
      },
      body: JSON.stringify(params)
    });
    const data = await response.json();
    const hotels = await Promise.all(
      data.hotels.map(async (hotel) => {
        const mapBoxGeocodingResponse = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?access_token=pk.eyJ1IjoiaWNpbGl2ZSIsImEiOiJjbWR0YXEwbnYwNjYxMnZzaXFiajNqOG83In0.a7dih_G8Uwgr9gNauqSexA&proximity=${String(placeCoordinates.lng)},${String(placeCoordinates.lat)}&q=${hotel.address.replace(/ /g, "+")}&limit=1`, {
          method: "GET",
          redirect: "follow"
        });
        const geocodingData = await mapBoxGeocodingResponse.json();
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
          rate: Math.round(data.data.find((rate) => rate.hotelId === hotel.id)?.roomTypes[0].rates[0].retailRate.total[0].amount),
          placeId,
          locality
        };
      })
    );
    return new Response(JSON.stringify({
      success: true,
      data: {
        hotels
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  return new Response(JSON.stringify({
    message: "Method not allowed"
  }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};
var config = {
  path: "/api/get-hotels"
};
export {
  config,
  get_hotels_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvZ2V0LWhvdGVscy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IENvbmZpZywgQ29udGV4dCB9IGZyb20gXCJAbmV0bGlmeS9mdW5jdGlvbnNcIlxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxdWVzdDogUmVxdWVzdCwgY29udGV4dDogQ29udGV4dCkgPT4ge1xuICBpZiAocmVxdWVzdC5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgY29uc3QgeyBsaXRlQXBpQXBpS2V5LCBwbGFjZUlkLCBwbGFjZUNvb3JkaW5hdGVzLCBsYW5ndWFnZSwgY3VycmVuY3ksIGxvY2FsaXR5LCBjaGVja2luLCBjaGVja291dCwgYWR1bHRzLCBjaGlsZHJlbiwgbWluUmF0aW5nIH0gPSBib2R5XG4gIFxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHBsYWNlSWQ6IHBsYWNlSWQsXG4gICAgICBjdXJyZW5jeSxcbiAgICAgIGNoZWNraW46IGNoZWNraW4gfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICBjaGVja291dDogY2hlY2tvdXQgfHwgbmV3IERhdGUobmV3IERhdGUoKS5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsgMSkpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgIG9jY3VwYW5jaWVzOiBbe1xuICAgICAgICBhZHVsdHM6IGFkdWx0cyB8fCAyLFxuICAgICAgICAuLi4oY2hpbGRyZW4/Lmxlbmd0aCA+IDAgPyB7IGNoaWxkcmVuIH0gOiB7fSksXG4gICAgICB9XSxcbiAgICAgIG1heFJhdGVzUGVySG90ZWw6IDEsXG4gICAgICBndWVzdE5hdGlvbmFsaXR5OiBsYW5ndWFnZSxcbiAgICAgIG1pblJhdGluZzogbWluUmF0aW5nIHx8IDBcbiAgICB9XG4gIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmxpdGVhcGkudHJhdmVsL3YzLjAvaG90ZWxzL3JhdGVzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJYLUFQSS1LRVlcIjogbGl0ZUFwaUFwaUtleVxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICB9KVxuICBcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG5cbiAgICBjb25zdCBob3RlbHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGRhdGEuaG90ZWxzXG4gICAgICAgIC5tYXAoYXN5bmMgKGhvdGVsOiBhbnkpID0+IHtcbiAgICAgICAgICAvLyBGaW5kIGhvdGVscyBjb29yZGluYXRlcyB1c2luZyBNYXBib3ggZ2VvY29kaW5nXG4gICAgICAgICAgY29uc3QgbWFwQm94R2VvY29kaW5nUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9zZWFyY2gvZ2VvY29kZS92Ni9mb3J3YXJkP2FjY2Vzc190b2tlbj1way5leUoxSWpvaWFXTnBiR2wyWlNJc0ltRWlPaUpqYldSMFlYRXdibll3TmpZeE1uWnphWEZpYWpOcU9HODNJbjAuYTdkaWhfRzhVd2dyOWdOYXVxU2V4QSZwcm94aW1pdHk9JHtTdHJpbmcocGxhY2VDb29yZGluYXRlcy5sbmcpfSwke1N0cmluZyhwbGFjZUNvb3JkaW5hdGVzLmxhdCl9JnE9JHtob3RlbC5hZGRyZXNzLnJlcGxhY2UoLyAvZywgJysnKX0mbGltaXQ9MWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHJlZGlyZWN0OiBcImZvbGxvd1wiXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGNvbnN0IGdlb2NvZGluZ0RhdGEgPSBhd2FpdCBtYXBCb3hHZW9jb2RpbmdSZXNwb25zZS5qc29uKClcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGhvdGVsLmlkLFxuICAgICAgICAgICAgYWRkcmVzczogaG90ZWwuYWRkcmVzcyxcbiAgICAgICAgICAgIG5hbWU6IGhvdGVsLm5hbWUsXG4gICAgICAgICAgICBpbWFnZTogaG90ZWwubWFpbl9waG90byxcbiAgICAgICAgICAgIHJhdGluZzogaG90ZWwucmF0aW5nLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHtcbiAgICAgICAgICAgICAgbG5nOiBnZW9jb2RpbmdEYXRhLmZlYXR1cmVzWzBdLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgICBsYXQ6IGdlb2NvZGluZ0RhdGEuZmVhdHVyZXNbMF0uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByYXRlOiBNYXRoLnJvdW5kKGRhdGEuZGF0YS5maW5kKChyYXRlOiBhbnkpID0+IHJhdGUuaG90ZWxJZCA9PT0gaG90ZWwuaWQpPy5yb29tVHlwZXNbMF0ucmF0ZXNbMF0ucmV0YWlsUmF0ZS50b3RhbFswXS5hbW91bnQpLFxuICAgICAgICAgICAgcGxhY2VJZCxcbiAgICAgICAgICAgIGxvY2FsaXR5LFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICApXG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGhvdGVsc1xuICAgICAgfVxuICAgIH0pLCB7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICBtZXNzYWdlOiAnTWV0aG9kIG5vdCBhbGxvd2VkJ1xuICB9KSwge1xuICAgIHN0YXR1czogNDA1LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgIH0sXG4gIH0pO1xufVxuXG5leHBvcnQgY29uc3QgY29uZmlnOiBDb25maWcgPSB7XG4gIHBhdGg6IFwiL2FwaS9nZXQtaG90ZWxzXCJcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsT0FBZ0M7QUFFaEMsSUFBTyxxQkFBUSxPQUFPLFNBQWtCLFlBQXFCO0FBQzNELE1BQUksUUFBUSxXQUFXLFFBQVE7QUFDN0IsVUFBTSxPQUFPLE1BQU0sUUFBUSxLQUFLO0FBRWhDLFVBQU0sRUFBRSxlQUFlLFNBQVMsa0JBQWtCLFVBQVUsVUFBVSxVQUFVLFNBQVMsVUFBVSxRQUFRLFVBQVUsVUFBVSxJQUFJO0FBRW5JLFVBQU0sU0FBUztBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsTUFDQSxTQUFTLFlBQVcsb0JBQUksS0FBSyxHQUFFLFlBQVksRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFDekQsVUFBVSxZQUFZLElBQUksTUFBSyxvQkFBSSxLQUFLLEdBQUUsU0FBUSxvQkFBSSxLQUFLLEdBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFDdkcsYUFBYSxDQUFDO0FBQUEsUUFDWixRQUFRLFVBQVU7QUFBQSxRQUNsQixHQUFJLFVBQVUsU0FBUyxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUM7QUFBQSxNQUM3QyxDQUFDO0FBQUEsTUFDRCxrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXLGFBQWE7QUFBQSxJQUMxQjtBQUVBLFVBQU0sV0FBVyxNQUFNLE1BQU0sZ0RBQWdEO0FBQUEsTUFDM0UsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsZ0JBQWdCO0FBQUEsUUFDaEIsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLE1BQU0sS0FBSyxVQUFVLE1BQU07QUFBQSxJQUM3QixDQUFDO0FBRUQsVUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBRWpDLFVBQU0sU0FBUyxNQUFNLFFBQVE7QUFBQSxNQUMzQixLQUFLLE9BQ0YsSUFBSSxPQUFPLFVBQWU7QUFFekIsY0FBTSwwQkFBMEIsTUFBTSxNQUFNLHFLQUFxSyxPQUFPLGlCQUFpQixHQUFHLENBQUMsSUFBSSxPQUFPLGlCQUFpQixHQUFHLENBQUMsTUFBTSxNQUFNLFFBQVEsUUFBUSxNQUFNLEdBQUcsQ0FBQyxZQUFZO0FBQUEsVUFDN1QsUUFBUTtBQUFBLFVBQ1IsVUFBVTtBQUFBLFFBQ1osQ0FBQztBQUVELGNBQU0sZ0JBQWdCLE1BQU0sd0JBQXdCLEtBQUs7QUFDekQsZUFBTztBQUFBLFVBQ0wsSUFBSSxNQUFNO0FBQUEsVUFDVixTQUFTLE1BQU07QUFBQSxVQUNmLE1BQU0sTUFBTTtBQUFBLFVBQ1osT0FBTyxNQUFNO0FBQUEsVUFDYixRQUFRLE1BQU07QUFBQSxVQUNkLGFBQWE7QUFBQSxZQUNYLEtBQUssY0FBYyxTQUFTLENBQUMsRUFBRSxTQUFTLFlBQVksQ0FBQztBQUFBLFlBQ3JELEtBQUssY0FBYyxTQUFTLENBQUMsRUFBRSxTQUFTLFlBQVksQ0FBQztBQUFBLFVBQ3ZEO0FBQUEsVUFDQSxNQUFNLEtBQUssTUFBTSxLQUFLLEtBQUssS0FBSyxDQUFDLFNBQWMsS0FBSyxZQUFZLE1BQU0sRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFdBQVcsTUFBTSxDQUFDLEVBQUUsTUFBTTtBQUFBLFVBQzNIO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNMO0FBRUEsV0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVO0FBQUEsTUFDakMsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLFFBQ0o7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDLEdBQUc7QUFBQSxNQUNGLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNQLGdCQUFnQjtBQUFBLFFBQ2hCLCtCQUErQjtBQUFBLE1BQ2pDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU8sSUFBSSxTQUFTLEtBQUssVUFBVTtBQUFBLElBQ2pDLFNBQVM7QUFBQSxFQUNYLENBQUMsR0FBRztBQUFBLElBQ0YsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsK0JBQStCO0FBQUEsSUFDakM7QUFBQSxFQUNGLENBQUM7QUFDSDtBQUVPLElBQU0sU0FBaUI7QUFBQSxFQUM1QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
