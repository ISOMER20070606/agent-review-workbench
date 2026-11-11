const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function read(ext, p){ return fs.readFileSync(path.join(ext, p), 'utf8'); }
function inline(html, tag, content){ return html.replace(tag, function(){ return content; }); }

function buildHtml(context, webview){
  const ext = context.extensionPath;
  let html = read(ext, 'media/index.html');
  const mediaBase = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media')).toString();
  const imgScript = '<script>window.__IMG_BASE = ' + JSON.stringify(mediaBase + '/') + ';</script>';

  html = inline(html, '<link rel="stylesheet" href="core/app.css">', '<style>\n' + read(ext, 'media/core/app.css') + '\n</style>');
  html = inline(html, '<script src="core/app.js"></script>',
    imgScript + '\n<script>\n' + read(ext, 'media/core/app.js') + '\n</script>');

  const plugins = ['cases','calibration','stats','export','compare','guide'];
  for (const p of plugins) {
    html = inline(html, '<script src="plugins/' + p + '.js"></script>',
      '<script>\n' + read(ext, 'media/plugins/' + p + '.js') + '\n</script>');
  }
  return html;
}

function activate(context){
  context.subscriptions.push(vscode.commands.registerCommand('reviewWorkbench.open', function(){
    const panel = vscode.window.createWebviewPanel(
      'reviewWorkbench', '轨迹标注工作台', vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
      }
    );
    panel.webview.html = buildHtml(context, panel.webview);
  }));
}
exports.activate = activate;
function deactivate(){}
exports.deactivate = deactivate;
