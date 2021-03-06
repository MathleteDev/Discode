import { Master as Sharder } from "eris-sharder";
import { config } from "dotenv";
config();

// * Creating the main bot
const _ = new Sharder(process.env.BOT_TOKEN!, "/dist/main.js", {
	stats: true,
	name: "Discode",
	clientOptions: {
		messageLimit: 0
	}
});
