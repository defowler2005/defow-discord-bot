/**
 * A class for registering commands.
 * @class
 */
declare class commandBuilder {
    /**
     * The array to store all the commands.
     * @type {Array<Object>}
     */
    commands: Array<{
        name: string[];
        is_staff: boolean;
        description: string;
        command_type: number;
        usage: string;
        callback: Function;
    }>;

    /**
     * The constructor for the commandBuilder class.
     * @constructor
     */
    constructor();

    /**
     * Creates a new command and registers it.
     * @param {Object} info - Information about the command.
     * @param {String} info.name - The name of the command.
     * @param {Boolean} [info.is_staff=false] - Indicates if the command is for staff only.
     * @param {String} [info.description=''] - A brief description of the command.
     * @param {Number} info.command_type - Indicated whether the command is for use as 0: A chat command 1: A /command.
     * @param {String} [info.usage=''] - Information about how the command should be used.
     * @param {Function} callback - The function to execute when the command is invoked.
     */
    create(info: {
        name: string;
        is_staff?: boolean;
        description?: string;
        command_type: number;
        usage?: string;
    }, callback: Function): void;

    /**
     * Gets all registered commands based on staff status.
     * @param {Boolean} [is_staff=false] - Indicates if staff-only commands should be retrieved.
     * @returns {Array<Object>} - An array of commands.
     */
    getCommands(is_staff?: boolean): Array<Object>;
}

export = commandBuilder;
