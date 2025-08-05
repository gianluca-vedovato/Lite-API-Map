
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/get-mapbox-access-token.mts
import "@netlify/functions";
var get_mapbox_access_token_default = async () => {
  return new Response(JSON.stringify({
    accessToken: process.env.MAPBOX_ACCESS_TOKEN
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};
var config = {
  path: "/api/get-mapbox-access-token"
};
export {
  config,
  get_mapbox_access_token_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvZ2V0LW1hcGJveC1hY2Nlc3MtdG9rZW4ubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBDb25maWcsIENvbnRleHQgfSBmcm9tIFwiQG5ldGxpZnkvZnVuY3Rpb25zXCJcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCk6IFByb21pc2U8UmVzcG9uc2U+ID0+IHtcbiAgLy8gVE9ETzogSW1wcm92ZSBzZWN1cml0eSBieSBjaGVja2luZyB0aGUgb3JpZ2luIG9mIHRoZSByZXF1ZXN0XG4gIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgIGFjY2Vzc1Rva2VuOiBwcm9jZXNzLmVudi5NQVBCT1hfQUNDRVNTX1RPS0VOXG4gIH0pLCB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWc6IENvbmZpZyA9IHtcbiAgcGF0aDogXCIvYXBpL2dldC1tYXBib3gtYWNjZXNzLXRva2VuXCJcbn07Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLE9BQWdDO0FBRWhDLElBQU8sa0NBQVEsWUFBK0I7QUFFNUMsU0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVO0FBQUEsSUFDakMsYUFBYSxRQUFRLElBQUk7QUFBQSxFQUMzQixDQUFDLEdBQUc7QUFBQSxJQUNGLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLCtCQUErQjtBQUFBLElBQ2pDO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFFTyxJQUFNLFNBQWlCO0FBQUEsRUFDNUIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
