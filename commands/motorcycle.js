const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "motorcycle",
    description: "motorcycle go burr",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
		let amount = interaction.options.getInteger("i")
		let spam = interaction.options.getInteger("j")
		let send = ""
		
        for (let i = 0; i < amount; i++) {
            send += ":motorcycle:"
        }
		
		for (let i = 0; i < amount; i++) {
            send += ":loud_sound:"
        }
		
		for (let i = 0; i < amount; i++) {
            interaction.channel.send(send)
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
			"name": "j",
			"description": "spam amount",
			"type": 4,
			"required": true
		}
    ]
}