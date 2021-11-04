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
        if (":race_car::loud_sound:".length * amount > 2000 || spam > 20) {
            interaction.reply("no")
            return
        }
		let send = ""
		
        for (let i = 0; i < amount; i++) {
            send += ":race_car:"
        }
		
		for (let i = 0; i < amount; i++) {
            send += ":loud_sound:"
        }
        interaction.reply({
            content: "ok",
            ephemeral: true
        })
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