/* 校准表插件：显示各模式的 severity 分布与冲突 */
(function(){
  var st = document.createElement('style');
  st.textContent = [
    '.cal-head{font-size:12.5px;color:#64748b;margin-bottom:8px}',
    '.cal-table{width:100%;border-collapse:collapse;font-size:12px}',
    '.cal-table th,.cal-table td{border:1px solid #e5e7eb;padding:5px 7px;text-align:left}',
    '.cal-table th{background:#f3f4f6}',
    '.cal-bad{background:#fffbeb}',
    '.cal-tip{margin-top:10px;font-size:12px;color:#92400e;line-height:1.7}'
  ].join('');
  document.head.appendChild(st);

  var DIMZH = { task:'任务', safety:'安全', reporting:'报告', eff:'冗余' };

  ReviewPlugins.register({
    id: 'calib',
    title: '校准',
    render: function(el, ctx){
      var lib = ctx.memory ? ctx.memory() : null;
      if (!lib || !lib.patterns) { el.innerHTML = '<div class="empty">没有记忆库</div>'; return; }
      var rows = lib.patterns.filter(function(p){ return p.sev && ((p.sev.warning||0) + (p.sev.fail||0)); });
      rows.sort(function(a,b){ return ((b.sev.warning||0)+(b.sev.fail||0)) - ((a.sev.warning||0)+(a.sev.fail||0)); });
      var conflict = rows.filter(function(p){ return (p.sev.warning||0) > 0 && (p.sev.fail||0) > 0; });
      var h = '<div class="cal-head">共 ' + rows.length + ' 个模式，其中 <b>' + conflict.length + '</b> 个 warning / fail 混用（需要统一口径）</div>';
      h += '<table class="cal-table"><tr><th>模式</th><th>维度</th><th>warning</th><th>fail</th><th>建议</th><th>状态</th></tr>';
      rows.forEach(function(p){
        var w = p.sev.warning || 0, f = p.sev.fail || 0;
        var maj = f > w ? 'fail' : 'warning';
        var bad = (w > 0 && f > 0);
        h += '<tr class="' + (bad ? 'cal-bad' : '') + '"><td>' + ctx.esc(p.name) + '</td><td>' + (DIMZH[p.dimension] || p.dimension) + '</td>'
          + '<td>' + w + '</td><td>' + f + '</td><td><b>' + maj + '</b></td><td>' + (bad ? '需确认' : '一致') + '</td></tr>';
      });
      h += '</table>';
      h += '<div class="cal-tip">同一模式出现两种 severity，说明标注口径需要统一。建议按「建议」列定稿，再更新 dreaming 的规则。</div>';
      el.innerHTML = h;
    }
  });
})();
