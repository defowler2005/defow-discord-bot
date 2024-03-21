import { EmbedBuilder, HexColorString } from 'discord.js';

/**
 * Represents an EmbedBuilder for easy embed creation.
 * @class
 */
declare class embedBuild {
    /**
     * The embed instance.
     * @type {EmbedBuilder}
     */
    embed: EmbedBuilder;

    /**
     * Creates an instance of embedBuilder.
     * @constructor
     */
    constructor();

    /**
     * Creates and customizes an embed using the provided information.
     * @param {Object} info - Information to customize the embed.
     * @param {HexColorString} info.setColor - Sets the color of the embed.
     * @param {string} info.title - Sets the title of the embed.
     * @param {string} [info.url] - Sets the URL of the embed.
     * @param {string} [info.authorName] - Sets the name of the author.
     * @param {string} [info.authorIconURL] - Sets the icon URL of the author.
     * @param {string} [info.authorURL] - Sets the URL of the author.
     * @param {string} [info.description] - Sets the description of the embed.
     * @param {string} [info.thumbnailURL] - Sets the thumbnail URL of the embed.
     * @param {Array<Object>} [info.fields] - An array of objects representing fields.
     * @param {string} [info.imageURL] - Sets the image URL of the embed.
     * @param {Date} [info.timestamp] - Sets the timestamp of the embed.
     * @param {string} [info.footerText] - Sets the text of the footer.
     * @param {string} [info.footerIconURL] - Sets the icon URL of the footer.
     * @param {Function} callback - Callback function to handle the built embed.
     * @returns {EmbedBuilder}
     */
    create(info: {
        setColor: HexColorString;
        title: string;
        url?: string;
        authorName?: string;
        authorIconURL?: string;
        authorURL?: string;
        description?: string;
        thumbnailURL?: string;
        fields?: Array<Object>;
        imageURL?: string;
        timestamp?: Date;
        footerText?: string;
        footerIconURL?: string;
    }, callback: (embed: EmbedBuilder) => void): EmbedBuilder;
}

export = embedBuild;
