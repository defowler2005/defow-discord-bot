const fs = require('fs');
const commandBuild = require('../../../library/build/classes/commandBuilder.cjs')
const writeLog = require('../../../library/utilities/writeLog.cjs')

commandBuild.create(
    {
        name: 'prefix',
        description: 'Set the command prefix',
        is_staff: true,
    }, (message, args) => {
        const newPrefix = args[0]
        if (!newPrefix) return message.reply('Please enter arguments.');
        if (newPrefix.length > 6) return message.reply('Invalid prefix. Prefix must not exceed 6 characters.');
        fs.readFile('./library/build/config.json', 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading file:', error);
                return message.reply('An error occurred while reading the configuration file.');
            }
            const jsonData = JSON.parse(data);
            jsonData.chatCmdPrefix = `${newPrefix}`;
            fs.writeFile('./library/build/config.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return message.reply('An error occurred while updating the prefix.');
                }; message.reply(`# Chat command prefix updated to: ` + '`' + newPrefix + '`');
                console.info(`Chat command prefix updated to: ${newPrefix}`)
                writeLog(`Chat command prefix updated to: ${newPrefix} by ${message.author.tag}`)
            })
        })
    }
);// https://nodejs.org/en