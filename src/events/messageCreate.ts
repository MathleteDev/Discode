import { Message, TextChannel } from "eris";
import Command from "../commands/command";
import { config } from "dotenv";
config();

exports.handler = async function (
	message: Message<TextChannel>
): Promise<void> {
	// If the message is coming from a bot or isn't from a server then return
	if (message.author.bot || !message.guildID) return;

	// Gets the command arguments with split(" ")
	let args: string[] = message.content
		.slice(process.env.BOT_PREFIX!.length)
		.toLowerCase()
		.split(" ")
		.map((item: string) => item.trim());

	// The first element will be the command name
	const commandName: string = args.shift()!;
	// Finds the command from bot.cmds
	const command: Command = this.cmds.find(
		(cmd: Command) =>
			cmd.props.name === commandName ||
			(cmd.props.aliases && cmd.props.aliases.includes(commandName))
	);

	if (!command) return;

	let res: any = await command.exec({
		bot: this,
		message,
		args
	});
	if (!res) return;

	if (res instanceof Object) {
		res = {
			content: res.content,
			file: res.file,
			embed: res.embed ? res.embed : res
		};

		// To make things simpler, automatically assign colors and footers
		if (!res.embed.color) {
			res.embed.color = this.embedColors[
				this.utils.getEmbedColor(command.props.category)
			];
		}

		if (!res.embed.footer || !res.embed.footer.text) {
			res.embed.footer = this.utils.getFooter(message.author);
		} else {
			res.embed.footer = this.utils.getFooter(
				message.author,
				res.embed.footer.text
			);
		}
	}

	message.channel.createMessage(res, res.file);
};
