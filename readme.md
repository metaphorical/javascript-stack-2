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

## Receiving end

Client side listens to **status-ping**s and dispatches actions to Redux store for every 'tick'.

Redux reducer takes care of how it all builds up to be easily visually representable.

## Redux -> React

Render function that renders dashboard is subscribed to store change and is receiving store state on each change (each tick).

At this point there is no need for dispatching actions from react side, so I am just passing the data to be visualized.

## UI Modules

UI modules are 3 component "*boxes*" containing js logic, virtual dom and styles. Each module is self sufficient and should be looked at as a widget of sort.

Later I'll introduce a pattern to be able to easily manipulate structure and styles in a manner of configurable style/dom switching (for themes, ab tests etc)