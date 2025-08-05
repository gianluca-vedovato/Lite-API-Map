
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/get-place.mts
import "@netlify/functions";
var get_place_default = async (request, context) => {
  if (request.method === "POST") {
    const body = await request.json();
    const responseData = {
      lng: 0,
      lat: 0,
      locality: ""
    };
    if (body.placeId) {
      const response = await fetch(`https://api.liteapi.travel/v3.0/data/places/${body.placeId}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": body.liteApiApiKey
        }
      });
      const { data } = await response.json();
      if (!data) {
        return new Response(JSON.stringify({
          success: false,
          message: "Place not found"
        }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      responseData.lng = data.viewport?.high?.longitude;
      responseData.lat = data.viewport?.high?.latitude;
      responseData.locality = data.addressComponents.find((component) => component.locality === "locality")?.longText || "";
    } else {
      responseData.lng = context.geo.longitude || 0;
      responseData.lat = context.geo.latitude || 0;
    }
    return new Response(JSON.stringify({
      success: true,
      data: responseData
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
  path: "/api/get-place"
};
export {
  config,
  get_place_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvZ2V0LXBsYWNlLm10cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQ29uZmlnLCBDb250ZXh0IH0gZnJvbSBcIkBuZXRsaWZ5L2Z1bmN0aW9uc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXF1ZXN0OiBSZXF1ZXN0LCBjb250ZXh0OiBDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4gPT4ge1xuICBpZiAocmVxdWVzdC5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgY29uc3QgcmVzcG9uc2VEYXRhOiB7XG4gICAgICBsbmc6IG51bWJlcixcbiAgICAgIGxhdDogbnVtYmVyLFxuICAgICAgbG9jYWxpdHk6IHN0cmluZyxcbiAgICB9ID0ge1xuICAgICAgbG5nOiAwLFxuICAgICAgbGF0OiAwLFxuICAgICAgbG9jYWxpdHk6ICcnXG4gICAgfVxuXG4gICAgaWYgKGJvZHkucGxhY2VJZCkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkubGl0ZWFwaS50cmF2ZWwvdjMuMC9kYXRhL3BsYWNlcy8ke2JvZHkucGxhY2VJZH1gLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ1gtQVBJLUtFWSc6IGJvZHkubGl0ZUFwaUFwaUtleVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdQbGFjZSBub3QgZm91bmQnXG4gICAgICAgIH0pLCB7XG4gICAgICAgICAgc3RhdHVzOiA0MDQsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2VEYXRhLmxuZyA9IGRhdGEudmlld3BvcnQ/LmhpZ2g/LmxvbmdpdHVkZVxuICAgICAgcmVzcG9uc2VEYXRhLmxhdCA9IGRhdGEudmlld3BvcnQ/LmhpZ2g/LmxhdGl0dWRlXG4gICAgICByZXNwb25zZURhdGEubG9jYWxpdHkgPSBkYXRhLmFkZHJlc3NDb21wb25lbnRzLmZpbmQoKGNvbXBvbmVudDogYW55KSA9PiBjb21wb25lbnQubG9jYWxpdHkgPT09ICdsb2NhbGl0eScpPy5sb25nVGV4dCB8fCAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBubyBwbGFjZSBJRCBpcyBwcm92aWRlZCwgdXNlIHRoZSB1c2VyJ3MgbG9jYXRpb25cbiAgICAgIHJlc3BvbnNlRGF0YS5sbmcgPSBjb250ZXh0Lmdlby5sb25naXR1ZGUgfHwgMFxuICAgICAgcmVzcG9uc2VEYXRhLmxhdCA9IGNvbnRleHQuZ2VvLmxhdGl0dWRlIHx8IDBcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZGF0YTogcmVzcG9uc2VEYXRhXG4gICAgfSksIHtcbiAgICAgIHN0YXR1czogMjAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgIG1lc3NhZ2U6ICdNZXRob2Qgbm90IGFsbG93ZWQnXG4gIH0pLCB7XG4gICAgc3RhdHVzOiA0MDUsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWc6IENvbmZpZyA9IHtcbiAgcGF0aDogXCIvYXBpL2dldC1wbGFjZVwiXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLE9BQWdDO0FBRWhDLElBQU8sb0JBQVEsT0FBTyxTQUFrQixZQUF3QztBQUM5RSxNQUFJLFFBQVEsV0FBVyxRQUFRO0FBQzdCLFVBQU0sT0FBTyxNQUFNLFFBQVEsS0FBSztBQUVoQyxVQUFNLGVBSUY7QUFBQSxNQUNGLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxJQUNaO0FBRUEsUUFBSSxLQUFLLFNBQVM7QUFDaEIsWUFBTSxXQUFXLE1BQU0sTUFBTSwrQ0FBK0MsS0FBSyxPQUFPLElBQUk7QUFBQSxRQUMxRixTQUFTO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixnQkFBZ0I7QUFBQSxVQUNoQixhQUFhLEtBQUs7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsQ0FBQztBQUNELFlBQU0sRUFBRSxLQUFLLElBQUksTUFBTSxTQUFTLEtBQUs7QUFFckMsVUFBSSxDQUFDLE1BQU07QUFDVCxlQUFPLElBQUksU0FBUyxLQUFLLFVBQVU7QUFBQSxVQUNqQyxTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsUUFDWCxDQUFDLEdBQUc7QUFBQSxVQUNGLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxZQUNQLGdCQUFnQjtBQUFBLFlBQ2hCLCtCQUErQjtBQUFBLFVBQ2pDO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLG1CQUFhLE1BQU0sS0FBSyxVQUFVLE1BQU07QUFDeEMsbUJBQWEsTUFBTSxLQUFLLFVBQVUsTUFBTTtBQUN4QyxtQkFBYSxXQUFXLEtBQUssa0JBQWtCLEtBQUssQ0FBQyxjQUFtQixVQUFVLGFBQWEsVUFBVSxHQUFHLFlBQVk7QUFBQSxJQUMxSCxPQUFPO0FBRUwsbUJBQWEsTUFBTSxRQUFRLElBQUksYUFBYTtBQUM1QyxtQkFBYSxNQUFNLFFBQVEsSUFBSSxZQUFZO0FBQUEsSUFDN0M7QUFFQSxXQUFPLElBQUksU0FBUyxLQUFLLFVBQVU7QUFBQSxNQUNqQyxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsSUFDUixDQUFDLEdBQUc7QUFBQSxNQUNGLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNQLGdCQUFnQjtBQUFBLFFBQ2hCLCtCQUErQjtBQUFBLE1BQ2pDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU8sSUFBSSxTQUFTLEtBQUssVUFBVTtBQUFBLElBQ2pDLFNBQVM7QUFBQSxFQUNYLENBQUMsR0FBRztBQUFBLElBQ0YsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsK0JBQStCO0FBQUEsSUFDakM7QUFBQSxFQUNGLENBQUM7QUFDSDtBQUVPLElBQU0sU0FBaUI7QUFBQSxFQUM1QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
