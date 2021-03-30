const economy = require('../economy');

module.exports = {
	name: 'addcoins',
	aliases: ['addbal'],
	usage: '<user> <amount>',
	category: 'economy',
	description: '**[DEV ONLY]** Adds coins into the specified user.',
	args: true,
	async execute(message, args) {
		const target = message.mentions.users.first();
		if (!target) return message.lineReply('❌ mention someone');

		const coins = args[1];
		if (isNaN(coins)) {
			message.lineReply('❌ invalid amount');
		}

		const guildId = message.guild.id;
		const userId = target.id;

		const newCoins = await economy.addCoins(guildId, userId, coins);

		message.lineReply(`✅ Gave <@${userId}> **${coins} FartCoins**.\nThey now have **${newCoins} FartCoins**.`);
	}
};