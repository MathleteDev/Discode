import {
	AdvancedMessageContent,
	EmbedFooterOptions,
	Message,
	User
} from "eris";
import Bot from "../main";

export default class Utils {
	// So we can use all bot utils
	private bot: Bot;

	public constructor(bot: Bot) {
		this.bot = bot;
	}

	// Capitalizes a string by splitting it
	public capitalize = (str: string): string =>
		str
			.split(" ")
			.map((word: string) => word[0].toUpperCase() + word.slice(1))
			.join(" ");

	// Same as capitalize(), but also converts remaining chars to lowercase
	public strictCapitalize = (str: string): string =>
		str
			.split(" ")
			.map(
				(word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase()
			)
			.join(" ");

	// Splits the string by capital (A-Z) letters
	public parseCamelCase = (str: string): string =>
		(str[0].toUpperCase() + str.slice(1)).split(/(?=[A-Z])/).join(" ");

	// Converts a list to a human-readable format
	public joinParts(arr: string[]): string {
		const last: string = arr.pop()!;
		if (!arr.length) return last;
		if (arr.length === 1) return `${arr[0]} and ${last}`;
		return `${arr.join(", ")}, and ${last}`;
	}

	// Selects a random element from an array
	public pickRandom = <T>(arr: T[]): T =>
		arr[Math.floor(Math.random() * arr.length)];

	// Shuffles an array by replacing items
	public shuffle<T>(arr: T[]): T[] {
		let tmpArr: T[] = arr;

		for (let i: number = tmpArr.length - 1; i > 0; i--) {
			const j: number = Math.floor(Math.random() * (i + 1));
			[tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
		}

		return tmpArr;
	}

	// Returns a footer based off the author of a message (includes avatar and username)
	public getFooter(user: User, text: string = ""): EmbedFooterOptions {
		return {
			text: `${user.username}${text === "" ? "" : ` | ${text}`}`,
			icon_url: user.dynamicAvatarURL("png")
		};
	}

	// Used to report errors
	public error(description: string, message: Message): AdvancedMessageContent {
		return {
			embed: {
				title: "⚠️ Error!",
				description,
				color: this.bot.colors.red,
				footer: this.getFooter(message.author)
			}
		};
	}

	// Get a suitable embed color for a specific category
	public getEmbedColor(category: string): string {
		switch (category) {
			default:
				return "red";
			case "Data":
				return "purple";
			case "Procrastination":
				return "orange";
			case "Study":
				return "green";
			case "Utilities":
				return "blue";
		}
	}
}
