const {
	MessageActionRow,
	Modal,
	TextInputComponent
} = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		// ----------- COMANDI -----------

		if (interaction.commandName === 'assistenza') {

			// Create the modal
			const modal = new Modal()
				.setCustomId('assistenzaModal')
				.setTitle('Richiesta Assistenza');


			const message = new TextInputComponent()
				.setCustomId('assistenzaMessage')
				.setLabel("Descrivi qui in breve il tuo problema")
				.setStyle('PARAGRAPH')
				.setMinLength(config.assistenzaMinLength)
				.setPlaceholder('Bot Developed by Cescofran for DotBund')
				.setRequired(true);

			const Nick = new TextInputComponent()
				.setCustomId('assistenzaNick')
				.setLabel('Nickname')
				.setPlaceholder("Inserisci qui il tuo nickname in game")
				.setStyle('SHORT')
				.setRequired(true);

			const video = new TextInputComponent()
				.setCustomId('assistenzaVideo')
				.setLabel('Clip')
				.setPlaceholder('Inserisci qui i link alle tue clip ( conosigliato caricarle su streamable )')
				.setStyle('PARAGRAPH');
			const contentMessage = new MessageActionRow().addComponents(message);
			const contentNick = new MessageActionRow().addComponents(Nick);
			const contentVideo = new MessageActionRow().addComponents(video)
			modal.addComponents(contentNick, contentMessage, contentVideo);



			await interaction.showModal(modal);

		}

			if (!interaction.isModalSubmit()) {
				return;
			} else {

				const messageRow = interaction.fields.getTextInputValue('assistenzaMessage');
				const nickRow = interaction.fields.getTextInputValue('assistenzaNick');
				const videoRow = interaction.fields.getTextInputValue('assistenzaVideo');

				if (videoRow) {
					var assEmbed = await new Discord.MessageEmbed()
						.setColor(config.serverColorMain)
						.setTitle(interaction.guild.name + " Assistence system")
						.addField("**Nickname:**", "*``" + nickRow + "``*", true)
						.addField("**Discord: **", interaction.user.toString(), true)
						.addField("**Message:**", "*```" + messageRow + "```*", false) //true e fa rimanere sulla stessa linea le sezioni          
						.addField("**Link Video:**", "*" + videoRow + "*", false)
						.setThumbnail("https://media.discordapp.net/attachments/768387615908036628/988535192434118716/Martz90-Hex-Warning-1.png?width=230&height=230")
						.setFooter({
							text: `DotBund Services ©`,
							iconURL: "https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"
						})
						.setTimestamp();
				} else {
					var assEmbed = await new Discord.MessageEmbed()
						.setColor(config.serverColorMain)
						.setTitle(interaction.guild.name + " Assistence system")
						.addField("**Nickname:**", "*``" + nickRow + "``*", true)
						.addField("**Discord: **", interaction.user.toString(), true)
						.addField("**Message:**", "*```" + messageRow + "```*", false) //true e fa rimanere sulla stessa linea le sezioni          
						.setThumbnail("https://media.discordapp.net/attachments/768387615908036628/988535192434118716/Martz90-Hex-Warning-1.png?width=230&height=230")
						.setFooter({
							text: `DotBund Services ©`,
							iconURL: "https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"
						})
						.setTimestamp();
				}


				client.channels.cache.get(config.assistenza).send({
					content: "<@882256630211825736>",
					embeds: [assEmbed]
				})
				return interaction.reply({
					content: "Hai appena richiesto assistenza, non spammare. Entra in <#882256633076539465> e appena uno staff sarà disponibile ti aiuterà.",
					ephemeral: true
				})





			}

		}
	}
