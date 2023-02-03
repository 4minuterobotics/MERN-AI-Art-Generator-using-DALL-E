import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";

//these prompts come from
const Card = ({ _id, name, prompt, photo }) => {
	return (
		<div className="rounded-xl gorup relative shadow-card hover:shadow-cardhover card">
			<img className="w-full h-auto object-cover rounded-xl" src={photo} alt={prompt} />
		</div>
	);
};

export default Card;
