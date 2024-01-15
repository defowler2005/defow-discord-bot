const fs = require('fs');
const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs');

commandBuild.create(
    {
        name: 'role',
        description: 'Add, Remove, Modify roles in the server',
        is_staff: true,
    },
    async (message, args) => {
        message.delete();

        // Check if the user is the owner or a staff member
        const isOwner = message.guild.ownerID === message.author.id;
        const isStaff = message.member.roles.cache.some(role => role.name === 'Staff'); // Adjust role name as needed

        if (!(isOwner || isStaff)) {
            return message.reply('You do not have permission to manage roles.');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to manage roles.');
        }

        const role = message.guild.roles.cache.find(role => role.name === args[1]);

        if (!role) {
            return message.reply('Role not found.');
        }

        // Check if the user has the same or higher permissions than the role they are trying to add
        if (isStaff && message.member.roles.highest.comparePositionTo(role) <= 0) {
            return message.reply('You cannot add a role with equal or higher permissions.');
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
            // Add more cases for other role-related subcommands if needed

            default:
                message.reply('Invalid subcommand. Usage: !role [add/remove/modify] [@member] [roleName]');
        }

        writeLog(`User ${message.author.tag} used the role command.`);
    }
);
