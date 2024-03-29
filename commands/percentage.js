const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("percentage")
        .setDescription("LOADING CUMMIES... 69%")
        .addStringOption(phrase =>
            phrase
                .setName("phrase")
                .setDescription("phrase")
                .setRequired(true)
        ),

    async execute(client, interaction) {
		let phrase = interaction.options.getString("phrase")
		
		if(phrase.includes("%"))
		{
			interaction.reply({ephemeral: true, content: "ok"})
		}
		else
		{
			interaction.reply({ephemeral: true, content: "missing %"})
			return
		}
		
        let percent = 0
		let min = 3
		let max = 8
		
		while(percent < 100)
		{
			if(percent + max > 100)
			{
				percent = 100
			}
			else
			{
				percent += getRandomIntInclusive(min, max)
			}
			
			let percentString = percent + "%"
			let text = phrase.replace(/%/g, percentString)
			await interaction.channel.send(text)
            await sleep(1000)
		}
		
		await interaction.channel.send("Done!")
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
