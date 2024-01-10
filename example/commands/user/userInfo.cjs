const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const embedBuild = require('../../../library/build/classes/embedBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs')

commandBuild.create(
    {
        name: 'userinfo',
        description: 'Check a specific user\'s info',
        is_staff: false,
    }, (message, args) => {
        const targetUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        const embed1 = new embedBuild();
        const embedInfo = {
            setColor: '#FF6200',
            title: 'User Information',
            authorName: targetUser.username,
            authorIconURL: targetUser.avatarURL(),
            description: `Information about ${targetUser}`,
            fields: [
                { name: 'ID', value: targetUser.id },
                { name: 'Username', value: targetUser.username },
                { name: 'Tag', value: targetUser.tag },
                { name: 'Bot?', value: targetUser.bot ? 'Yes' : 'No', inline: true },
                { name: 'Created At', value: targetUser.createdAt.toLocaleString(), inline: true },
            ],
            thumbnailURL: targetUser.avatarURL(),
            timestamp: new Date().toISOString(),
            footerText: 'User Info by defowler',
            footerIconURL: 'https://i.imgur.com/AfFp7pu.png'
        };

        embed1.create(embedInfo, (embed) => {
            message.channel.send({ embeds: [embed] });
        })
    }
);