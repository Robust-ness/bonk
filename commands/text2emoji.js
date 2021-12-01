const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("text2emoji")
        .setDescription("converts text to emoji")
        .addStringOption(message =>
            message
                .setName("message")
                .setDescription("message to be sent")
                .setRequired(true)
        ),

    async execute(client, interaction) {
		let phrase = interaction.options.getString("message")
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
			else if(c == ' ')
			{
				text += "  "
			}
			else
			{
				text += c
			}
        }
		
		interaction.channel.send(text)

		interaction.reply({
            content: "ok",
            ephemeral: true
        })
    }
}