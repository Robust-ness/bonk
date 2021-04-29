const Discord = require('discord.js'),
dotenv = require('dotenv').config(),
client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
axios = require('axios').default,
fs = require('fs'),
path = require('path'),
mongoose = require('mongoose')

mongoose.connect('mongodb+srv://user:user@cluster0.ujgb0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  //console.log(err)
})

let Role = mongoose.model('Role', {
  owner: String,
  role: String,
  server: String
})

let commands = new Discord.Collection();
let nerdMatch = /(?:^|\s|\.|-|,)(?:geo|math|geology|calc|calculus|compsci|computer science|chem|english|hw|homework|quiz|test|seminar|macaulay|lisa|french|sam|nick|keryn|bio|biology|samantha|sammy|physics|anita|romano|sidhartha|mishra|nerd|semester|trimester|study|work|max|brian|adam|fuck|life|gaming|gamer|epic|exam|final|midterm|ghost|nicholas|boomer|andi)(?:$|\s|\.|-|,|\?|s|\!)/gm

fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
  const command = require(`./commands/${file}`)
  commands.set(command.name, command)
  const customJSON = {
    "name": command.name,
    "description": command.description,
    "options": command.options
  }
  //console.log(customJSON)
  if (!process.argv.includes('-n'))
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
})

client.ws.on('INTERACTION_CREATE', async interaction => {
  if (!commands.has(interaction.data.name))
    return

  let command = commands.get(interaction.data.name)
  let dadata = {
    data: {
      type: command.responseType,
      data: {
        content: command.response
        
      }
    }
  }
  command.flags != undefined ? dadata.data.data.flags = 64 : 0
  client.api.interactions(interaction.id, interaction.token).callback.post(dadata)
  await command.execute(client, interaction)
})


client.on('message', async msg => {
  // (await msg.guild.roles.fetch()).cache.array().forEach(r => {
  //   //console.log((r.members.array())[0].user)
  //   if ((r.members.array()).length != 0) {
  //     console.log(r.name)
  //   }
  // })
  if (msg.author.id == process.env.BOT_ID)
    return
  if ((msg.content.toLowerCase().includes("bonk") || await isChannelBonk(msg) || isMentionBonk(msg)) && msg.author.id != process.env.BOT_ID ) {
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
  let count = await (await reaction.message.fetch()).reactions.cache.filter(reaction => reaction.emoji.name == "👎" || reaction.emoji.name == "👍").array()
  //console.log(count)
  //count = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id)).filter(reaction => reaction.emoji.name == "👎" || reaction.emoji.name == "👍").array()
  if (count.length > 1) {
    console.log('ok')
    for (let i in count) {
      //console.log(count[i])
      if (reaction.emoji.name != count[i].emoji.name) {
        reaction.message.reactions.resolve(count[i].emoji.name).users.remove(user.id);
      }
    }
    // if (reaction.message.guild.member(user.id).kickable) {
    //   reaction.message.guild.member(user.id).kick("banned for racism")
    //   reaction.message.channel.send(`<@!${user.id}> banned for racism`)
    // } else {
    //   reaction.message.channel.send(`<@!${user.id}> is too powerful to be banned for racism`)
    // }
  }
});


client.on('ready', () => {
  if (process.argv.includes('-d')) {
    axios.get(`https://discord.com/api/v8/applications/${process.env.BOT_ID}/commands`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${process.env.BOT_TOKEN}`
    }}).then(res => {
      res.data.forEach(r => {
      //   axios.delete(`https://discord.com/api/v8/applications/823668195650961469/commands/${r.id}`, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bot ${process.env.BOT_TOKEN}`
      //     }
      //   }).then(r => {console.log(r.statusText)})
      console.log(r)
      })
    })
    //client.user.setActivity("What the fuck")
    client.user.setStatus("invisible")
  }

  console.log('revved and ready to go')
})



client.login(process.env.BOT_TOKEN);

function isMentionBonk(msg) {
  let regex = /<@!(?<gamer>\d*)>/gm
  let z = false;
  if (msg.content.match(regex) != null) {
    msg.content.match(regex).forEach(s => {
      s = s.substring(3, s.length - 1)
      if (s != null) {
        z = z || msg.guild.member(s).displayName.toLowerCase().includes('bonk')
      }
    })
  }
  return z
}

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