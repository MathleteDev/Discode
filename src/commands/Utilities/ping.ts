import { Message, TextChannel } from "eris";
import Command from "../command";
import { MessageArgs } from "../../misc/args";
import { stripIndents } from "common-tags";

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
		// Create this message so we can later compare
		let ping: Message<TextChannel> = await message.channel.createMessage(
			"🏓 Ping?"
		);
		// Send a message back with all the latency info
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
