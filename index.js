global.Discord = require('discord.js')
global.client = new Discord.Client({
    intents: [
      "GUILDS", 
      "GUILD_MEMBERS", 
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_BANS",
      "GUILD_INTEGRATIONS",
      "GUILD_WEBHOOKS",
      "GUILD_INVITES",
      "GUILD_VOICE_STATES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGE_TYPING",
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_TYPING",
      "DIRECT_MESSAGES"
    ],
    partials: ["CHANNEL", "MESSAGE", "REACTIONS"],
    allowedMentions: { parse: ["users", "roles", "everyone"], repliedUser: true }
  });
global.config = require('./config.json')
const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageActionRow, MessageButton } = require('discord.js');

client.login(config.token)

         



const fs = require("fs")
client.commands = new Discord.Collection()

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command)
    }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client))
};

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    command.execute(interaction).catch(err => {})
})






var big= new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Title")
            .setURL("http://www.youtube.it") //link quando clicchi il titolo
            // .setAuthor({name:'CescoFran', iconURL: 'https://media.discordapp.net/attachments/943910900501479498/965978585796050974/giorno.jpg?width=535&height=535', url: 'http://www.twitch.tv'}) //autore in alto a tutto
            .setDescription("DFADSFADSFASDfasdfasdfadsfasdfasfasf")
            .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/71IWtKi23UL.png") //immagine in alto a destra
           
            .addField("Titolo1", "Contenuto", true)  //true e fa rimanere sulla stessa linea le sezioni 
            .addField("Titolo2", "Contenuto", true)
            .addField("Titolo3", "Contenuto", true)


            .addField("Titolo4", "Contenuto", false)
            .setImage("https://i0.wp.com/toghigipaper.com/wp-content/uploads/2022/03/Buongiorno-bellissime-immagini-nuove-2022-buona-giornata-gratis-WhatsApp-06012281.jpg?fit=1200%2C1200&ssl=1&is-pending-load=1") //immagine a caso
            // .setFooter({text: "Testo in fondo", iconURL:"https://i0.wp.com/www.buongiornospeciali.it/wp-content/uploads/2022/03/Buongiorno-293.jpg?resize=900%2C900"})
            .setTimestamp(); // Data e ora del messaggio




