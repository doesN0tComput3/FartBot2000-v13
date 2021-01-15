const fs = require('fs');
const statuses = require('../statuses.json');
const config = require('../config.json');

module.exports = {
	name: 'status',
	description: 'Adds a new status for the bot',
	category: 'fun',
	args: true,
	execute(message, args) {
		if (config.developing === true) return message.channel.send('Orion is fixing me rn so I can\'t add any new statuses, sorry!');
		// Define status type and status to insert
		const statusType = args[0];
		const status = args.slice(1).join(' ');

		// Basically checks if the entry already exists (returns if true),
		// Inserts the status into the array then writes the file,
		// And sends a confirmation message
		// Playing statuses
		if (statusType === 'playing' || statusType === 'Playing') {
			if (statuses.playingStatus.includes(status)) return message.channel.send(`nice try, **${status}** is already in the **${statusType}** statuses 😉`);

			statuses.playingStatus.push(status);

			fs.writeFile('./statuses.json', JSON.stringify(statuses), (err) => {
				if (err) console.log(err);
			});

			message.channel.send(`✅ i added **${status}** into the **${statusType}** statuses, so it should be there!\n\n**NOTE: Your status might not show up right away, since they appear at random!**`);
		// Listening statuses
		} else if (statusType === 'listening' || statusType === 'Listening') {
			if (statuses.listeningStatus.includes(status)) return message.channel.send(`nice try, **${status}** is already in the **${statusType}** statuses 😉`);

			statuses.listeningStatus.push(status);

			fs.writeFile('./statuses.json', JSON.stringify(statuses), (err) => {
				if (err) console.log(err);
			});

			message.channel.send(`✅ i added **${status}** into the **${statusType}** statuses, so it should be there!\n\n**NOTE: Your status might not show up right away, since they appear at random!**`);
		// Watching statuses
		} else if (statusType === 'watching' || statusType === 'Watching') {
			if (statuses.watchingStatus.includes(status)) return message.channel.send(`nice try, **${status}** is already in the **${statusType}** statuses 😉`);

			statuses.watchingStatus.push(status);

			fs.writeFile('./statuses.json', JSON.stringify(statuses), (err) => {
				if (err) console.log(err);
			});

			message.channel.send(`✅ i added **${status}** into the **${statusType}** statuses, so it should be there!\n\n**NOTE: Your status might not show up right away, since they appear at random!**`);
		// Returns if its not a valid status type
		} else {
			return message.channel.send(`${statusType} isn't a status type IDIOT\n\nvalid types are: ` + '`playing`, `listening`, and `watching`');
		}
	}
};
