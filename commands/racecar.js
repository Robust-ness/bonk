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
            await interaction.channel.send(send)
            await sleep(2000)
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

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}