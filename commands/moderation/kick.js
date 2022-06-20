const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  module.exports = {
    name: 'kick',
    data: new SlashCommandBuilder()
      .setName('kick')
      .setDescription('Kickare una persona.')
      .addUserOption(option =>
        option.setName('user')
        .setDescription('Membro da kickare')
        .setRequired(true))
      .addStringOption(option =>
          option.setName('motivo')
          .setDescription('Motivo del kick')
          .setRequired(true)),
    async execute(interaction) {
      const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('user').id);
      const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);
  
      if (!executer.permissions.has("BAN_MEMBERS")) return interaction.reply({
        content: 'Non hai il permesso per fare questo comando! (`KICK_MEMBERS`)',
        ephemeral: true
      });
  
      if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
        content: 'La persona che vuoi kikkare ha dei ruoli più potenti di te !',
        ephemeral: true
      });
  
      if (!user.kickable) return interaction.reply({
        content: 'La persona che vuoi kikkare è sopra di me quindi non posso kikkarla',
        ephemeral: true
      });
      var dm = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("**Night Kick System Warning**")
        .addField("**ATTENZIONE:**", `*Sei appena stato kikkato dal server: **__${interaction.guild.name}__**`, false)

        .addField("**Reason:**", "*`` "+interaction.options.getString('motivo')+" ``*", true)  //true e fa rimanere sulla stessa linea le sezioni 
        .addField("**Admin:**", `${interaction.user.toString()}`, true)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
        .setTimestamp();
      var logEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("**Night Kick System Warning**")
        .addField("**ATTENZIONE:**", `${interaction.user.toString()} *Ha appena bannato dal server: **__${interaction.options.getUser('target').toString()}__**.\n*`, false)

        .addField("**Reason:**", "*`` "+interaction.options.getString('motivo')+" ``*", true)  //true e fa rimanere sulla stessa linea le sezioni 
        .addField("**Admin:**", `${interaction.user.toString()}`, true)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
        .setTimestamp();
      if (interaction.options.getString('motivo')) {
        user.send({
          embeds: [dm]
        }).catch(error=>{
          var errorBan = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("**Night __Error__ Warning**")
            .addField("**ATTENZIONE:**", `Ho tentato di avvisare **__${interaction.options.getUser('target').toString()}__** in dm ma non ci sono riuscito.\n.*`, false)

            .addField("**Reason:**", "*```"+interaction.options.getString('motivo')+"```*", true)  //true e fa rimanere sulla stessa linea le sezioni 
            .addField("**Admin:**", `${interaction.user.toString()}`, true)
            .addField("**Error:**","```"+ `${err}`+ ". ```", true)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
            .setTimestamp();
          client.channels.cache.get(config.errorLog).send({embeds: [errorBan]})
        })
        client.channels.cache.get(config.logStaff).send({embeds: [logEmbed]})

        user.kick(interaction.options.getString('motivo'))
        
        interaction.reply({
          content: `*Kickato!*`
        });
      } else {
        client.channels.cache.get(config.logStaff).send({embeds: [logEmbed]})
        user.kick()
        interaction.reply({
          content: `*Kikato*`
        });
      };
    },
  };