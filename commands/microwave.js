const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("microwave")
		.setDescription("MMMMMMMMMMMMMMMM"),

    async execute(client, interaction) {
        let mmm = ""
        for (let i = 0; i < getRandomIntInclusive(700, 2000); i++) {
            mmm += "M"
        }
        
        interaction.reply({
            ephemeral: true,
            content: "microwave go burr"
        })

        await interaction.channel.send("MICROWAVE")
        await sleep(1000)
        await interaction.channel.send("GO")
        await sleep(1000)
        await interaction.channel.send(mmm)
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}