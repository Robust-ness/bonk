const fs = require('fs'),
{ CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "removenerdword",
    description: "Remove nerd word.",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        let newKeyWord = String(interaction.options.getString("word")).trim().toLowerCase()
        let origString = fs.readFileSync("nerd-dictionary.txt").toString()
        if (origString.search(newKeyWord) == -1) {
            interaction.reply(`Error: Word \`${newKeyWord}\` does not exist.`)
            return
        }
        origString = origString.replace("," + newKeyWord, "")
        origString = origString.replace(newKeyWord, "")
        fs.writeFileSync("nerd-dictionary.txt", origString)
        nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
        nerdMatch = RegExp(nerdMatch, "gm")
        interaction.reply("Removed `" + `${newKeyWord}\`\n\n` + "New Dictionary:\n" + "`" + fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`")
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