const Discord = require('discord.js');

module.exports = {
	name: 'rps',
	aliases: ['rockpaperscissors'],
	description: 'Rock, paper, scissors, shoot!',
	category: 'fun',
	usage: '[choice]',
	args: true,
	execute(message, args) {
		const choice = args.join(' ');
		const possibleAnswers = ['Rock', 'Paper', 'Scissors'];
		const answer = Math.floor((Math.random() * possibleAnswers.length));

		if (choice === 'rock' || choice === 'Rock') {

			const embed = new Discord.MessageEmbed()
				.setThumbnail(message.author.avatarURL())
				.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

			if (possibleAnswers[answer] === 'Rock') {
				embed.setColor('#ffff00');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`We both chose **${possibleAnswers[answer]}**, **it's a tie!**`);
			} else if (possibleAnswers[answer] === 'Paper') {
				embed.setColor('#ff0000');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`You chose **${choice},** and I chose **${possibleAnswers[answer]}. I win!**`);
			} else {
				embed.setColor('#39ff14');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`You chose **${choice},** and I chose **${possibleAnswers[answer]}. You win!**`);
			}

			message.channel.send(embed);

		} else if (choice === 'paper' || choice === 'Paper') {
			const embed = new Discord.MessageEmbed()
				.setThumbnail(message.author.avatarURL())
				.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

			if (possibleAnswers[answer] === 'Rock') {
				embed.setColor('#39ff14');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`You chose **${choice},** and I chose **${possibleAnswers[answer]}, You win!**`);
			} else if (possibleAnswers[answer] === 'Paper') {
				embed.setColor('#ffff00');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`We both chose **${possibleAnswers[answer]}, it's a tie!**`);
			} else {
				embed.setColor('#ff0000');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`You chose **${choice},** and I chose **${possibleAnswers[answer]}. I win!**`);
			}

			message.channel.send(embed);

		} else if (choice === 'scissors' || choice === 'Scissors') {
			const embed = new Discord.MessageEmbed()
				.setThumbnail(message.author.avatarURL())
				.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

			if (possibleAnswers[answer] === 'Rock') {
				embed.setColor('#ff0000');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`You chose **${choice},** and I chose **${possibleAnswers[answer]}. I win!**`);
			} else if (possibleAnswers[answer] === 'Paper') {
				embed.setColor('#39ff14');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`You chose **${choice},** and I chose **${possibleAnswers[answer]}, You win!**`);
			} else {
				embed.setColor('#ffff00');
				embed.setTitle(`${possibleAnswers[answer]}!`);
				embed.setDescription(`We both chose **${possibleAnswers[answer]}, it's a tie!**`);
			}

			message.channel.send(embed);
		} else {
			return message.channel.send('PICK A CHOICE YOU DUMBASS (rock, paper, scissors)');
		}
	}
};
