const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  module.exports = {
    name: 'unbanall',
    data: new SlashCommandBuilder()
      .setName('unbanall')
      .setDescription('Sbanno tutte le persone del server.')
      .addChannelOption(option =>
        option.setName('channel')
        .setDescription('Stanza dove annuncierò lo sban completo del server')),      
    async execute(interaction) {
        console.log("0")
        await interaction.deferReply({ephemeral: true})
        var a =  new Discord.MessageEmbed()
        .setTitle(`${interaction.guild.name} Ban Revoke`)
        .setURL("https://discord.gg/QEMN7ZaguY")
        .setColor(config.serverColorMain)
        .addField("**ATTENZIONE**", `Salve cara utenza. Lo staff di *${interaction.guild.name}* ha deciso di dare una seconda possibilità a tutti gli utenti. \n**Comunichiamo quindi l'ufficialità dello sban per qualsiasi membro all'interno di questo discord**`, true)
        .setThumbnail(interaction.guild.iconUrl)
        .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
        .setTimestamp()
        if(!a.isText()){
            interaction.editReply("Non hai specificato un canle testuale dove fare l'annuncio valido.")
        }else{
            
        
            interaction.guild.bans
                        .fetch()
                        .then(bans => {
                        if (bans.size == 0) {
                            interaction.editReply({ content: "Non ci sono persone bannate in questo server", ephemeral: true });
                        }
                        bans.forEach(ban => {
                            var utenteDm = client.users.cache.get(ban.user.id);

                            var allertEmbed = new Discord.MessageEmbed()
                            .setTitle(`${interaction.guild.name} Ban Revoke`)
                            .setURL("https://discord.gg/QEMN7ZaguY")
                            .setColor("#3166ea")
                            .addField("**ATTENZIONE**", `Sei stato sbannato da ${interaction.guild.name}.\nLo staff ti preag di rileggere il regolamento e di rispettarlo non ci saranno altre possibilità per te.`, true)
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                            .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
                            .setTimestamp(); // Data e ora del messaggio ; 


                            var cescoAllert = new Discord.MessageEmbed()
                            .setTitle(`${interaction.guild.name} Ban Revoke`)
                            .setURL("https://discord.gg/QEMN7ZaguY")
                            .setColor("#3166ea")
                            .addField("**ATTENZIONE**", "Ho sbannato <@" + ban.user.id + ">\n", true)
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                            .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
                            .setTimestamp(); // Data e ora del messaggio ; 


                            const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                    .setLabel('Discord invite')
                                    .setStyle('LINK')
                                    .setURL("https://discord.gg/a2kxdHvQNv"),
                                );
                                const rowKing = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                    .setLabel('DotBund')
                                    .setEmoji('👑')
                                    .setStyle('SECONDARY')
                                    .setCustomId('king')
                                    .setDisabled(true),
                                );


                                    

                                utenteDm.send({ embeds: [allertEmbed], components: [row] }).catch(err => {})
                                    const channel = client.channels.cache.get(config.logStaff);
                                    channel.send({ embeds: [cescoAllert], components: [rowKing]}).catch()
        
                                
                    
                            interaction.guild.members.unban(ban.user.id);     


                        });
                        interaction.editReply({content:"Ho sbannato tutti gli utenti con successo", ephemeral:true})
                        })
                        .then(() => {
                            const ab = interaction.options.getChannel('channel')

                                ab.send({ embeds: [a] })

                        })
                        .catch(e => console.log(e))
                        .then(console.log("DotBund Sban System ✅"));
                            
                            
                }                   
                            
                            
                            
                            
    }
  }