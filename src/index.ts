import { Master as Sharder } from "eris-sharder";
import { config } from "dotenv";
// Use dotenv.config() to get process.env
config();

// Creating the main bot
const _ = new Sharder(process.env.BOT_TOKEN!, "/dist/main.js", {
	stats: true,
	name: "Discode",
	clientOptions: {
		messageLimit: 0
	}
});
