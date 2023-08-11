import * as vscode from 'vscode';

export function success() {
  vscode.window.showInformationMessage('Successfully renamed.');
}
