// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DOMAIN_CONTEXT, EXT_NAME, EXT_PREFFIX } from './utils/constants';
import { domainContextGenerator } from './services/domainContextGenerator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log(`${EXT_NAME} activated.`);
	console.log(`ext context absolute path: ${context.extensionPath}`)

	console.log(vscode.workspace.workspaceFolders);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Congratulations, your extension "${EXT_NAME}" is now active!`);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand(`${EXT_PREFFIX}helloWorld`, () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from Laravel Domain Context Generator!');
	// });

	// let generateDomainContext = vscode.commands.registerCommand(`${EXT_PREFFIX}domainContext12312`, async () => {

	// 	try {
	// 		const result = await vscode.window.showInputBox({
	// 			prompt: "Context:",
	// 			placeHolder: "e.g Posts, Comments, Products",
	// 		});
	// 		if (result) {
	// 			console.log("Your inputed is:", result);
	// 		}
	// 	} catch (error) {
	// 		vscode.window.showErrorMessage("Something went wrong");
	// 		console.log(error);
	// 	}
		
	// 	const items: vscode.QuickPickItem[] = [
	// 		{ label: "Item 1", description: "Description of Item 1" },
	// 		{ label: "Item 2", description: "Description of Item 2" },
	// 		// ... more items
	// 	];
	// 	const quickPick = vscode.window.createQuickPick();
	// 	quickPick.canSelectMany = true;
	// 	quickPick.items = items;

	// 	quickPick.onDidAccept(() => {
	// 		const selectedItems = quickPick.selectedItems;
	// 		if (selectedItems) {
	// 			console.log("Selected items:", selectedItems);
	// 		}
	// 		quickPick.hide();
	// 	});

	// 	quickPick.show();
	// });

	// context.subscriptions.push(generateDomainContext);
	// const domainContextGeneratorProviders = new DomainContextGeneratorProviders(context);
	// domainContextGeneratorProviders.boot();
	const baseExtPath: string = context.extensionPath;
	const domainContextGeneratorHandler = vscode.commands.registerCommand(`${EXT_PREFFIX}${DOMAIN_CONTEXT}`, ()=> {domainContextGenerator(baseExtPath)})
	context.subscriptions.push(domainContextGeneratorHandler)
}

// This method is called when your extension is deactivated
export function deactivate() {}
