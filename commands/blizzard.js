const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "blizzard",
    description: "AMY KLOBUCHAR GO BURRR",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
		let amount = interaction.options.getInteger("i")
		
		if(amount == undefined || amount < 1)
		{
			amount = 1
		}
		
		if(amount > 15)
		{
			amount = 15
		}
		
		interaction.reply({
            content: "ok",
            ephemeral: true
        })
		
		let snow = ":snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake: :cloud_snow: :snowflake:"
		let hair = ":bangbang: :bangbang: :bangbang: AND I'D LIKE TO SEE HOW YOUR HAIR WOULD FARE IN A BLIZZARD :bangbang: :bangbang: :bangbang:"
		let umbrella = ":umbrella: :umbrella: :umbrella: Mr. Umbrella man :umbrella: :umbrella: :umbrella:"
		
        for (let i = 0; i < amount; i++)
		{
			interaction.channel.send(snow)
			interaction.channel.send(hair)
			interaction.channel.send(snow)
			interaction.channel.send(umbrella)
        }
		
		interaction.channel.send(snow)
    },
    options: [
		{
			"name": "i",
			"description": "repeat amount",
			"type": 4,
			"required": false
		}
    ]
}