const fs = require('fs');
const commandBuild = require('../../../library/build/classes/commandBuilder.js')

commandBuild.create(
    {
        name: 'prefix',
        description: 'Set the command prefix',
        is_staff: true,
    }, (message, args) => {
        if (!args[0]) {
            return message.reply('Please enter arguments.');
        }
        if (args[0].length > 6) {
            return message.reply('Invalid prefix. Prefix must not exceed 6 characters.');
        }

        fs.readFile('./library/build/config.json', 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading file:', error);
                return message.reply('An error occurred while reading the configuration file.');
            }

            const jsonData = JSON.parse(data);
            jsonData.chatCmdPrefix = args[0];

            fs.writeFile('./library/build/config.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return message.reply('An error occurred while updating the prefix.');
                }

                message.reply(`Chat command prefix updated to: ${args[0]}`);
            });
        });
    }
);