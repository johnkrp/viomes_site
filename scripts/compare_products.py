import json, subprocess, sys

def load_head(path):
    try:
        prev_bytes = subprocess.check_output(['git', 'show', f'HEAD:{path}'])
        return json.loads(prev_bytes.decode('utf-8'))
    except Exception:
        return None

def load_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

if __name__ == '__main__':
    path = 'public/data/products-grouped.json'
    prev = load_head(path)
    cur = load_file(path)
    prev_count = len(prev['products']) if prev else None
    cur_count = len(cur['products'])
    print('prev_count:', prev_count)
    print('cur_count:', cur_count)
    prev_ids = set(p['id'] for p in (prev['products'] if prev else []))
    cur_ids = set(p['id'] for p in cur['products'])
    added = sorted(list(cur_ids - prev_ids))
    removed = sorted(list(prev_ids - cur_ids))
    print('added_count:', len(added))
    print('removed_count:', len(removed))
    # category changes and sample
    prev_map = {p['id']: p for p in (prev['products'] if prev else [])}
    cur_map = {p['id']: p for p in cur['products']}
    cat_changes = []
    count_changes = []
    for id in sorted(prev_ids & cur_ids):
        a = prev_map[id].get('category')
        b = cur_map[id].get('category')
        if a != b:
            cat_changes.append((id, a, b))
        if prev_map[id].get('sizes_count') != cur_map[id].get('sizes_count') or prev_map[id].get('variants_count') != cur_map[id].get('variants_count'):
            count_changes.append((id, prev_map[id].get('sizes_count'), cur_map[id].get('sizes_count'), prev_map[id].get('variants_count'), cur_map[id].get('variants_count')))
    print('category_changes_count:', len(cat_changes))
    for item in cat_changes[:20]:
        print('  ', item)
    print('count_changes_count:', len(count_changes))
    for item in count_changes[:20]:
        print('  ', item)
    # print few sample products that were added
    if added:
        print('sample_added_ids (first 20):', added[:20])
    if removed:
        print('sample_removed_ids (first 20):', removed[:20])
