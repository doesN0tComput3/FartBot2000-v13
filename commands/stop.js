const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'stop',
	description: 'Leaves the vc',
	aliases: ['die', 'leave'],
	category: 'voice',
	execute(message) {
		const vc = message.member.voice.channel;

		if (vc) {
			// Join vc
			const connection = vc.leave();
		} else {return;}
	}
};
