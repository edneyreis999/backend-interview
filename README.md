# CCG (Collectible Card Game)
Project structure for a simple Node.js + HapiJs + PostgreSQL + TypeScript app

If you are using Visual Studio Code, press `Ctrl+Shift+B` to build the project. You will see compiler output in the output window (`Ctrl+Shift+U`).

The compiler will compile files automatically when saved.

To stop the compilation, press `Ctrl+Shift+P` → `> Tasks: Terminate Running Task`.

To run the project install nodejs and npm.

`npm install` on project root

`npm start` on project root to run application.

`src/index.ts` ← code goes here  

in folder `requests` has some exemples how to add objects in databse

in folder `js` has the transpiled .ts code

To install mongodb, acess `https://www.mongodb.com/download-center?ct=atlasheader#atlas` choose community server, your SO and install.

Installation Instructions => `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/`

`src/index.ts` starts de application, put together database and server settings.
`src/server.ts` Create all routes and start the server.
`src/database.ts` Create database settings and starts the Models
`src/configurations` Contains some consts to help setup database and server.
`src/card`,`src/champion`,`src/decks`, `src/collection` Setup routes for each object.
`*-rules.ts` Contains the game rules logic.
`*-controller.ts` Handler the routes logic.  

by default the server will starts at port 5000

http://localhost:5000/api/card => CRUD for object Card
http://localhost:5000/api/champion => CRUD for object Champion
http://localhost:5000/api/decks => CRUD for object Deck
http://localhost:5000/api/collection => There is only GET routes and needs to pass {userId} in all routes.

