const Discord = require('discord.js'),
{ Intents } = require('discord.js'),
client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]}),
dotenv = require('dotenv').config(),
axios = require('axios').default,
fs = require('fs'),
path = require('path')

// https://discord.com/api/oauth2/authorize?client_id=832755822001782814&permissions=8&scope=bot%20applications.commands

let commands = new Discord.Collection();
let nerdMatch = RegExp(`(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`, 'gm')

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || !commands.has(interaction.commandName))
    return
  let command = commands.get(interaction.commandName)
  await command.execute(client, interaction)
})

// client.ws.on('INTERACTION_CREATE', async interaction => {
//   dadata = {
//     data: {
//       type: command.responseType,
//       data: {
//         content: command.response
//       }
//     }
//   }
//   command.flags != undefined ? dadata.data.data.flags = 64 : 0
//   console.log(await client.api.interactions(interaction.id, interaction.token).callback.post(dadata))
//   await command.execute(client, interaction)
// })


client.on('message', async msg => {
  nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
  nerdMatch = RegExp(nerdMatch, "gm")
  // (await msg.guild.roles.fetch()).cache.array().forEach(r => {
  //   //console.log((r.members.array())[0].user)
  //   if ((r.members.array()).length != 0) {
  //     console.log(r.name)
  //   }
  // })
  if (msg.author.id == process.env.BOT_ID)
    return
  if ((msg.content.toLowerCase().includes("bonk") || await isChannelBonk(msg) || await isMentionBonk(msg)) && msg.author.id != process.env.BOT_ID ) {
    msg.channel.send("BONK")
  }
  if (msg.content.toLowerCase().match(nerdMatch)) {
    msg.channel.send('nerd')
  }
  //let allRoles = await ((await msg.guild.roles.fetch()).cache).array()
  //console.log(allRoles[0])
  // allRoles.splice(allRoles.findIndex(i => i.name == "@everyone"), 1)
  // allRoles.splice(allRoles.findIndex(i => i.id == "827402952443428896"), 1)
  // allRoles.splice(allRoles.findIndex(i => i.name == "Rythm"), 1)
  // allRoles.splice(allRoles.findIndex(i => i.name == "a²+b²=c²"), 1)
  // allRoles.splice(allRoles.findIndex(i => i.name == "Nerd"), 1)
  // allRoles.forEach(i => {
  //   console.log(i.name)
  // })
  // console.log(roleCache)
  // const member = msg.guild.member(msg.author.id)
  // Role.find({owner: msg.author.id, server: msg.guild.id}, (err, allRolesOfUser) => {
  //   allRolesOfUser.forEach(r => {
  //     r.delete()
  //   })
  //   allRolesOfUser.forEach(role => {
  //     member.roles.cache.array().forEach(all => {
  //       if (all.name == role.role) {
  //         all.delete()
  //       }
  //     })
  //   })
    // member.roles.cache.array().forEach(async r => {
    //   let foundRole = allRolesOfUser.findIndex(i => i.role == r.name)
    //   //console.log(foundRole)
    //   if (foundRole != -1) {
    //     //await member.roles.remove(r)
    //     Role.findByIdAndDelete(allRolesOfUser[foundRole].id, (err, doc) => {
    //       //console.log(err, doc)
    //     })
    //     let allThings = await msg.guild.roles.fetch()
    //     //console.log(allRolesOfUser)
        
    //     let bingo = allThings.cache.find(i => i.name == allRolesOfUser[foundRole].role)
    //     if (bingo.name != undefined && !bingo.deleted) {

    //       await bingo.delete()
    //     }
        
    //     // .delete()).then(r => {
    //     // })
    //     console.log(allRolesOfUser[foundRole].id)
    //   }
    // })
  // })

  //member.roles.remove(allRoles)
  // member.roles.cache.array().forEach(r => {
  //   console.log(r.name)
  // })

  // if (msg.content == 'do it' && msg.author.id == '234529409694957569') {
  //   msg.channel.send('okay')
  //   for (let i = 8; i <= 99; i++) {
  //     setTimeout(async() => {
  //       let hexColor = getRandomIntInclusive(0, 16777215)
  //       await msg.guild.roles.create({
  //         data: {
  //           name: 'gamer' + i,
  //           color: "#" + hexColor.toString(16).toUpperCase()
  //         }
  //       })
  //     }, 3000 * i)
  //   }
  // }
  

  // let dictionary;
  // let wordSalad = ""
  // await fs.readFile("./dictionary.json", {encoding: "utf-8"}, async (err, data) => {
  //   dictionary = JSON.parse(data)
  //   let keys = Object.keys(dictionary)
  //   for (let i = 0; i <= getRandomIntInclusive(0, 2); i++) {
  //     wordSalad = ""
  //     let hexColor = getRandomIntInclusive(0, 16777215)
  //     let word = keys[getRandomIntInclusive(0, keys.length - 1)].toLowerCase()
  //     wordSalad += word[0].toUpperCase() + word.substring(1, word.length) + " "
  //     word = keys[getRandomIntInclusive(0, keys.length - 1)].toLowerCase()
  //     wordSalad += word[0].toUpperCase() + word.substring(1, word.length)
  //     await msg.guild.roles.create({
  //       data: {
  //         name: wordSalad,
  //         color: "#" + hexColor.toString(16).toUpperCase()
  //       }
  //     }).then(async role => {
  //       //console.log(role)
  //       await (member.roles.add(role)).then(r => {
  //         let newRole = new Role({owner: msg.author.id, role: role.name, server: msg.guild.id})
  //         newRole.save()
  //       }).catch(e => {
  //         console.log(e)
  //       })
  //     })
  //   }
  // })


  // for (let i = 1; i <= getRandomIntInclusive(1, allRoles.length); i++) {
  //   let index = getRandomIntInclusive(0, allRoles.length - 1)
  //   member.roles.add(allRoles[index])
  //   allRoles.slice(index, 1)
  // }
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}
  if (user.id == "832755822001782814")
    return
  let count = await (await reaction.message.fetch())
    .reactions
    .cache
    .filter(reaction => reaction.emoji.name == "👎" || reaction.emoji.name == "👍")
  if (count.size > 1) {
    count.forEach(r => {
      if (reaction.emoji.name != r.emoji.name) {
        reaction.message.reactions.resolve(r.emoji.name).users.remove(user.id);
      }
    })
    // if (reaction.message.guild.member(user.id).kickable) {
    //   reaction.message.guild.member(user.id).kick("banned for racism")
    //   reaction.message.channel.send(`<@!${user.id}> banned for racism`)
    // } else {
    //   reaction.message.channel.send(`<@!${user.id}> is too powerful to be banned for racism`)
    // }
  }
});


