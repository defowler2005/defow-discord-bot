/**
 * A class for registering commands.
 * @class
 */

class commandBuilder {
    /**
     * The constructor for the commandBuilder class.
     * @constructor
     */
    constructor() {
        /**
         * The array to store all the commands.
         * @type {Array}
         */
        this.commands = [];
    }
    /**
     * Creates a new command and adds it to the list of commands.
     * @param {Object} info - The command information.
     * @param {String} info.name - The name of the command.
     * @param {String} info.description - The description of the command.
     * @param {Boolean} info.isStaff - Set's the permission for staff players.
     * @param {Array<String>} info.aliases - Like a 2nd command name for the command.
     * @param {Array<String>} info.usage - An array of strings describing different usages of the command.
     * @param {Array<String>} info.examples - An array of strings providing usage examples for the command.
     * @param {Function} callback - The callback function to execute when the command is invoked.
     */
    create(info, callback) {
        this.commands.push(
            {
                name: info.name.split(' ')[0],
                description: info.description,
                isStaff: info.isStaff || false,
                aliases: info.aliases,
                usage: info.usage,
                examples: info.examples,
                callback
            }
        );
    }

    getCommands(arg) {
        // Check if the argument is a boolean (0 or 1) indicating staff or non-staff commands
        if (typeof arg === 'boolean') {
            return this.commands.filter((cmd) => cmd.is_staff === arg);
        } else if (typeof arg === 'string') {
            // If the argument is a string, assume it's a command name and return the specific command
            const commandName = arg.toLowerCase();
            const command = this.commands.find((cmd) => cmd.name.toLowerCase() === commandName);
            return command ? [command] : [];
        } else {
            // If the argument is neither a boolean nor a string, return all commands
            return this.commands;
        }
    }

};

const commandBuild = new commandBuilder();

module.exports = commandBuild;