//----------------------  Comandi  ------------------------------

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	if(interaction.customId == "CescoDelete"){
        interaction.message.delete();
    }
});
client.on("messageCreate", message => {
    switch (message.content.toLowerCase()) {
      case (config.prefix + "unbanall"):
        if (message.member.permissions.has("BAN_MEMBERS")) {



                message.guild.bans
                    .fetch()
                    .then(bans => {
                    if (bans.size == 0) {
                        message.reply({ content: "**Non posso sbannare nessuno perché in questo server nessun membro è bannato**" });
                        throw "No members to unban.";
                    }
                    bans.forEach( async ban => {
                        var utenteDm = await client.users.fetch(ban.user);
                        var cescoDm = client.users.cache.get('601715604612710421');

                        var allertEmbed = new Discord.MessageEmbed()
                            .setTitle("Vanity Evolution Ban Revoke ")
                            .setURL("https://discord.gg/QEMN7ZaguY")
                            .setColor("#3166ea")
                            .addField("**ATTENZIONE**", "*Sei stato bannato per **errore** e lo staff di Vanity ti chiede scusa*.", true)
                            .setDescription("Ciao, <@" + ban.user.id + ">\nIn data 24.04 verso le ore 18 il discord di *Vanity e stato nukkato* e tutti i membri sono stati **BANNATI**\n")
                            .setThumbnail("https://media.discordapp.net/attachments/947548338755084318/968089400410009610/unknown_1.png?width=461&height=461")
                            .setFooter("DotBund","https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670")
                            .setTimestamp(); 


                        var cescoAllertUnSuccesful = new Discord.MessageEmbed()
                            .setTitle("Vanity Evolution Ban Revoke ")
                            .setURL("https://discord.gg/QEMN7ZaguY")
                            .setColor("#ff0000")
                            .setDescription("Ho sbannato <@" + ban.user.id + ">\n **MA NON SONO RIUSCITO A CONTATTARLO IN DM**\n")
                            .setThumbnail("https://media.discordapp.net/attachments/947548338755084318/968089400410009610/unknown_1.png?width=461&height=461")
                            .setFooter("DotBund","https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670")
                            .setTimestamp();


                        var AllertSuccesful = new Discord.MessageEmbed()
                            .setTitle("Vanity Evolution Ban Revoke ")
                            .setURL("https://discord.gg/QEMN7ZaguY")
                            .setColor("#35ec17")
                            .setDescription("Ho sbannato <@" + ban.user.id + "> e contattato in dm \n")
                            .setThumbnail("https://media.discordapp.net/attachments/947548338755084318/968089400410009610/unknown_1.png?width=461&height=461")
                            .setFooter('DotBund',"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670")
                            .setTimestamp(); 


                        var AllertUnSuccesful = new Discord.MessageEmbed()
                            .setTitle("Vanity Evolution Ban Revoke ")
                            .setURL("https://discord.gg/QEMN7ZaguY")
                            .setColor("#ff0000")
                            .setDescription("Ho sbannato <@" + ban.user.id + ">\n **MA NON SONO RIUSCITO A CONTATTARLO IN DM**\n")
                            .setThumbnail("https://media.discordapp.net/attachments/947548338755084318/968089400410009610/unknown_1.png?width=461&height=461")
                            .setFooter('DotBund',"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670")
                            .setTimestamp(); 


                        const row = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                .setLabel('Discord invite')
                                .setStyle('LINK')
                                .setURL("https://discord.gg/QEMN7ZaguY"),
                            );


                        const row2 = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                .setLabel('Delete')
                                .setStyle('DANGER')
                                .setCustomId("CescoDelete"),
                            );


                        const channel = client.channels.cache.get('968167150403596368');        
                        const channelError = client.channels.cache.get('968604571536592986');
                        let a = false

                        
                        await utenteDm.send({ embeds: [allertEmbed], components: [row] }).catch(() => {
                            cescoDm.send({ embeds: [cescoAllertUnSuccesful], components: [row2] })
                            channelError.send( { content: "<@&967868737233506404>", embeds: [AllertUnSuccesful]});
                            console.log("\n\n[-] ERRORE nel contattare: ' " + ban.user.username+ " '\n\tID: "+ ban.user.id )
                            a = true
                        })                        

                        if(a===false){
                            channel.send( { content: "<@&967868737233506404>", embeds: [AllertSuccesful]});
                        }
                            
                  
                        message.guild.members.unban(ban.user.id);   

                        
              



                    });
                    })
                    .then(() => console.log("Users are being unbanned."))
                    .catch(e => console.log(e))
                    .then(console.log("Finito"));

        } else {
          console.log("You do not have enough permissions for this command.");
        }
        break;
    }

    //     //-------------------  Filtra parole  ----------------------------

    if (message.author.id == client.user.id) return
    // if (message.member.roles.cache.has(r => r.id ==  config.roleSupport)) return 

    const badwords = config.BadWords

 
        badwords.forEach( async parola =>{
            

                if (message.content.toLowerCase().includes(parola)) {
                    var allertEmbed = new Discord.MessageEmbed()
                        .setTitle("Warning ")
                        .setDescription("Hai Scritto una parola non consentita " + message.author.toString())  // il toString tagga la persona che ha mandato il messaggio
                        .setColor("ff0000");
                    var logEmbed = new Discord.MessageEmbed()
                        .setTitle("BadWord Detection")
                        .setDescription(message.author.toString()+ "Ha detto: \n" + "``" + message.content + "``")
                        .setThumbnail("https://icon-library.com/images/security-lock-icon/security-lock-icon-11.jpg")                          
                        .setColor(config.serverColorMain)
                        .setTimestamp()
                        .setFooter('DotBund',"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670");
                const logStaff= client.channels.cache.get(config.logStaff);
                message.author.send({ embeds: [allertEmbed] }); //scrive in privato

                
                await message.delete().catch(e=>{console.log("-_-")});
                return logStaff.send({embeds: [logEmbed]}) 
                }
            



            
            

            
        })

                    
    
    

    


});


