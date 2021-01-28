const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'whorehouse',
	aliases: ['fuyuhiko'],
	description: 'requested by kamjam',
	category: 'voice',
	guildOnly: true,
	execute(message) {
		// Define vc
		const vc = message.member.voice.channel;

		if (vc) {
			// Join vc
			const connection = vc.join()
				.then(connection => {
					// Self deafen so we don't recieve audio
					connection.voice.setDeaf(true);
					// Play
					const dispatcher = connection.play(fs.createReadStream('./audio/whorehouse.mp3'));
					// Leave once it's over
					dispatcher.on('finish', () => {
						vc.leave();
					});
					dispatcher.on('error', console.error);
				})
				.catch();
		} else {
			// They aren't in vc so I'm not wasting my time
			return message.channel.send(`❌ ${message.author} you're not in vc i can't`);
		}


	}
};
