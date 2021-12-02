const { SlashCommandBuilder } = require('@discordjs/builders')
axios = require('axios').default,
path = require('path')

module.exports = {
    data: new SlashCommandBuilder()
		.setName("bot")
		.setDescription("bot control")
		.addSubcommand(reload =>
			reload
				.setName("reload")
				.setDescription("kicks and restarts bot")
		)
		.addSubcommand(reinvite =>
			reinvite
				.setName("reinvite")
				.setDescription("kicks bot")
		)
		.addSubcommand(invite =>
			invite
				.setName("invite")
				.setDescription("sends invite link")
		)
		.addSubcommand(restart =>
			restart
				.setName("restart")
				.setDescription("restarts bot")
		),
	
    async execute(client, interaction) {
		let inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${process.env.BOT_ID}&permissions=8&scope=applications.commands%20bot`
		
		if(interaction.options.getSubcommand() === "reinvite") {
			interaction.reply({
				ephemeral: true,
				content: `Re-invite me using the link below:\n${inviteLink}\nGoodbye!`
			})

			await sleep(1000)
			await interaction.member.guild.leave()
		}
		else if(interaction.options.getSubcommand() === "invite") {
			interaction.reply({
				ephemeral: true,
				content: `Here's the invite link:\n${inviteLink}`
			})
		}
		else if(interaction.options.getSubcommand() === "reload") {
			interaction.reply({
				ephemeral: true,
				content: `Reloading bot! Re-invite me using the link below:\n${inviteLink}\nGoodbye!`
			})

			await sleep(1000)
			await interaction.member.guild.leave()
			console.log("shutting down via /bot reload")
			await sleep(1000)
			client.destroy()
		}
		else if(interaction.options.getSubcommand() === "restart") {
			interaction.reply({
				ephemeral: true,
				content: `Restarting bot!`
			})

			console.log("shutting down via /bot restart")
			await sleep(1000)
			client.destroy()
		}
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
