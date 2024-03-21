const fs = require('fs');
const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs');
const { guildId } = require('../../../library/build/config.json');

commandBuild.create(
    {
        name: 'clearallmessages',
        description: 'Clears every message in every channel and saves them to a messages.txt file.',
        is_staff: true,
    },
    async (message, args) => {
        try {
            const guild = message.client.guilds.cache.get(guildId);
            if (!guild) {
                console.error('Guild not found!');
                return;
            }

            // Debug logging
            console.log('Starting message retrieval process...');
            console.log(`Guild ID: ${guildId}`);

            // Fetch all text channels in the guild
            const channels = message.guild.channels.cache
            console.log(`Number of channels: ${channels.size}`);

            // Log channel names
            channels.forEach(channel => console.log(`Channel Name: ${channel.name}`));

            // Check if the file exists, if not, create it
            if (!fs.existsSync('./messages.txt')) {
                fs.writeFileSync('./messages.txt', '');
            }
            writeLog(`The clearallmessages command was used by owner user ${message.author.tag}`);

            channels.forEach(async (channel) => {
                // Log the name of the channel being processed
                console.log(`Processing channel: ${channel.name}`);
                try {
                    const messages = await channel.messages.fetch();
                    const messagesArray = messages.map(msg => `${msg.author.tag}: ${msg.content}`);
                    const channelName = channel.name;
                    fs.appendFileSync('./messages.txt', `#${channel.parent ? channel.parent.name + '/' : ''}${channelName}\n`);
                    fs.appendFileSync('./messages.txt', messagesArray.join('\n') + '\n\n');

                    // Log the number of messages fetched
                    console.log(`Fetched ${messages.size} messages from channel ${channel.name}`);
                } catch (error) {
                    console.error(`Error fetching messages from channel ${channel.name}: ${error}`);
                }
            });

            console.warn(`GuildId: ${guild.name} Number of channels: ${channels.size}`);
            let messageResult = 'All messages have been cleared and saved to messages.txt.'
            if (args[0] === 'delete') {
                messageResult = 'All messages have been cleared and saved to messages.txt and all messages have been deleted!'
            }
            return message.reply();
        } catch (error) {
            // Log any errors that occur during the process
            console.error(`Error: ${error}`);
        }
    }
);
