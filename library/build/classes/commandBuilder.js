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
        this.commands = [];
    }

    /**
     * Creates a new command and registers it.
     * @param {Object} info - Information about the command.
     * @param {string} info.name - The name of the command.
     * @param {boolean} [info.is_staff=false] - Indicates if the command is for staff only.
     * @param {string} [info.description=''] - A brief description of the command.
     * @param {Function} callback - The function to execute when the command is invoked.
     */
    create(info, callback) {
        const command = {
            name: info.name.split(' '),
            is_staff: info.is_staff || false,
            description: info.description || '',
            callback,
        };
        this.commands.push(command);
    }

    /**
     * Gets all registered commands based on staff status.
     * @param {Boolean} [is_staff=false] - Indicates if staff-only commands should be retrieved.
     * @returns {Array<Object>} - An array of commands.
     */
    getCommands(is_staff = false) {
        return this.commands.filter((cmd) => cmd.is_staff === is_staff);
    }
}

const commandBuild = new commandBuilder();

module.exports = commandBuild;