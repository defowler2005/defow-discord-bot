const fs = require('fs');
const path = require('path');

function writeLog(message) {
    const logFilePath = path.resolve(__dirname, '../../logs.log'); // Resolve the relative path
    const now = new Date();
    const formattedDate = now.toLocaleString('en-AU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    });

    const logMessage = `${formattedDate} - ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = writeLog;