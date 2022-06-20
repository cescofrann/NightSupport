const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js')
module.exports = {
    name: 'ready',
    async execute(client) {


        console.log(".########...#######..########.########..##.....##.##....##.########.")
        console.log(".##.....##.##.....##....##....##.....##.##.....##.###...##.##.....##")
        console.log(".##.....##.##.....##....##....##.....##.##.....##.####..##.##.....##")
        console.log(".##.....##.##.....##....##....########..##.....##.##.##.##.##.....##")
        console.log(".##.....##.##.....##....##....##.....##.##.....##.##..####.##.....##")
        console.log(".##.....##.##.....##....##....##.....##.##.....##.##...###.##.....##")
        console.log(".########...#######.....##....########...#######..##....##.########.")

        console.log("\n\nAll Rights are reserved.\n\n\n\nBot Avviato correttamente")
        client.user.setPresence({ activities: [{ name: 'Helping our users' , type: 'WATCHING' }], status: 'dnd' });
        

        
        client.guilds.cache.forEach(guild => {
            client.commands.forEach(command => {
                guild.commands.create(command.data)
            })
        })

        

        
        },
    };