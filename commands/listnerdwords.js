const fs = require('fs')

module.exports = {
    name: "listnerdwords",
    description: "List all words that are in the nerd word dictionary.",
    async execute(client, interaction) {
        client.channels.cache.find(channel => channel.id == interaction.channel_id).send("`" + fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`")
        return
    },
    responseType: 4,
    options: [],
    response: "Current List: ",
    flags: 64
}