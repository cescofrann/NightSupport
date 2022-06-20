const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  module.exports = {
    name: 'banbyid',
    data: new SlashCommandBuilder()
      .setName('banbyid')
      .setDescription('Ban una persona tramite id.')
      .addStringOption(option =>
        option.setName('target')
        .setDescription('Membro da bannare')
        .setRequired(true))
      .addStringOption(option =>
        option.setName('motivo')
        .setDescription('Motivo del ban')
        .setRequired(true)),
    async execute(interaction ) {
      const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getString('target'));
      const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

      var dm = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("**Night Ban System Warning**")
        .addField("**ATTENZIONE:**", `*Sei appena stato bannato dal server: **__${interaction.guild.name}__**.\nPensa a quello che hai fatto e prova a contattare in dm qualche staffer tra qualche settimana.*`, false)

        .addField("**Reason:**", "*`` "+interaction.options.getString('motivo')+" ``*", true)  //true e fa rimanere sulla stessa linea le sezioni 
        .addField("**Admin:**", `${interaction.user.toString()}`, true)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
        .setTimestamp();
      var logEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("**Night Ban System Warning**")
        .addField("**ATTENZIONE:**", `${interaction.user.toString()} *Ha appena bannato dal server: **__ <@${interaction.options.getString('target')}> __**.\n*`, false)

        .addField("**Reason:**", "*`` "+interaction.options.getString('motivo')+" ``*", true)  //true e fa rimanere sulla stessa linea le sezioni 
        .addField("**Admin:**", `${interaction.user.toString()}`, true)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
        .setTimestamp();
      const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel('UnBan')
            .setStyle('SECONDARY')
            .setCustomId('unban')
            .setEmoji('💀'),
        );

      client.on('interactionCreate', async interaction => {
        if (!interaction.isButton) return;
        else if(interaction.customId == "unban"){ 
          
          await interaction.guild.members.unban(user).catch(e=> 
            interaction.reply({content: "Ho già sbannato questo utente", ephemeral: true}))
        }
        interaction.reply({content: "Ho sbannato " + user.toString(), ephemeral: true}).catch(e=> console.log(interaction.user.username+" Sta provado ad usare una interazione già usata precedentemente per sbannare "+ user.toString()));
      })
      if (!executer.permissions.has("BAN_MEMBERS") ) return interaction.reply({
        content: 'Non hai i permessi per fare questo comando ! (`BAN_MEMBERS`)',
        ephemeral: true
      });

      if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
        content: 'La persona che vuoi bannare è sopra di me !',
        ephemeral: true
      });

      if (!user.bannable) return interaction.reply({
        content: 'La persona che vuoi bannare è sopra di me e non la posso bannare.',
        ephemeral: true
      });

      if (interaction.options.getString('motivo')) {
        await user.send({embeds: [dm]}).catch(err => {
          var errorBan = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("**Night __Error__ Warning**")
            .addField("**ATTENZIONE:**", `Ho tentato di avvisare **__ <@${interaction.options.getString('target')}> __** in dm ma non ci sono riuscito.\n.*`, false)

            .addField("**Reason:**", "*```"+interaction.options.getString('motivo')+"```*", true)  //true e fa rimanere sulla stessa linea le sezioni 
            .addField("**Admin:**", `${interaction.user.toString()}`, true)
            .addField("**Error:**","```"+ `${err}`+ ". ```", true)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
            .setTimestamp();
      
          client.channels.cache.get(config.errorBan).send({embeds: [errorBan], components:[row]})
        })
        user.ban({
          reason: interaction.options.getString('motivo'),
          days: 1
        });
        await client.channels.cache.get(config.logStaff).send({embeds: [logEmbed], components:[row]})
        interaction.reply({
          content: `**${user.user.tag}** è stato **BANNATO** !`,
          ephemeral: true,
          components: [row]
        });
      } else {
        await client.channels.cache.get(config.logStaff).send({embeds: [logEmbed], components:[row]})
        user.ban({
          days: 1
        });
        interaction.reply({
          content: `**${user.user.tag}** è stato **BANNATO** !`          ,
          ephemeral: true,
          components: [row]
        });
      };

      
    },
};