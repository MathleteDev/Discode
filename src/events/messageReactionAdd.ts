import { Emoji, Message, TextChannel, User } from "eris";

// * Fired when a reaction is added to a message
exports.handler = async function (
	message: Message<TextChannel>,
	emoji: Emoji,
	user: string
): Promise<void> {
	// Logs it to the bot's reaction handler
	if (!message.guildID) return;
	this.reactionHandler.collect(message, user, emoji);
};
