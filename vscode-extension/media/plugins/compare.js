/* 对比插件：两条轨迹并排看评级 / findings */
(function(){
  var st = document.createElement('style');
  st.textContent = [
    '.cmp-head{display:flex;gap:8px;align-items:center;font-size:12.5px;margin-bottom:10px;flex-wrap:wrap}',
    '.cmp-head select{max-width:210px;font-size:12px}',
    '.cmp-table{width:100%;border-collapse:collapse;font-size:12px}',
    '.cmp-table th,.cmp-table td{border:1px solid #e5e7eb;padding:5px 7px;text-align:left;vertical-align:top}',
    '.cmp-table th{background:#f3f4f6}',
    '.cmp-diff{background:#fffbeb}',
    '.cmp-sec{margin:14px 0 6px;font-size:13px;font-weight:600;color:#111827}',
    '.cmp-f{font-size:11.5px;color:#64748b;line-height:1.6;margin:2px 0}'
  ].join('');
  document.head.appendChild(st);

  ReviewPlugins.register({
    id: 'compare', title: '对比',
    render: function(el, ctx){
      var trajs = ctx.allTrajs(), all = ctx.allState();
      if (trajs.length < 2) { el.innerHTML = '<div class="empty">至少加载两条轨迹才能对比</div>'; return; }
      var opts = trajs.map(function(t,i){ return '<option value="' + i + '">' + ctx.esc(t.label || t.id) + '</option>'; }).join('');
      el.innerHTML = '<div class="cmp-head">A <select data-k="a">' + opts + '</select> B <select data-k="b">' + opts + '</select></div><div data-body></div>';
      var a = el.querySelector('[data-k="a"]'), b = el.querySelector('[data-k="b"]'), body = el.querySelector('[data-body]');
      a.value = '0'; b.value = String(Math.min(1, trajs.length - 1));

      function findingsOf(s, d, n){
        var fs2 = ((s[d.key] || {}).findings || []);
        return fs2.slice(0, n).map(function(f){ return '<div class="cmp-f">#' + (f.step||'?') + ' ' + (f.severity||'') + ' — ' + ctx.esc(ctx.trunc(f.reason||'', 60)) + '</div>'; }).join('') || '<div class="cmp-f">—</div>';
      }
      function renderCmp(){
        var ta = trajs[Number(a.value)], tb = trajs[Number(b.value)];
        var sa = all[ta.id] || {}, sb = all[tb.id] || {};
        var h = '<table class="cmp-table"><tr><th>项</th><th>A</th><th>B</th></tr>';
        h += '<tr><td>步数 / 消息</td><td>' + (ta.messages||[]).length + '</td><td>' + (tb.messages||[]).length + '</td></tr>';
        ctx.dims.forEach(function(d){
          var ra = (sa[d.key]||{}).rating || '—', rb = (sb[d.key]||{}).rating || '—';
          h += '<tr class="' + (ra !== rb ? 'cmp-diff' : '') + '"><td>' + ctx.esc(d.label) + '</td><td><b>' + ctx.esc(ra) + '</b></td><td><b>' + ctx.esc(rb) + '</b></td></tr>';
        });
        var na = 0, nb = 0;
        ctx.dims.forEach(function(d){ na += ((sa[d.key]||{}).findings||[]).length; nb += ((sb[d.key]||{}).findings||[]).length; });
        h += '<tr><td>findings 总数</td><td>' + na + '</td><td>' + nb + '</td></tr></table>';
        h += '<div class="cmp-sec">A 的主要 findings</div>';
        ctx.dims.forEach(function(d){
          var fs2 = ((sa[d.key] || {}).findings || []);
          if (!fs2.length) return;
          h += '<div style="margin:4px 0"><b style="font-size:11.5px">' + ctx.esc(d.label) + '</b>' + findingsOf(sa, d, 2) + '</div>';
        });
        h += '<div class="cmp-sec">B 的主要 findings</div>';
        ctx.dims.forEach(function(d){
          var fs2 = ((sb[d.key] || {}).findings || []);
          if (!fs2.length) return;
          h += '<div style="margin:4px 0"><b style="font-size:11.5px">' + ctx.esc(d.label) + '</b>' + findingsOf(sb, d, 2) + '</div>';
        });
        body.innerHTML = h;
      }
      a.onchange = renderCmp; b.onchange = renderCmp; renderCmp();
    }
  });
})();
