const fs = require('fs')

module.exports = {
    name: "newnerdword",
    description: "Add nerd word.",
    async execute(client, interaction) {
        let newKeyWord = String(interaction.data.options[0].value).trim().toLowerCase()
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        let origString = fs.readFileSync("nerd-dictionary.txt").toString()
        if (origString.search(newKeyWord) != -1) {
            channel.send("Word is already there.")
            return
        }
        nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
        nerdMatch = RegExp(nerdMatch, "gm")
        fs.writeFileSync("nerd-dictionary.txt", origString + "," + newKeyWord)
        channel.send("New Dictionary:\n" + "`" + fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`")
        return
    },
    responseType: 4,
    options: [
        {
            "name": "word",
            "description": "Nope",
            "type": 4,
            "required": true
        }
    ],
    response: "Processed.",
}