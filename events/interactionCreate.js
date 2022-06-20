const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const translate = require('@iamtraction/google-translate');
module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    // ---------- VERIFICA ---------

    if (interaction.customId == "verifica") {
      if(interaction.member.roles.cache.has(config.verifyRole)){
        
        return (
          interaction.reply({content:'Hai già superato la verifica.', ephemeral:true }))
        
      }else{
        return(
          interaction.member.roles.add(config.verifyRole),
          interaction.reply({
            content: 'Benvenuto nel server ! Ti sei appena verificato. Fatti un giro, se hai qualche dubbio scrivi pure in un ticket il tuo problema.',
            ephemeral: true
        })
        )
      
      }
    } 


    // ----------- COMANDI -----------
    
    if (interaction.commandName === 'assistenza') {

      // Create the modal
      const modal = new Modal()
        .setCustomId('assistenzaModal')
        .setTitle('assistenza command by DotBund Development');


      const message = new TextInputComponent()
        .setCustomId('assistenzaMessage')
        .setLabel("Descrivi qui i tuoi problemi brevemente")
        .setPlaceholder('Bot Developed by DotBund for NightCity')
        .setRequired(true);

      const Nick = new TextInputComponent()
        .setCustomId('assistenzaNick')
        .setLabel('Nick')
        .setPlaceholder("Inserisci qua il tuo nickname su miecraft")
        .setStyle('SHORT')        
        .setRequired(true);

      const Link = new TextInputComponent()
        .setCustomId('Link')
        .setLabel('Clip')
        .setPlaceholder('Inserisci qui le prove video');
      const contentMessage = new MessageActionRow().addComponents(message);
      const contentNick = new MessageActionRow().addComponents(Nick);
      const contentButton = new MessageActionRow().addComponents(Link)
      modal.addComponents(contentMessage , contentNick, contentButton );



      
        
        }
    if (interaction.commandName === 'say') {

      // Create the modal
      const modal = new Modal()
        .setCustomId('sayModal')
        .setTitle('Say command by DotBund Development');


      const message = new TextInputComponent()
        .setCustomId('sayMessage')
        .setLabel("Scrivi qui il testo che vorrai inoltrare")
        .setStyle('PARAGRAPH')
        .setMinLength(config.sayMinLength)
        .setPlaceholder('Bot Developed by Cescofran for DotBund')
        .setRequired(true);

      const link = new TextInputComponent()
        .setCustomId('sayLink')
        .setLabel('Link')
        .setPlaceholder("Questo campo non è obbligatorio")
        .setStyle('SHORT');

      const buttonLink = new TextInputComponent()
        .setCustomId('buttonLink')
        .setLabel('Nome del bottone')
        .setPlaceholder('Scrivi il nome del bottone ( vuoto equivale a "clip")')
        .setStyle('SHORT');
      const contentMessage = new MessageActionRow().addComponents(message);
      const contentLink = new MessageActionRow().addComponents(link);
      const contentButton = new MessageActionRow().addComponents(buttonLink)
      modal.addComponents(contentMessage , contentLink, contentButton );



      await interaction.showModal(modal);

 
    } 
       if (!interaction.isModalSubmit()) {return;}
       else{

        const messageRow = interaction.fields.getTextInputValue('sayMessage');






        const translated = await translate(messageRow, {to: 'en'});
        var say = await new Discord.MessageEmbed()
            .setColor(config.serverColorMain)
            .setTitle(":flag_it: "+interaction.guild.name)
            .setURL("https://discord.gg/a2kxdHvQNv")
            .addField("**Message:**", "*"+messageRow+"*", true)  //true e fa rimanere sulla stessa linea le sezioni          
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
            .setTimestamp();


            var saytranslated = await new Discord.MessageEmbed()
              .setColor(config.serverColorMain)
              .setTitle(":flag_us: "+interaction.guild.name)
              .setURL("https://discord.gg/a2kxdHvQNv")

              .addField("**Message:**", "*"+ translated.text +"*", true)  //true e fa rimanere sulla stessa linea le sezioni 
              
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
              .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
              .setTimestamp();

            const channel2 = await client.channels.cache.get(interaction.channelId);


            const linkRow = await interaction.fields.getTextInputValue('sayLink');
            const buttonRow = await interaction.fields.getTextInputValue('buttonLink')
            if(linkRow){
              if(buttonRow){
                var linkButton = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(buttonRow)
                    .setStyle('LINK')
                    .setURL(linkRow)
                );
              }else{
                var linkButton = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel('Clip')
                    .setStyle('LINK')
                    .setURL(linkRow)
                );
            }
              await channel2.send({
                content: "@everyone",
                embeds: [say, saytranslated],
                components: [linkButton]
              }).catch(err => {return interaction.reply({content:"Non hai specificato un link corretto 😕", ephemeral:true})});

            }else{
              await channel2.send( {
                  content:"@everyone",
                  embeds:[say, saytranslated]
              });
               
              
              
          } 
          return interaction.reply( {content: "Fatto :grinning:", ephemeral: true}).catch(err => {});

        
          
        }
 
  }
}