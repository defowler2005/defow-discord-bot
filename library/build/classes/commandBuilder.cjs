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
        this.commands.push({
            name: info.name.split(' ')[0],
            description: info.description,
            isStaff: info.isStaff || false,
            aliases: info.aliases,
            usage: info.usage,
            examples: info.examples,
            callback
        });
    }

    /**
     * Gets all registered commands based on staff status.
     * @param {Boolean} [is_staff=false] - Indicates if staff-only commands should be retrieved.
     * @returns {Array<Object>} - An array of commands.
     */
    getCommands(is_staff = false) {
        return this.commands.filter((cmd) => cmd.is_staff === is_staff || false);
    }
};

const commandBuild = new commandBuilder();

module.exports = commandBuild;