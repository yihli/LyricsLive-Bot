// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
	if (!newPresence) return;

	// console.log(newPresence.user);
	const spotifyActivity = newPresence.activities.find((a) => a.type === ActivityType.Listening && a.name === 'Spotify');

	if (spotifyActivity) {
		console.log(spotifyActivity);
		console.log(`${newPresence.user.username} is listening to "${spotifyActivity.details}" by ${spotifyActivity.state}`);
	}
});

// Log in to Discord with your client's token
client.login(token);