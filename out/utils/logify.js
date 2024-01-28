"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logify = void 0;
const vscode_1 = require("vscode");
const constants_1 = require("./constants");
const outputChannel = vscode_1.window.createOutputChannel(constants_1.OUTPUT_CHANNEL);
exports.logify = {
    info(message) {
        vscode_1.window.showInformationMessage(message, "OK", "Cancel");
        this.log(message);
    },
    warn(message) {
        vscode_1.window.showWarningMessage(message, "OK", "Details");
        this.log(message);
    },
    error(message) {
        vscode_1.window.showErrorMessage(message, "OK", "Details");
        this.log(message);
    },
    log(...args) {
        // Collect messages for logging
        const messages = [];
        for (const arg of args) {
            if (Array.isArray(arg) || typeof arg === 'object') {
                // Stringify arrays and objects using JSON.stringify
                messages.push(JSON.stringify(arg));
            }
            else {
                // Convert other types to strings using toString()
                messages.push(arg.toString());
            }
        }
        // Log the joined message to the Output Channel
        outputChannel.appendLine(messages.join(' '));
    }
};
//# sourceMappingURL=logify.js.map