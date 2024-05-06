// Dynamic load the Bing Maps Key and Script
// Get your own Bing Maps key at https://www.microsoft.com/maps
(async () => {
  let script = document.createElement("script");
  script.setAttribute(
    "src",
    "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=<your_api_key>"
  );
  document.body.appendChild(script);
})();
