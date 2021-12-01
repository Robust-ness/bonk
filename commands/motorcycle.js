const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("motorcycle")
        .setDescription("motorcycle go burr")
        .addIntegerOption(i =>
            i
                .setName("i")
                .setDescription("repeat amount")
        )
        .addIntegerOption(j =>
            j
                .setName("j")
                .setDescription("spam amount")  
        ),

    async execute(client, interaction) {
		let repeat = interaction.options.getInteger("i")
        let spam = interaction.options.getInteger("j")

        if(repeat == undefined) {
            repeat = 3
        }

        if(repeat < 1 || repeat > 10) {
			interaction.reply({
				ephemeral: true,
				content: "'i' must be within 1..10"
			})

            return
        }

        if(spam == undefined) {
            spam = 1
        }

        if(repeat < 1 || repeat > 10) {
			interaction.reply({
				ephemeral: true,
				content: "'i' must be within 1..10"
			})

            return
        }

		let msg = ""
		
        for (let i = 0; i < repeat; i++) {
            msg += ":motorcycle:"
        }
		
		for (let i = 0; i < repeat; i++) {
            msg += ":loud_sound:"
        }

        interaction.reply({
            content: "motorcycle go burr",
            ephemeral: true
        })

        for(let i = 0; i < spam; i++) {
            await interaction.channel.send(msg)
            await sleep(1000)
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}