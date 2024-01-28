import { window } from 'vscode';
import { OUTPUT_CHANNEL } from './constants';
const outputChannel = window.createOutputChannel(OUTPUT_CHANNEL);

export const logify = {
    info(message: string) {
        window.showInformationMessage(message, "OK", "Cancel");
        this.log(message);
    },
    warn(message: string) {
        window.showWarningMessage(message, "OK", "Details");
        this.log(message);
    },
    error(message: string) {
        window.showErrorMessage(message, "OK", "Details");
        this.log(message);
    },  
    log(...args: any[]) {
        // Collect messages for logging
        const messages = [];

        for (const arg of args) {
        if (Array.isArray(arg) || typeof arg === 'object') {
            // Stringify arrays and objects using JSON.stringify
            messages.push(JSON.stringify(arg));
        } else {
            // Convert other types to strings using toString()
            messages.push(arg.toString());
        }
        }

        // Log the joined message to the Output Channel
        outputChannel.appendLine(messages.join(' '));
    }
}