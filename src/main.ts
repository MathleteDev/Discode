import { Base } from "eris-sharder";
import { Client } from "eris";
import { readdirSync } from "fs";
import { join } from "path";
import Command from "./commands/command";
import Utils from "./misc/utils";

// ! FIXED: ./node_modules/eris-sharder/src/sharding/cluster.js:261
// ! "Your code has not been loaded! This is due to it not extending the Base class. Please extend the Base class!"
// ! Added line: if (app.default !== undefined) app = app.default;
export default class Bot extends Base {
	// Stores all the commands so we can later retrieve them
	public cmds: Command[] = [];
	// Embed colors for reference
	public colors: Record<string, number> = {
		blue: 0x0066ff,
		red: 0xff0000
	};
	// Often used utilities
	public utils: Utils = new Utils(this);

	public constructor(client: { bot: Client; clusterID: number }) {
		super(client);
	}

	// Called when bot goes online!
	public launch(): void {
		this.loadEvents();
		this.loadCommands();
		this.RefreshStatus();
	}

	// Updates the bot status with editStatus()
	public RefreshStatus(): void {
		this.bot.editStatus("dnd", {
			name: `;help !`,
			type: 0
		});
	}

	// Uses FS to load all the events from the events folder
	private loadEvents(): void {
		readdirSync(join(__dirname, "events")).forEach((file: string) => {
			const pull: any = require(`./events/${file}`);

			this.bot.on(file.slice(0, file.length - 3), pull.handler.bind(this));
		});
	}

	// Same as loadEvents(), loads all commands from the commands folder
	private loadCommands(): void {
		readdirSync(join(__dirname, "commands"))
			// Exclude the command base file and other utils
			.filter((folder: string) => !folder.endsWith(".js"))
			.forEach((folder: string) => {
				readdirSync(join(__dirname, "commands", folder))
					.filter((file: string) => file.endsWith(".js"))
					.forEach((file: string) => {
						const pull: Command = require(`./commands/${folder}/${file}`);

						this.cmds.push(pull);
					});
			});
	}
}
