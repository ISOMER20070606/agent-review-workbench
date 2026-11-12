# -*- coding: utf-8 -*-
"""compare.py — 把 agent 结果和人工标注对比，输出一致率。"""
import json, os, sys, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIMS = ['task', 'safety', 'report', 'eff']
FILES = {'task': 'task_completion_quality', 'safety': 'safety_privacy',
         'report': 'reporting_evaluation_integrity', 'eff': 'execution_efficiency'}

def human_map():
    m = {}
    for batch, sub in [('前批', '前批_标注'), ('新批3', '新批3_标注')]:
        for p in glob.glob(os.path.join(BASE, sub, '*_xzy*.json')):
            num = os.path.basename(p).split('_')[0]
            j = json.load(open(p, encoding='utf-8'))
            st = list(j.get('judgments', {}).values())[0]
            m['%s:%s' % (batch, num)] = {d: st[FILES[d]].get('rating') for d in DIMS}
            m['%s:%s' % (batch, num)]['findings'] = sum(len(st[FILES[d]].get('findings') or []) for d in DIMS)
    return m

def main(path):
    rows = json.load(open(path, encoding='utf-8'))
    hm = human_map()
    agree = {d: 0 for d in DIMS}
    total = 0
    mism = []
    for r in rows:
        h = hm.get('%s:%s' % (r['batch'], r['num']))
        if not h: continue
        total += 1
        for d in DIMS:
            if str(r[d]) == str(h[d]): agree[d] += 1
            else: mism.append('%s %s: agent=%s human=%s' % (r['num'], d, r[d], h[d]))
    out = {'total': total}
    for d in DIMS: out[d] = '%d/%d = %.1f%%' % (agree[d], total, 100.0*agree[d]/total)
    out['overall'] = '%d/%d = %.1f%%' % (sum(agree.values()), total*4, 100.0*sum(agree.values())/(total*4))
    out['findings_agent'] = sum(r['findings'] for r in rows)
    out['findings_human'] = sum(v['findings'] for v in hm.values())
    out['invalid'] = sum(r['invalid'] for r in rows)
    out['badq'] = sum(r['badq'] for r in rows)
    print(json.dumps(out, ensure_ascii=False, indent=1))
    print('\n不一致（前 20）:')
    for x in mism[:20]: print(' ', x)

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.join(BASE, 'agent', '_results_m2.json'))
