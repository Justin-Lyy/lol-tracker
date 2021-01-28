# lol-tracker
Front-end to be used with the lol tracker server. 

Built using ReactJS

### Installation

#### Local Installation with Heroku
1. Clone the dist directory 
2. Open index.html in your browser

#### Run the server on Localhost with a Local Installation
1. Clone the repository
2. Run `npm install`
3. Follow the instructions for setting up the server [yourself](https://github.com/Justin-Lyy/lol-tracker-server "lol Tracker server")
4. Change the fetch routes to use localhost:8888 (or the port you are running the server on) 
5. Run `npm start` to run a webpack server with the code
4. Optionally, run `npm run build` then open dist/index.html in a browser

### Use deployed Heroku version
Optionally, you can use the deployed version on [Heroku](https://lol-stat-tracker-project.herokuapp.com/ "LOL Tracker")
Note that both the bundled files in the dist directory and the source files require the deployed version to be active. However since I do not possess a key for production the deployed version on Heroku will may be offline. 

### Patch Support

The latest patch supported by LOL Tracker is patch 11.2
