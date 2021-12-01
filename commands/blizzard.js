const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("blizzard")
		.setDescription("AMY KLOBUCHAR GO BURRR")
		.addIntegerOption(i =>
			i
				.setName("i")
				.setDescription("climate change")
		),
	
    async execute(client, interaction) {
		let amount = interaction.options.getInteger("i")
		
		if(amount == undefined)
			amount = 1
		
        if (amount < 0 || amount > 10) {
			interaction.reply({
				ephemeral: true,
				content: "'i' must be within 0..10"
			})
        }
		else {
			interaction.reply({
				ephemeral: true,
				content: "Let it snow"
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
		}
    }
}