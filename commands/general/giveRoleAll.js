const {
    SlashCommandBuilder
  } = require('@discordjs/builders');

  module.exports = {
    name: "giveroleall",
    data: new SlashCommandBuilder()
      .setName('giveroleall')
      .setDescription('Assegno un ruolo ad ogni persona del server')
      .addRoleOption(option =>
        option.setName('ruolo')
        .setDescription('Menziona il ruolo che ogni utente riceverà')
        .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply({ephemeral: true});
        interaction.guild.members 
            .fetch()
            .then(user =>{
                
                  user.forEach( async account=>{ 
                        if(!account.bot){
                            account.roles.add(interaction.options.getRole('ruolo')).catch(error => {interaction.editReply("Non ho potuto assegnare: " + interaction.options.getRole('ruolo').toString() + " a tutti i membri del server")})
                        }
                        interaction.editReply("Ho assegnato: " + interaction.options.getRole('ruolo').toString() + " a tutti i membri del server")
                    })
                    
                        
                    
            })
            
            



       

    }
}
