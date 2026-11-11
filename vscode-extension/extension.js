const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function read(ext, p){ return fs.readFileSync(path.join(ext, p), 'utf8'); }
function inline(html, tag, content){ return html.replace(tag, function(){ return content; }); }

function buildHtml(context){
  const ext = context.extensionPath;
  let html = read(ext, 'media/index.html');
  html = inline(html, '<link rel="stylesheet" href="core/app.css">', '<style>\n' + read(ext, 'media/core/app.css') + '\n</style>');
  html = inline(html, '<script src="core/app.js"></script>', '<script>\n' + read(ext, 'media/core/app.js') + '\n</script>');
  html = inline(html, '<script src="plugins/cases.js"></script>', '<script>\n' + read(ext, 'media/plugins/cases.js') + '\n</script>');
  html = inline(html, '<script src="plugins/calibration.js"></script>', '<script>\n' + read(ext, 'media/plugins/calibration.js') + '\n</script>');
  return html;
}

function activate(context){
  context.subscriptions.push(vscode.commands.registerCommand('reviewWorkbench.open', function(){
    const panel = vscode.window.createWebviewPanel(
      'reviewWorkbench', '轨迹标注工作台', vscode.ViewColumn.One,
      { enableScripts: true, retainContextWhenHidden: true }
    );
    panel.webview.html = buildHtml(context);
  }));
}
exports.activate = activate;
function deactivate(){}
exports.deactivate = deactivate;
