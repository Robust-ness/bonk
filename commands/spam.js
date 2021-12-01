const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
		.setName("spam")
		.setDescription("spam go burr")
		.addIntegerOption(i =>
			i
				.setName("i")
				.setDescription("spam amount")
				.setRequired(true)
		)
		.addStringOption(phrase =>
			phrase
				.setName("phrase")
				.setDescription("phrase to be spammed")
				.setRequired(true)
		),
	
    async execute(client, interaction) {
		let amount = interaction.options.getInteger("i")
		
        if (amount < 1 || amount > 20) {
			interaction.reply({
				ephemeral: true,
				content: "'i' must be within 1..20"
			})
        }
		else {
			interaction.reply({
				ephemeral: true,
				content: `Spamming phrase ${amount} times`
			})
			
			let spamMessage = interaction.options.getString("phrase")
			
			for (let i = 0; i < amount; i++) {
				await interaction.channel.send(spamMessage)
				await sleep(1000)
			}
		}
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}