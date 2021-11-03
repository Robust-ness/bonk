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
		let spamMessage = interaction.options.getString("phrase")
		
        for (let i = 0; i < amount; i++) {
            interaction.channel.send(spamMessage)
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