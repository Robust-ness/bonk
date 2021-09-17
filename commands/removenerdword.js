const fs = require('fs')

module.exports = {
    name: "removenerdword",
    description: "Remove nerd word.",
    async execute(client, interaction) {
        let newKeyWord = String(interaction.data.options[0].value).trim().toLowerCase()
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        let origString = fs.readFileSync("nerd-dictionary.txt").toString()
        if (origString.search(newKeyWord) == -1) {
            channel.send("Word does not exist.")
            return
        }
        origString = origString.replace("," + newKeyWord, "")
        fs.writeFileSync("nerd-dictionary.txt", origString)
        nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
        nerdMatch = RegExp(nerdMatch, "gm")
        channel.send("New Dictionary:\n" + "`" + fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`")
        return
    },
    responseType: 4,
    options: [
        {
            "name": "word",
            "description": "Nope",
            "type": 3,
            "required": true
        }
    ],
    response: "Processed.",
}