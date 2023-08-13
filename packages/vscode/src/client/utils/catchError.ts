import * as vscode from 'vscode';

export async function catchError(cb: () => Promise<void>) {
  try {
    await cb();
  } catch (e: unknown) {
    if (e instanceof Error) {
      vscode.window.showErrorMessage(e.message);
    }
  }
}
