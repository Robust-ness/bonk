const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "text2emoji",
    description: "yesno",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
		let phrase = interaction.options.getString("phrase")
		
		interaction.reply({
            content: "ok",
            ephemeral: true
        })
		
		let text = ""
		
        for (let i = 0; i < phrase.length; i++)
		{
			let c = phrase.charAt(i).toLowerCase()
			
			if(c.match(/^[a-z]*$/))
			{
				text += ":regional_indicator_" + c + ": "
			}
			else if(c.match(/^[0-9]*$/))
			{
				var nums = new Array('zero','one','two','three','four','five','six','seven','eight','nine')
				text += ":" + nums[c - '0'] + ": "
			}
			else if(c == "!")
			{
				text += ":exclamation: "
			}
			else if(c == "?")
			{
				text += ":question: "
			}
			else if(c == "$")
			{
				text += ":heavy_dollar_sign: "
			}
			else if(c == '+')
			{
				text += ":heavy_plus_sign: "
			}
			else if(c == '-')
			{
				text += ":heavy_minus_sign: "
			}
			else if(c == '/')
			{
				text += ":heavy_division_sign: "
			}
			else if(c == '*')
			{
				text += ":heavy_multiplication_x: "
			}
			else
			{
				text += c
			}
        }
		
		interaction.channel.send(text)
    },
    options: [
		{
			"name": "phrase",
			"description": "text to be converted",
			"type": 3,
			"required": true
		}
    ]
}