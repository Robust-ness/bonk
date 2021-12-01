const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nerdword")
        .setDescription("add, remove, and list nerd words")
        .addSubcommand(add =>
            add
                .setName("add")
                .setDescription("add a new nerd word")
                .addStringOption(word =>
                    word
                        .setName("word")
                        .setDescription("new nerd word")
                        .setRequired(true)    
                )
        )
        .addSubcommand(remove =>
            remove
                .setName("remove")
                .setDescription("remove a nerd word")
                .addStringOption(word =>
                    word
                        .setName("word")
                        .setDescription("nerd word to be removed")
                        .setRequired(true)    
                )
        )
        .addSubcommand(list =>
            list
                .setName("list")
                .setDescription("list nerd words")    
        ),

        async execute(client, interaction) {
            if(interaction.options.getSubcommand() === "add") {
                let newKeyWord = String(interaction.options.getString("word")).trim().toLowerCase()
                let origString = fs.readFileSync("resources/nerd-dictionary.txt").toString()
                if (origString.search(newKeyWord) != -1) {
                    interaction.reply(`Error: Word \`${newKeyWord}\` already exists.`)
                    return
                }
                fs.writeFileSync("resources/nerd-dictionary.txt", origString + "," + newKeyWord)
                nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("resources/nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
                nerdMatch = RegExp(nerdMatch, "gm")
                interaction.reply({
                    content: `Added \`${newKeyWord}\`\n\nNew Dictionary:\n` + "`" + fs.readFileSync("resources/nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`",
                    ephemeral: true
                })
            }
            else if(interaction.options.getSubcommand() === "remove") {
                let newKeyWord = String(interaction.options.getString("word")).trim().toLowerCase()
                let origString = fs.readFileSync("resources/nerd-dictionary.txt").toString()
                if (origString.search(newKeyWord) == -1) {
                    interaction.reply(`Error: Word \`${newKeyWord}\` does not exist.`)
                    return
                }
                origString = origString.replace("," + newKeyWord, "")
                origString = origString.replace(newKeyWord, "")
                fs.writeFileSync("resources/nerd-dictionary.txt", origString)
                nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("resources/nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
                nerdMatch = RegExp(nerdMatch, "gm")
                interaction.reply({
                    content: "Removed `" + `${newKeyWord}\`\n\n` + "New Dictionary:\n" + "`" + fs.readFileSync("resources/nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`",
                    ephemeral: true
                })
            }
            else if(interaction.options.getSubcommand() === "list") {
                interaction.reply({
                    content: "Current List: `" + fs.readFileSync("resources/nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`",
                    ephemeral: true
                })
            }
        }
}