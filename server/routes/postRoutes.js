import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

// all the access codes necessary to post to cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	cloud_key: process.env.CLOUDINARY_API_KEY,
	cloud_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS FROM CLOUDINARY
router.route("/").get(async (req, res) => {
	try {
		const posts = await Post.find({});

		res.status(200).json({ success: true, data: posts });
	} catch (error) {
		res.status(500).json({ success: false, message: error });
	}
});

//CREATE A POST ON CLOUDINARY USING DATA FROM THE FORM FROM FRONT END and store the link in the mongodb Database
router.route("/").post(async (req, res) => {
	try {
		const { name, prompt, photo } = req.body; //get the body of the form containing the photo, prompt, and name
		const photoUrl = await cloudinary.uploader.upload(photo); //upload the photo to cloudinary and create a link to it

		const newPost = await Post.create({
			//add the data from and the cloudinary link to mongo database
			name,
			prompt,
			photo: photoUrl.url,
		});

		res.status(201).json({ success: true, data: newPost });
	} catch (error) {
		res.status(500).json({ success: false, message: error });
	}
});
export default router;
