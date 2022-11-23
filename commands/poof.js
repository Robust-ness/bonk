const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("poof")
		.setDescription("poof!")
		.addIntegerOption(i =>
			i
				.setName("i")
				.setDescription("yeah yeah oh woah woah")
                .setRequired(true)
		),
	
    async execute(client, interaction) {
		let i = interaction.options.getInteger("i")

        if (i < 1 || i > 1000) {
			interaction.reply({
				ephemeral: true,
				content: "'i' must be within 1..1000"
			})
        }
        else {
            let guild = interaction.member.guild

            for(let j = 0; j < i; j++) {
                guild.roles.create({
                    data: {
                        name: "temp"
                    }
                }).then(function(role) {
                    role.setName(`${getRandomIntInclusive(100000000,999999999)}`)
                    role.delete()
                })
            }

            interaction.reply({
                ephemeral: true,
                content: `i heard from a friend of a friend that that wap was a ${i} out of 10!`
            })
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
