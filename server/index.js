import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

//to be able to use the dotenv variables..
dotenv.config();

//initialize express application
const app = express();

//set up some middlewares
app.use(cors()); //this will allow us to make cross origin requests and allow our server to be called from the fornt end
app.use(express.json({ limit: "50mb" })); //this will allow us to pass json from the front end to the back end with a limit of 50 mb

///the response from '/' get requests
app.get("/", async (req, res) => {
	res.send("Hello from DALL-E");
});

//connect to Mongodb, then listen on port 8080 for qny requests
const startServer = async () => {
	//since the database retreiving can fail, this action should be put in a try catch block
	try {
		//this will be a special url of our mongodb atlas database
		connectDB(process.env.MONGODB_URL);

		//this will set pot 8080 as the server to be listening for requests on
		app.listen(8080, () => console.log("Server has started on port http://localhost:8080"));
	} catch (error) {
		//if it doesn't work, log the error
		console.log(error);
	}
};

//make sure that the server always listens for requests
startServer();
