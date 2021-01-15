const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'thesun',
	description: 'The sun goes down the stars come out and all that count is here and now my universe will never be the same I\'m glad you came',
	category: 'voice',
	execute(message) {
		// Define vc
		const vc = message.member.voice.channel;

		if (vc) {
			// Join vc
			const connection = vc.join()
				.then(connection => {
					// Self deafen so we don't recieve audio
					connection.voice.setDeaf(true);
					// Get our video
					const stream = ytdl('https://www.youtube.com/watch?v=aB9EYZWjCTQ', { filter: 'audioonly' });
					// Play
					const dispatcher = connection.play(stream);
					// Leave once it's over
					dispatcher.on('finish', () => {
						vc.leave();
					});
				})
				.catch();
		} else {
			// They aren't in vc so I'm not wasting my time
			return message.channel.send(`${message.author} you're not in vc i can't`);
		}


	}
};
