import * as vscode from 'vscode';

export async function progress(startMessage: string, cb: () => Promise<void>) {
  await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: startMessage },
    async () => {
      await cb();
    },
  );
}
