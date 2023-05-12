# Soundwave

Soundwave is a WIP game where players use their hand as the controller. It's built on top of [Three. js](https://threejs.org/) and [Mediapipe](https://developers.google.com/mediapipe). It integrates with a glove build with microcontrollers and haptics that vibrate when a player collides. 

### Features
- Increment Score when you collide with a box
- Decrement when you miss a box

### Issues
Currently, several issues are encountered once the project is built and hosted on vercel so you have to run it locally.

Mediapipe's vision task isn't able to run in a web worker so currently there are issues with performance.

## Running the project
The server directory is considered with interfacing with the hardware via [socket.io](https://socket.io/), the bulk of the logic is in the client so once you clone the project navigate into that directory.

The client uses [Vite](https://vitejs.dev/) as a module bundler, the default package manager is [pnpm](https://pnpm.io/). However, you can use whatever package manager you like by deleting `pnpm-lock.yaml` and running `npm install` or `yarn install`.

Once you have `node_modules` run `pnpm run dev`. 


### Code

The bulk of the logic is in the `GameManager` class, this is meant to call the methods from the other classes and passes data from one to the other. 

To prevent race conditions and cyclic dependencies, Managers should not directly communicate with one another but rather through this `GameManager` class. 

![Code Architecture](https://user-images.githubusercontent.com/90055250/238009099-190a099e-78e4-424d-958f-2652ca729bf1.png)
