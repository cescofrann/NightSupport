const discordTranscripts = require('discord-html-transcripts');
module.exports = {
    name: "tclose",
    data: {
        name: "tclose",
        description: "Chiudo il tuo ticket"
    },
    async execute(interaction) {
 

        await interaction.deferReply({ephemeral: true});
        if(client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)){
           
            var a = client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id);
            var embed = new Discord.MessageEmbed()
                    .setTitle(":raised_hand: Aspetta")
                    .setDescription("Hey, aspetta sto salvando i messaggi...\nTra poco ti manderò il log in dm.")
                    .setThumbnail("https://cdn.discordapp.com/attachments/947548338755084318/975472174989180948/unknown.png")
                    .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
                    .setTimestamp()
                    
            a.send({ embeds: [embed] })
            

            const attachment = await discordTranscripts.createTranscript(a, {fileName:`${interaction.user.username}_Ticket.html` })

            
            

            const logStaff = client.channels.cache.get(config.ticketLog)
            await logStaff.send({
                files: [attachment]
            })

            var b = interaction.user
            await b.send({
                files: [attachment]
            }) 
            a.delete();
  
        }else{    
            interaction.editReply({
                content: 'Non hai un ticket aperto',
                ephemeral: true
            })
        }

    }
}
