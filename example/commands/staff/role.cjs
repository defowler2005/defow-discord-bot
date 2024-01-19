const client = require('../../../index.cjs');
const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs');

commandBuild.create(
    {
        name: 'role',
        description: 'Add, Remove, Modify roles in the server',
        is_staff: true,
    },
    async (message, args) => {
        // message.delete(); // Uncomment this line if you want to delete the user's command message

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to manage roles.');
        }

        const role = message.guild.roles.cache.find(role => role.name === args[1]);

        if (!role) {
            return message.reply('Role not found.');
        }

        const subcommand = args[0].toLowerCase();

        switch (subcommand) {
            case 'add':
                await member.roles.add(role);
                message.reply(`Added role ${role.name} to ${member.user.tag}`);
                break;
            case 'remove':
                await member.roles.remove(role);
                message.reply(`Removed role ${role.name} from ${member.user.tag}`);
                break;
            case 'list':
    const targetUser = message.mentions.users.first() || message.author;

    const member = message.guild.members.cache.get(targetUser.id);
    if (member) {
        const userRoles = member.roles.cache.map(role => role.name).join(', ');
        message.channel.send(`Roles of ${targetUser.tag}: ${userRoles}`);
    } else {
        message.reply('User not found in the server.');
    }
    break;

            default:
                message.reply('Invalid subcommand. Usage: !role [add/remove/modify/list] [@member] [roleName]');
        }

        writeLog(`User ${message.author.tag} used the role command.`);
    }
);
