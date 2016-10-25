# Real time dashboard demo with KOA, Socket.io, Redux, React...
### [ work in progress... ]

Stack:

* Koa.js
* socket.io
* Redux
* React.js
* D3.js
* PostCSS + CSS Modules
* Webpack

Emulating gathering and visualizing emitted vehicle statuses while traveling through Europe.

##Install and run

```
npm install

./node_modules/.bin/webpack

node server
```

## Emulating real life travel statuses

For this I created routes using http://gpx.cgtk.co.uk/ and downloaded them in Garmin GPX format. This format is valid XML that can be easily transferred to JSON. You can se these routes in *external_resources* folder.

To emulate sending the data through **status-ping** event, I am attaching interval that cycles through routes and sends data about vehicles periodically.

**IMPORTANT:** You will be able to adjust the frequency of pings (speed of vehicles) **by adjusting simulation ping interval in sockets.js in ./server folder**.

Also, important mention is that current simulation will cause some weird lines on the map because vehicle paths that are simulated from real GPS routes are cycled through by just returning to the starting point, not by creating reverse path (which is the plan to do at some point).

## Receiving end

Client side listens to **status-ping**s and dispatches actions to Redux store for every 'tick'.

Redux reducer takes care of how it all builds up to be easily visually representable.

## Redux -> React

Render function that renders dashboard is subscribed to store change and is receiving store state on each change (each tick).

At this point there is no need for dispatching actions from react side, so I am just passing the data to be visualized.

## UI Modules

UI modules are 3 component "*boxes*" containing js logic, virtual dom and styles. Each module is self sufficient and should be looked at as a widget of sort.

Later I'll introduce a pattern to be able to easily manipulate structure and styles in a manner of configurable style/dom switching (for themes, ab tests etc)

## D3 and react

Data received throught the sockets in real time is represented in two components, one that just represents the couners of the activity, or the status pings from two companies vehicles (one has 3 other has 4).

One on the left is map that has two modes - first mode shows us the current location of a vehicle, and the second shows vehicle path.

Plan is to improve mode on the left by adding css classes for each position marker and each path, so we can programatically inject different colors to make distinctions.