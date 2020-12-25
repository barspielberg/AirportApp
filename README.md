# Airport App 🛫

A e2e project that handles incoming/outgoing flights from control towers.

![display](https://github.com/barspielberg/AirportApp/blob/master/Images/display.gif)

Includes:
  - 👓 Rest API that handles all the logic (in [Asp.Net core](https://github.com/dotnet/aspnetcore)).
  - 🎚 Simulator that generate new flights and send them to the API (in [WPF core](https://github.com/dotnet/wpf)).
  - 🖥 Web app for displaying the movement of the planes and for edit and build new airports (in [React](https://github.com/facebook/react)). 
---
## Requirements
  - [.Net 3.1](https://github.com/dotnet/core/tree/master/release-notes/3.1)
  - [Node.js](https://github.com/nodejs/node)
  
---
## Running the project
Clone this repository
  ### Backend
  1. Build the solution using [Visual Studio](https://visualstudio.microsoft.com/downloads/).
  2. Run both `AirportAppWebServer` and `AirportAppFlightGenerator`. 
  ### Frontend
  
  In `/UI/` folder run:
  ```
  npm i
  npm start
  ```
