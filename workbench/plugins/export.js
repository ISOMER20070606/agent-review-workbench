/* 导出插件：生成 Markdown 报告（当前轨迹 / 全部） */
(function(){
  function buildOne(ctx, t){
    var st = ctx.state(), lines = [];
    lines.push('# 标注报告：' + (t.label || t.id));
    lines.push('');
    lines.push('| 维度 | 评级 | findings |');
    lines.push('|---|---|---|');
    ctx.dims.forEach(function(d){
      var x = st[d.key] || {};
      lines.push('| ' + d.label + ' | ' + (x.rating || '—') + ' | ' + ((x.findings||[]).length) + ' |');
    });
    lines.push('');
    ctx.dims.forEach(function(d){
      var x = st[d.key] || {};
      if (!(x.findings||[]).length && !x.notes) return;
      lines.push('## ' + d.label + '（' + (x.rating || '—') + '）');
      (x.findings||[]).forEach(function(f){
        lines.push('- #' + (f.step||'?') + ' ' + (f.severity||'') + ' — ' + (f.reason||''));
      });
      if (x.notes) lines.push('', '> ' + x.notes);
      lines.push('');
    });
    return lines.join('\n');
  }
  function buildAll(ctx){
    var st = ctx.allState(), trajs = ctx.allTrajs(), lines = [];
    lines.push('# 全部标注汇总');
    lines.push('');
    lines.push('共 ' + Object.keys(st).length + ' 条');
    lines.push('');
    lines.push('| 轨迹 | 任务 | 安全 | 报告 | 冗余 | findings |');
    lines.push('|---|---|---|---|---|---|');
    Object.keys(st).forEach(function(k){
      var s = st[k], n = 0;
      ctx.dims.forEach(function(d){ n += ((s[d.key]||{}).findings||[]).length; });
      var t = trajs.filter(function(x){ return x.id === k; })[0];
      lines.push('| ' + (t ? (t.label || k) : k) + ' | ' + (s.task_completion_quality.rating||'—') + ' | ' + (s.safety_privacy.rating||'—') + ' | ' + (s.reporting_evaluation_integrity.rating||'—') + ' | ' + (s.execution_efficiency.rating||'—') + ' | ' + n + ' |');
    });
    return lines.join('\n');
  }
  ReviewPlugins.register({
    id: 'export', title: '导出',
    render: function(el, ctx){
      var t = ctx.traj();
      if (!t) { el.innerHTML = '<div class="empty">先加载轨迹</div>'; return; }
      var md = buildOne(ctx, t), all = buildAll(ctx);
      el.innerHTML = '<div style="font-size:12.5px;color:#64748b;margin-bottom:8px">当前轨迹的 Markdown 报告（可复制/下载）</div>'
        + '<textarea id="expTa" style="width:100%;height:300px;font-family:ui-monospace,Consolas,monospace;font-size:12px;box-sizing:border-box"></textarea>'
        + '<div style="margin-top:8px"><button class="btn" id="expDl">⬇ 下载 .md</button> <button class="btn" id="expCopy">复制</button>'
        + ' <button class="btn" id="expAll">⬇ 导出全部汇总</button></div>';
      var ta = el.querySelector('#expTa'); ta.value = md;
      el.querySelector('#expDl').onclick = function(){
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
        a.download = (t.label || 'report') + '.md';
        a.click();
      };
      el.querySelector('#expCopy').onclick = function(){
        ta.select();
        try { document.execCommand('copy'); } catch(e) {}
        try { navigator.clipboard.writeText(md); } catch(e) {}
      };
      el.querySelector('#expAll').onclick = function(){
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([all], { type: 'text/markdown' }));
        a.download = 'all-annotations.md';
        a.click();
      };
    }
  });
})();
