const fs = require('fs');
const commandBuild = require('../../../library/build/classes/commandBuilder.cjs')
const writeLog = require('../../../library/utilities/writeLog.cjs')

commandBuild.create(
    {
        name: 'say',
        description: 'have the bot repeat a message',
        is_staff: true,
    }, (message, args) => {
        message.delete();
        writeLog(`User ${message.author.tag} used the say command: ${args.join(' ')}`)
        message.channel.send(`${args.join(' ')}`);
    }
);