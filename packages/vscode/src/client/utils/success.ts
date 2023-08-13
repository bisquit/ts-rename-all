import * as vscode from 'vscode';

export async function success() {
  vscode.window.showInformationMessage('Successfully renamed.');
}
