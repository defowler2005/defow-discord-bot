const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');
const { token, guildId, clientId } = require('./library/build/config.json');
const commandBuild = require('./library/build/classes/commandBuilder.js');

const client = new Client(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessageReactions,
    ]
  }
);

(async () => {
  try {
    const slashCommands = [];
    const rest = new REST({ version: '10' }).setToken(token);
    const data = await rest.put(Routes.applicationCommands(clientId), { body: slashCommands });
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands });
    console.log(`Successfully reloaded ${data.length} (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', (data) => console.log(`Logged in as ${data.user.tag}!`));

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot || !message.content.startsWith('DF.')) return;
  const args = message.content.slice('DF.'.length).split(/\s+/g);
  const cmd = args.shift().toLowerCase();
  const commandList = commandBuild.commands.find((command) => command.name.includes(cmd));
  if (!commandList) return message.reply(`Invalid command!`);
  if (commandList.is_staff && !message.member.roles.cache.some((role) => role.id === '1181045218942926901')) return message.reply('Invalid permission!');
  commandList.callback(message, args);
});

client.login(token);

const fs = require('fs');

commandBuild.create(
  {
    name: 'prefix',
    description: 'Set the command prefix',
    is_staff: true
  }, (message, args) => {
    const filePath = './library/build/config.json';

    const newPrefix = args[0];

    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error('Error reading file:', error);
        return message.reply('An error occurred while reading the configuration file.');
      }

      const jsonData = JSON.parse(data);

      jsonData.chatCmdPrefix = newPrefix;

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return message.reply('An error occurred while updating the prefix.');
        }

        message.reply(`Chat command prefix updated to: ${newPrefix}`);
      });
    })
  }
);