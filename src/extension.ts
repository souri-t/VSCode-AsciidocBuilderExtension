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
					console.error(err);
					return;
				}
				console.log(stdout);
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
				if (err) {
					console.error(err);
					return;
				}
				console.log(stdout);
			});
		});
		context.subscriptions.push(disposable);
	}
}
