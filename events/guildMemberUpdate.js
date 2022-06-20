
module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        if (newMember.guild.id != config.guildId) return

        if (oldMember._roles != newMember._roles) {
            const fetchedLogs = await newMember.guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_ROLE_UPDATE',
            });

            const logs = fetchedLogs.entries.first();

            // if (logs.executor.bot) return
            if (new Date().getTime() - logs.createdAt > 10000) return

            if (logs.changes.find(x => x.key == "$add")) {
                var roles = ""
                logs.changes.find(x => x.key == "$add").new.forEach(element => {
                    roles += `${element.name}\r`
                });

                var embed = new Discord.MessageEmbed()
                    .setTitle(":inbox_tray: Role added :inbox_tray:")
                    .setColor("#00FF00")
                    .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
                    .addField("Role", `> Il ruolo: ${roles}> è stato aggiunto all'utente`)
                    .addField(":cowboy: **Admin:**", `${logs.executor.toString()} `, true)
                    .addField(":bust_in_silhouette: **Utente:**", `${newMember.user.toString()} `, true)
                    .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
                    .setTimestamp()
                    
                client.channels.cache.get(config.logStaff).send({ embeds: [embed] })
            }

            if (logs.changes.find(x => x.key == "$remove")) {
                var roles = ""
                logs.changes.find(x => x.key == "$remove").new.forEach(element => {
                    roles += `${element.name}\r`
                });

                var embed = new Discord.MessageEmbed()
                    .setTitle(":outbox_tray: Role removed :outbox_tray:")
                    .setColor("#FF0000")
                    .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
                    .addField("Role", `> Il ruolo: ${roles}> è stato rimosso dall'utente`)
                    .addField(":cowboy: **Admin:**", `${logs.executor.toString()} `, true)
                    .addField(":bust_in_silhouette: **Utente:**", `${newMember.user.toString()} `, true)
                    .setFooter({text: `DotBund Services ©`,iconURL:"https://media.discordapp.net/attachments/962372390426394705/975441422842998834/bozza.png?width=670&height=670"})
                    .setTimestamp()

                client.channels.cache.get(config.logStaff).send({ embeds: [embed] })
            }
        }
    }
}