client.on('ready', () => {
  fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
    const command = require(`./commands/${file}`)
    commands.set(command.name, command)
    const customJSON = {
      "name": command.name,
      "description": command.description,
      "options": command.options
    }
    if (!process.argv.includes('-n') || !process.argv.includes(customJSON.name))
      return
    axios.request(`https://discord.com/api/v8/applications/${process.env.BOT_ID}/commands`, {
      method: 'POST',
      data: JSON.stringify(customJSON),
      headers: {
        'Authorization' : `Bot ${process.env.BOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res.statusText)
    })
    client.destroy()
  })
  if (process.argv.includes('-d')) {
    axios.get(`https://discord.com/api/v8/applications/${process.env.BOT_ID}/commands`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${process.env.BOT_TOKEN}`
    }}).then(res => {
      res.data.forEach(r => {
        axios.delete(`https://discord.com/api/v8/applications/823668195650961469/commands/${r.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${process.env.BOT_TOKEN}`
          }
        }).then(r => {console.log(r.statusText)})
      })
    })
    client.destroy()
  }

  console.log('revved and ready to go')
})



client.login(process.env.BOT_TOKEN);

/**
 * 
 * @param {Discord.Message} msg 
 */

async function isMentionBonk(msg) {
  let regex = /<@!(?<gamer>\d*)>/gm
  let z = false;
  if (msg.content.match(regex) != null) {
    await msg.content.match(regex).forEach(async s => {
      s = s.substring(3, s.length - 1)
      z = z || (await msg.guild.members.fetch(s)).displayName.toLowerCase().includes('bonk')
    })
  }
  return z
}

/**
 * 
 * @param {Discord.Message} msg 
 */
async function isChannelBonk(msg) {
  let regex2 = /<#(?<gamer>\d*)>/gm
  let z = false;
  if (msg.content.match(regex2) != null) {
    let matches = msg.content.match(regex2)
    for (let i in matches) {
      matches[i] = matches[i].substring(2, matches[i].length - 1)
      if (matches[i] != null) {
        z = z || await (await client.channels.fetch(matches[i])).toJSON().name.toLowerCase().includes("bonk")
      }
    }
  }
  return z
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
