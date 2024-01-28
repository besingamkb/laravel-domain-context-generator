"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const EXT_NAME = "laravel-domain-context-generator";
const EXT_PREFFIX = `${EXT_NAME}.`;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    console.log(`${EXT_NAME} activated.`);
    console.log(vscode.workspace.workspaceFolders);
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(`Congratulations, your extension "${EXT_NAME}" is now active!`);
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(`${EXT_PREFFIX}helloWorld`, () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Laravel Domain Context Generator!');
    });
    let generateDomainContext = vscode.commands.registerCommand(`${EXT_PREFFIX}domainContext`, async () => {
        try {
            const result = await vscode.window.showInputBox({
                prompt: "Context:",
                placeHolder: "e.g Posts, Comments, Products",
            });
            if (result) {
                console.log("Your inputed is:", result);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage("Something went wrong");
            console.log(error);
        }
        const items = [
            { label: "Item 1", description: "Description of Item 1" },
            { label: "Item 2", description: "Description of Item 2" },
            // ... more items
        ];
        const quickPick = vscode.window.createQuickPick();
        quickPick.canSelectMany = true;
        quickPick.items = items;
        quickPick.onDidAccept(() => {
            const selectedItems = quickPick.selectedItems;
            if (selectedItems) {
                console.log("Selected items:", selectedItems);
            }
            quickPick.hide();
        });
        quickPick.show();
    });
    context.subscriptions.push(generateDomainContext);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map