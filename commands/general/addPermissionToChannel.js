const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  module.exports = {
    name: 'editallchannel',
    data: new SlashCommandBuilder()
      .setName('editallchannel')
      .setDescription('Modifico tutti i canali dando i full access a un determinato ruolo.')
      .addRoleOption(option =>
        option.setName('role')
        .setDescription('Ruolo da uppare nelle stanze')
        .setRequired(true)),
      async execute(interaction ) {
     
    
      await interaction.deferReply({ephemeral: true});
        interaction.guild.channels 
            .fetch()
            .then(channel =>{
                
                  channel.forEach( async stanza=>{ 
                      await stanza.permissionOverwrites.edit(interaction.options.getRole('role').id, {
                        "CREATE_INSTANT_INVITE": true,
                        "KICK_MEMBERS": true,
                        "BAN_MEMBERS": true,
                        "MANAGE_CHANNELS": true,
                        "MANAGE_GUILD": true,
                        "ADD_REACTIONS": true,
                        "VIEW_AUDIT_LOG": true,
                        "VIEW_CHANNEL": true,
                        "SEND_MESSAGES": true,
                        "SEND_TTS_MESSAGES": true,
                        "MANAGE_MESSAGES": true,
                        "EMBED_LINKS": true,
                        "ATTACH_FILES": true,
                        "READ_MESSAGE_HISTORY": true,
                        "MENTION_EVERYONE": true,
                        "USE_EXTERNAL_EMOJIS": true,
                        "CONNECT": true, // Voice Channel
                        "SPEAK": true,
                        "MUTE_MEMBERS": true,
                        "DEAFEN_MEMBERS": true,
                        "MOVE_MEMBERS": true,
                        "USE_VAD": true, // Voice Auto Detection
                        "CHANGE_NICKNAME": true,
                        "MANAGE_NICKNAMES": true,
                        "MANAGE_ROLES": true,
                        "MANAGE_WEBHOOKS": true,
                      });
                    })
                    interaction.editReply("Ho assegnato: " + interaction.options.getRole('role').toString() + " alle stanze fine.")
                        
            })
            

    },
};