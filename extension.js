// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

// const applyFnToSelections = fn => {
//   if (vscode.window.activeTextEditor == null) {
//     vscode.window.showErrorMessage('Please Open up a File to Edit.');
//     return;
//   }

//   const editor = vscode.window.activeTextEditor;
//   console.log(vscode.Selection);
// //   const applyFnToSelection = (edit: vscode.TextEditorEdit) => (
// //     s: vscode.Selection
// //   ) => {
// //     if (s.isEmpty) return;
// //     const value = editor.document.getText(s);
// //     edit.replace(s, fn(value));
// //   };
// //   editor.edit(edit => {
// //     editor.selections.forEach(applyFnToSelection(edit));
// //   });
// };

/*
hex2solar("#fff");       // Output: "{ 1.00, 1.00, 1.00 }"
hex2solar("#ffff");      // Output: "{ 1.00, 1.00, 1.00, 1.00 }"
hex2solar("#ffffff");    // Output: "{ 1.00, 1.00, 1.00 }"
hex2solar("#ffffffff");  // Output: "{ 1.00, 1.00, 1.00, 1.00 }"
*/
function hex2solar(colorCode) {
  let remainder = '';
  if (colorCode.startsWith('#')) {
    colorCode = colorCode.substring(1);
  }

  // Find the index of the first non-hex character
  const nonHexIndex = colorCode.search(/[^0-9A-Fa-f]/);

  // Extract the hexadecimal substring before the first non-hex character
  if (nonHexIndex !== -1) {
    //  save the trail
    remainder = colorCode.substring(nonHexIndex);
    colorCode = colorCode.substring(0, nonHexIndex);
  }

  // Determine the number of pairs based on the length of the hexadecimal string
  let digitNb = colorCode.length;
  const step = (colorCode.length > 4) ? 2 : 1;
  const divisor = Math.pow(16, step) - 1.0;

  // Split the string into pairs of characters, up to 4 pairs
  let pairs = [];
  for (let i = 0; i < digitNb; i += step) {
      pairs.push((parseInt(colorCode.substring(i, i + step), 16) / divisor).toFixed(2));
  }
  return "{ " + pairs.join(", ") + " }" + remainder;
};


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.solar2dHex2NormalizedColor', () => {
		// The code you place here will be executed every time your command is executed
    vscode.window.showInformationMessage('Hello World!');

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No text editor is active.');
      return;
    }
    // Get the selection
    const selection = editor.selection;
    // Get the text within the selection
    const selectedText = editor.document.getText(selection);
    // Output the selected text to the console (or do whatever you want with it)
    convertedHex = hex2solar(selectedText)

    // Get the start and end positions of the selection
    const startPosition = selection.start;
    const endPosition = selection.end;

    // Replace the selected text with new text
    editor.edit(editBuilder => {
        editBuilder.replace(new vscode.Range(startPosition, endPosition), convertedHex);
    });

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}
