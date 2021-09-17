const fs = require('fs')
const {CommandInteraction, Client} = require("discord.js")

module.exports = {
    name: "newnerdword",
    description: "Add nerd word.",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        let newKeyWord = String(interaction.options.getString("word")).trim().toLowerCase()
        let origString = fs.readFileSync("nerd-dictionary.txt").toString()
        if (origString.search(newKeyWord) != -1) {
            interaction.reply(`Error: Word \`${newKeyWord}\` already exists.`)
            return
        }
        fs.writeFileSync("nerd-dictionary.txt", origString + "," + newKeyWord)
        nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
        nerdMatch = RegExp(nerdMatch, "gm")
        interaction.reply(
            {
                content: `Added \`${newKeyWord}\`\n\nNew Dictionary:\n` + "`" + fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`"
            }
        )
    },
    options: [
        {
            "name": "word",
            "description": "Nope",
            "type": 3,
            "required": true
        }
    ]
}