const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
module.exports = {
  name: 'say',
  data: new SlashCommandBuilder()
    .setName('assistenza')
    .setDescription('Per richiedere assistenza fai questo comando'),


  async execute(interaction) {
 
  }
  
}


 
