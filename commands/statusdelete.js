const fs = require('fs');
const statuses = require('../statuses.json');
const config = require('../config.json');

module.exports = {
	name: 'statusdelete',
	description: 'Deletes a status from the bot',
	category: 'mod',
	guildOnly: true,
	args: true,
	execute(message, args) {
		// Return if author isn't a mod/server owner
		if (!message.member.id === '697506619545747569') return message.channel.send(`❌ ${message.author} you not kitten/broey so no`);
		if (!message.member.roles.cache.some(r => r.id === '773966213171642379')) return message.channel.send(`❌ ${message.author} you not kitten/broey so no`);

		// Get status and statusType
		const statusType = args[0];
		const status = args.slice(1).join(' ');

		// Check if status exists
		// Removes status from array
		// Writes changes to file
		// Playing status
		if (statusType === 'playing' || statusType === 'Playing') {
			if (!statuses.playingStatus.includes(status)) return message.channel.send(`❌ **${status}** doesn't exist 😐`);

			const statusIndex = statuses.playingStatus.indexOf(status);

			if (statusIndex > -1) {
				statuses.playingStatus.splice(statusIndex, 1);
			}

			fs.writeFile('./statuses.json', JSON.stringify(statuses), (err) => {
				if (err) console.log(err);
			});

			message.channel.send(`✅ Successfully removed **${status}** from the **${statusType}** statuses!`);
		// Listening statuses
		} else if (statusType === 'listening' || statusType === 'Listening') {
			if (!statuses.listeningStatus.includes(status)) return message.channel.send(`❌ **${status}** doesn't exist 😐`);

			const statusIndex = statuses.listeningStatus.indexOf(status);

			if (statusIndex > -1) {
				statuses.listeningStatus.splice(statusIndex, 1);
			}

			fs.writeFile('./statuses.json', JSON.stringify(statuses), (err) => {
				if (err) console.log(err);
			});

			message.channel.send(`✅ Successfully removed **${status}** from the **${statusType}** statuses!`);
		// Watching statuses
		} else if (statusType === 'watching' || statusType === 'Watching') {
			if (!statuses.watchingStatus.includes(status)) return message.channel.send(`❌ **${status}** doesn't exist 😐`);

			const statusIndex = statuses.watchingStatus.indexOf(status);

			if (statusIndex > -1) {
				statuses.watchingStatus.splice(statusIndex, 1);
			}

			fs.writeFile('./statuses.json', JSON.stringify(statuses), (err) => {
				if (err) console.log(err);
			});

			message.channel.send(`✅ Successfully removed **${status}** from the **${statusType}** statuses!`);
		// Returns if its not a valid status type
		} else {
			return message.channel.send(`❌ ${statusType} isn't a status type IDIOT\n\nvalid types are: ` + '`playing`, `listening`, and `watching`');
		}
	}
};
