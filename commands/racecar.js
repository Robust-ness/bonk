const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "racecar",
    description: "racecar go burr",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
		let amount = interaction.options.getInteger("i")
		let spam = interaction.options.getInteger("j")
		let send = ""
		
        for (let i = 0; i < amount; i++) {
            send += ":race_car:"
        }
		
		for (let i = 0; i < amount; i++) {
            send += ":loud_sound:"
        }
		
		for (let i = 0; i < spam; i++) {
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