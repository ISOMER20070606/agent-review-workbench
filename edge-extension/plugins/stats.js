/* 统计插件：评级分布 + findings 分布 */
(function(){
  var st = document.createElement('style');
  st.textContent = [
    '.st-row{display:flex;align-items:center;gap:8px;margin:6px 0;font-size:12.5px}',
    '.st-name{width:76px;color:#475569;flex:none}',
    '.st-bar{flex:1;height:14px;background:#f1f5f9;border-radius:4px;overflow:hidden;display:flex}',
    '.st-seg{height:100%}',
    '.st-num{width:34px;text-align:right;color:#64748b;flex:none}',
    '.st-title{font-size:13px;font-weight:600;margin:14px 0 6px;color:#111827}'
  ].join('');
  document.head.appendChild(st);

  var COLORS = { pass:'#059669', fail:'#b91c1c', warning:'#d97706', normal:'#059669', low:'#d97706', yes:'#d97706', no:'#059669', '—':'#cbd5e1' };

  ReviewPlugins.register({
    id: 'stats', title: '统计',
    render: function(el, ctx){
      var all = ctx.allState(), keys = Object.keys(all);
      if (!keys.length) { el.innerHTML = '<div class="empty">还没有标注数据</div>'; return; }
      var h = '<div style="font-size:12.5px;color:#64748b;margin-bottom:6px">已加载 ' + keys.length + ' 条标注</div>';
      ctx.dims.forEach(function(d){
        var cnt = {};
        keys.forEach(function(k){ var r = (all[k][d.key]||{}).rating || '—'; cnt[r] = (cnt[r]||0)+1; });
        var total = keys.length;
        h += '<div class="st-title">' + ctx.esc(d.label) + '</div>';
        var order = Object.keys(cnt).sort(function(a,b){ return cnt[b]-cnt[a]; });
        h += '<div class="st-row"><div class="st-name">分布</div><div class="st-bar">';
        order.forEach(function(r){
          var pct = cnt[r] / total * 100;
          h += '<div class="st-seg" style="width:' + pct.toFixed(1) + '%;background:' + (COLORS[r]||'#94a3b8') + '" title="' + r + ' ' + cnt[r] + '"></div>';
        });
        h += '</div><div class="st-num">' + total + '</div></div>';
        h += '<div style="font-size:11.5px;color:#64748b;margin-left:84px">' + order.map(function(r){ return r + ' ' + cnt[r]; }).join(' · ') + '</div>';
      });
      // findings 分布
      h += '<div class="st-title">findings 总数</div>';
      var rows = ctx.dims.map(function(d){
        var n = 0;
        keys.forEach(function(k){ n += ((all[k][d.key]||{}).findings||[]).length; });
        return { name:d.label, n:n };
      });
      var max = Math.max.apply(null, rows.map(function(r){ return r.n; })) || 1;
      rows.forEach(function(r){
        h += '<div class="st-row"><div class="st-name">' + ctx.esc(r.name) + '</div><div class="st-bar"><div class="st-seg" style="width:' + (r.n/max*100).toFixed(1) + '%;background:#2563eb"></div></div><div class="st-num">' + r.n + '</div></div>';
      });
      el.innerHTML = h;
    }
  });
})();
