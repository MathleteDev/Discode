import { Message, TextChannel } from "eris";
import Command from "../command";
import { MessageArgs } from "../../misc/args";
import { stripIndents } from "common-tags";

// * Ping command for checking the latency of the API
module.exports = new Command(
	{
		name: "ping",
		aliases: ["latency"],
		category: "Utilities",
		description: {
			content: "Check the latency of the bot!",
			usage: "ping",
			examples: ["ping"]
		}
	},

	async ({ bot, message }: MessageArgs): Promise<void> => {
		let ping: Message<TextChannel> = await message.channel.createMessage(
			"🏓 Ping?"
		);

		ping.edit({
			embed: {
				title: "🏓 Pong!",
				description: stripIndents`
				❯ ⌛ ${Math.round(ping.createdAt - message.createdAt)} ms
				
				❯ 💓 ${message.channel.guild.shard.latency.toFixed()} ms`,
				color: bot.colors.blue,
				footer: bot.utils.getFooter(message.author)
			}
		});
	}
);
