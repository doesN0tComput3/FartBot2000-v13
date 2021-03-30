const economy = require('../economy');

module.exports = {
	name: 'balance',
	aliases: ['bal'],
	usage: '[user]',
	category: 'economy',
	description: 'Shows your bank balance',
	args: true,
	async execute(message, args) {
		const target = message.mentions.users.first() || message.author;
		const targetId = target.id;

		const guildId = message.guild.id;
		const userId = target.id;

		const coins = await economy.getCoins(guildId, userId);

		message.lineReply(`${target} has **${coins} FartCoins**.`);
	}
};