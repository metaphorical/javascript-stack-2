# Real time dashboard demo

Stack:

* Koa.js
* socket.io
* Redux
* React.js
* PostCSS + CSS Modules
* Webpack

Emulating gathering and visualizing emitted vehicle statuses while traveling through Europe.

## Emulating real life travel statuses

For this I created routes using http://gpx.cgtk.co.uk/ and downloaded them in Garmin GPX format. This format is valid XML that can be easily transferred to JSON. You can se these routes in *external_resources* folder.

To emulate sending the data through **status-ping** event, I am attaching interval that cycles through routes and sends data about vehicles periodically.



