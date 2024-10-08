const fs = require('node:fs');
const { Client, GatewayIntentBits, Events, REST, Routes, MessageCollector } = require('discord.js');
const commandBuild = require('./library/build/classes/commandBuilder.cjs');
const { token, guildId, clientId } = require('./library/build/config.json');
require('./example/commands/staff/prefix.cjs');
require('./example/commands/staff/say.cjs');
require('./example/commands/user/ping.cjs');
require('./example/commands/user/help.cjs');
require('./example/commands/user/bump.cjs');
require('./example/commands/user/userInfo.cjs');

const client = new Client(
    {
        intents: [
            GatewayIntentBits?.AutoModerationConfiguration || 1048576,
            GatewayIntentBits?.AutoModerationExecution || 2097152,
            GatewayIntentBits?.DirectMessageReactions || 8192,
            GatewayIntentBits?.DirectMessageTyping || 16384,
            GatewayIntentBits?.DirectMessages || 4096,
            GatewayIntentBits?.GuildEmojisAndStickers || 8,
            GatewayIntentBits?.GuildInvites || 64,
            GatewayIntentBits?.GuildIntegrations || 16,
            GatewayIntentBits?.GuildMembers || 2,
            GatewayIntentBits?.GuildMessageReactions || 1024,
            GatewayIntentBits?.GuildMessages || 512,
            GatewayIntentBits?.GuildModeration || 4,
            GatewayIntentBits?.GuildPresences || 256,
            GatewayIntentBits?.GuildScheduledEvents || 65536,
            GatewayIntentBits?.GuildVoiceStates || 128,
            GatewayIntentBits?.GuildWebhooks || 32,
            GatewayIntentBits?.Guilds || 1,
            GatewayIntentBits?.MessageContent || 32768,
        ]
    }
);

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let data;
    try {
        /**
         * Array of slash command objects.
         * @type {Array<Object>}
         */

        const slashCommands = [{ name: 's', description: 's' }];
        if (slashCommands.length < 1) return;

        const data = await rest.put(Routes.applicationCommands(clientId), { body: slashCommands });
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands });
        console.log(`Successfully reloaded ${data.length} (/) commands.`);
    } catch (error) {
        console.error(`Error while registering ${data.length} (/) commands: ${error}\n${error.stack}`);
    };
});

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot === true) return;
    fs.readFile('./library/build/config.json', 'UTF8', async (_, data) => { //config.json here is read again as is because when the prefix is changed, The updated value is not reflected when the file is imported.
        const { chatCmdPrefix } = JSON.parse(data);
        if (!chatCmdPrefix) return message.reply('In the server side the chat command prefix is not defined in `config.json`');
        if (!message.content.startsWith(chatCmdPrefix)) return;
        const args = message.content.slice(chatCmdPrefix.length).split(/\s+/g);
        const cmd = args.shift().toLowerCase();
        const commandList = commandBuild.commands.find((command) => command.name.includes(cmd));
        if (!commandList) return message.reply(`Invalid command!`);
        if (commandList.is_staff && !message.member.roles.cache.some((role) => role.name === 'Staff')) return message.reply('Invalid permission!')
        commandList.callback(message, args);
    })
});

client.login(token);
module.exports = { client };