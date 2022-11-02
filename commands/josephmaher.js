const fs = require('fs')
const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("josephmaher")
        .setDescription("MMMMMMMM樂"),

    async execute(client, interaction) {
        let rand = getRandomIntInclusive(2,6)
        for(let i = 0; i < rand; i++) {
            let rand2 = getRandomIntInclusive(15, 25)
            let msg = ""
            
            for(let j = 0; j < rand2; j++) {
                msg += "M"
            }
            
            let rand3 = getRandomIntInclusive(1,4)
            
            for(let j = 0; j < rand3; j++) {
                msg += ""
            }
            
            let rand4 = getRandomIntInclusive(1,4)
            
            for(let j = 0; j < rand4; j++) {
                msg += "樂"
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
