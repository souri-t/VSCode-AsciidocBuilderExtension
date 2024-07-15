// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "asciidocdocumentbuilder" is now active!');

	{
		const disposable = vscode.commands.registerCommand('asciidocdocumentbuilder.BuildDocumnent', () => {
			vscode.window.showInformationMessage('Build Documnent');

			// Execute Shell Command
			const { exec } = require('child_process');
			exec('npm run build', (err: any, stdout: any, stderr: any) => {

				if (err) {
					vscode.window.showErrorMessage("Failed to build document : " + err);
					return;
				}
				vscode.window.showInformationMessage("Success!");
			});
		});
		context.subscriptions.push(disposable);
	}

	{
		const disposable = vscode.commands.registerCommand('asciidocdocumentbuilder.ValidationText', () => {
			vscode.window.showInformationMessage('Check Text');

			// Execute Shell Command
			const { exec } = require('child_process');
			exec('npm run lint', (err: any, stdout: any, stderr: any) => {
	
				var textMessage = (err) ? err : stdout;
				const panel = vscode.window.createWebviewPanel(
					'result', 
					'result', 
					vscode.ViewColumn.One, 
					{}
				);
				
				panel.webview.html = createWebviewContent(textMessage);
			});

		});
		context.subscriptions.push(disposable);
	}
}


/**
 * Creates the content for a webview with the given message.
 * Replaces newline characters with HTML line breaks.
 * 
 * @param message - The message to be displayed in the webview.
 * @returns The HTML content for the webview.
 */
function createWebviewContent(message: string) {
	const formattedMessage = message.replace(/\n/g, "<br>");
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Validation Result</title>
	</head>
	<body>
		<h1>Validation Result</h1>
		<p>${formattedMessage}</p>
	</body>
	</html>`;
}
