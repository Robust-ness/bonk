const fs = require('fs')

module.exports = {
    name: "listnerdwords",
    description: "List all words that are in the nerd word dictionary.",
    async execute(client, interaction) {
        return
    },
    responseType: 4,
    options: [],
    response: "`" + fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`",
    flags: 64
}