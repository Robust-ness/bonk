const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "spam",
    description: "spam go burr",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
		let amount = interaction.options.getInteger("i")
        if (amount > 20) {
            interaction.reply("no")
            return
        }
		let spamMessage = interaction.options.getString("phrase")
        interaction.reply({ephemeral: true, content: "ok"})
        for (let i = 0; i < amount; i++) {
            await interaction.channel.send(spamMessage)
        }
    },
    options: [
        {
			"name": "i",
			"description": "repeat amount",
			"type": 4,
			"required": true
		},
        {
            "name": "phrase",
            "description": "phrase to be repeated",
            "type": 3,
            "required": true
        }

    ]
}