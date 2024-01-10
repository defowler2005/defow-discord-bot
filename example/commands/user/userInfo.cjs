const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const embedBuild = require('../../../library/build/classes/embedBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs')

commandBuild.create(
    {
        name: 'userinfo',
        description: 'Check a specific users info',
        is_staff: false,
    }, (message) => {
        const embed1 = new embedBuild();
        const embedInfo = {
            setColor: '#0099FF',
            title: 'Some title',
            url: 'https://discord.js.org/',
            authorName: 'Some name',
            authorIconURL: 'https://i.imgur.com/AfFp7pu.png',
            authorURL: 'https://discord.js.org',
            description: 'Some description here',
            thumbnailURL: 'https://i.imgur.com/AfFp7pu.png',
            fields: [
                { name: 'Regular field title', value: 'Some value here' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true }
            ],
            imageURL: 'https://i.imgur.com/AfFp7pu.png',
            timestamp: new Date(),
            footerText: 'Some footer text here',
            footerIconURL: 'https://i.imgur.com/AfFp7pu.png'
        };
        embed1.create(embedInfo, (embed) => {
            message.channel.send({ embeds: [embed] });
        })
    }
);