const fs = require('fs')
const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("josephmaher")
        .setDescription("MMMMMMMM😩"),

    async execute(client, interaction) {
	    interaction.reply({
				ephemeral: true,
				content: "Fuck you"
			})
        let rand = getRandomIntInclusive(4,9)
        for(let i = 0; i < rand; i++) {
            let rand2 = getRandomIntInclusive(15, 30)
            let msg = ""
            
            for(let j = 0; j < rand2; j++) {
                msg += "M"
            }
            
            let rand3 = getRandomIntInclusive(1,6)
            
            for(let j = 0; j < rand3; j++) {
                msg += "😩"
            }
            
            let rand4 = getRandomIntInclusive(1,6)
            
            for(let j = 0; j < rand4; j++) {
                msg += "🤔"
            }
            
            await interaction.channel.send(msg)
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
