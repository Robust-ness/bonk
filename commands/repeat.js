const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
		.setName("repeat")
		.setDescription("repeat go burr")
		.addIntegerOption(i =>
			i
				.setName("i")
				.setDescription("repeat amount")
				.setRequired(true)
		)
		.addStringOption(phrase =>
			phrase
				.setName("phrase")
				.setDescription("phrase to be repeated")
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
			let send = ""
			let spamMessage = interaction.options.getString("phrase")

			for(let i = 0; i < amount; i++) {
				send += spamMessage + " "
			}
			
			if(send.length > 2000) {
				interaction.reply({
					ephemeral: true,
					content: `Fuck off`
				})
			}
			else {
				interaction.reply({
					ephemeral: true,
					content: `Repeating phrase ${amount} times`
				})

				await interaction.channel.send(send)
			}
		}
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}