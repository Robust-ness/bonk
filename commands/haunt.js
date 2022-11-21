const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("haunt")
        .setDescription("Go fuck yourself")
	.addUserOption(user =>
            user
                .setName("user")
                .setDescription("figure it the fuck out")
                .setRequired(true)
        )
        .addStringOption(message =>
            message
                .setName("message")
                .setDescription("figure it the fuck out")
                .setRequired(true)
        )
	.addIntegerOption(i =>
		i
		.setName("i")
		.setDescription("repeat amount")
		.setRequired(false)
	),

    async execute(client, interaction) {
	let amount = interaction.options.getInteger("i")
		
	if(amount == undefined)
		amount = 1
	    
	const user = interaction.options.getUser("user")
	const message = interaction.options.getString("message")
	
        if (amount < 0 || amount > 10) {
		interaction.reply({
			ephemeral: true,
			content: "'i' must be within 0..10"
		})
        }
	else {
		for (let i = 0; i < amount; i++) {
			user.send(message)
		}
		
		interaction.reply({content: `Sent <@${user.id}> "${message}" ${amount}x`, ephemeral: true})
	}
    }
}
