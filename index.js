const Discord = require('discord.js'),
dotenv = require('dotenv').config(),
client = new Discord.Client()
let regex = /<@!(?<gamer>\d*)>/gm

client.on('message', msg => {
  let z = false
  //console.log(msg.content)
  //console.log(client.users.cache.get().toString().toLowerCase())
  if (msg.content.match(regex) != null) {
    msg.content.match(regex).forEach(s => {
      s = s.substring(3, s.length - 1)
      if (s != null) {
        if (msg.guild.member(s).displayName.toLowerCase().includes('bonk')) {
          z = true
        }
      }
    })
  }
  if ((msg.content.toLowerCase().includes("bonk") || z) && msg.author.id != "823668195650961469" ) {
    msg.channel.send("BONK")
  }
});

client.on('ready', () => {
  console.log('revved and ready to go')
})

client.login(process.env.BOT_TOKEN);