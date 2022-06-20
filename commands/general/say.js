const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
module.exports = {
  name: 'say',
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Converto il messagggio in un embed'),


  async execute(interaction) {
 
  }
  
}


 
