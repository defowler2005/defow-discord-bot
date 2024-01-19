const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const embedBuild = require('../../../library/build/classes/embedBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs');

commandBuild.create(
    {
        name: 'userinfo',
        description: 'Check a specific user\'s info',
        is_staff: false,
    },
    (message, args) => {
        const targetUser =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.author;

        writeLog(`User ${message.author.tag} checked ${targetUser.tag} stats.`);

        new embedBuild().create(
            {
                setColor: '#FF6200',
                title: 'User Information',
                authorName: targetUser.username,
                authorIconURL: targetUser.avatarURL() || undefined,
                description: `Information about ${targetUser}`,
                fields: [
                    { name: 'ID', value: targetUser.id },
                    { name: 'Username', value: targetUser.username },
                    { name: 'Tag', value: targetUser.tag },
                    { name: 'Bot?', value: targetUser.bot ? 'Yes' : 'No', inline: true },
                    { name: 'Created At', value: targetUser.createdAt.toLocaleString(), inline: true },
                ],
                thumbnailURL: targetUser.avatarURL() || undefined,
                timestamp: Date.now(),
                footerText: 'User Info by defowler',
                footerIconURL: 'https://raw.githubusercontent.com/defowler2005/defowler2005/main/favicon.png',
            }, (embed) => {
                message.channel.send({ embeds: [embed] });
            }
        );
    }
);
