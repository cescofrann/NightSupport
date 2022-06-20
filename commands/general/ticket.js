const discordTranscripts = require('discord-html-transcripts');
module.exports = {
    name: "ticket",
    data: {
        name: "ticket",
        description: "Aprirai un ticket; in poco avrai una risposta dal nostro Team di staff"
    },
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});
        // -------------------- SENZA db ----------------------
 
    if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
        return interaction.editReply({
          content: 'Hai già un ticket aperto. Non ne puoi aprire altri ! :slight_frown:',
          ephemeral: true
        });
          }else{
            interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                parent: config.category,
                topic: interaction.user.id,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                  },
                  {
                    id: config.roleSupport,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                  },
                  {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                ],
                type: "GUILD_TEXT",
              }).then(async c => {
                interaction.editReply({
                  content: `Ticket creato! :slight_smile: <#${c.id}>`,
                  ephemeral: true
                });
            var ticketEmbed = new Discord.MessageEmbed()
            .setColor(client.serverColorMain)
            .setTitle("**DotBund Ticket System**")
            .setDescription(`${interaction.user.toString()} benvenuto in questo ticket. Spiega in modo rapido e chiaro il tuo problema, in pocho un membro del nostro team ti darà una risposta.`)
            .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
            .setTimestamp();

            const buttons = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setLabel('Chiudi il ticket')
                .setStyle('PRIMARY')
                .setCustomId('close')
                .setEmoji('❌'),
            );
            
            await c.send({
                content: "<@&"+config.roleSupport.toString()+">",
                embeds: [ticketEmbed],
                components: [buttons]
            })


            
        client.on('interactionCreate', async interaction => {
            if (!interaction.isButton) return;
            else if(interaction.customId == "close"){ 
              var a = client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id);
              var embed = new Discord.MessageEmbed()
                      .setTitle(":raised_hand: Aspetta")
                      .setDescription("Hey, aspetta sto salvando i messaggi...\nTra poco ti manderò il log in dm.")
                      .setThumbnail("https://cdn.discordapp.com/attachments/947548338755084318/975472174989180948/unknown.png")
                      .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
                      .setTimestamp()
                      
              a.send({ embeds: [embed] })
              
  
              const attachment = await discordTranscripts.createTranscript(a, {fileName:`${interaction.user.username}_Ticket.html` })
  
              
              
  
              const logStaff = client.channels.cache.get(config.logStaff)
              await logStaff.send({
                  files: [attachment]
              })
  
              var b = interaction.user
              await b.send({
                  files: [attachment]
              }) 
              a.delete();
            }
        })
    })
    }



    }  
  }
