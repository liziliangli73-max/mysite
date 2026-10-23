#!/usr/bin/env python3
# 每天挑一句，写入 daily/quote.json
import json
from datetime import datetime, timezone, timedelta

pool = json.load(open("daily/pool.json", encoding="utf-8"))
now = datetime.now(timezone(timedelta(hours=8)))
idx = now.date().toordinal() % len(pool)
q = pool[idx]

out = {
    "date": now.strftime("%Y-%m-%d"),
    "index": idx,
    "text": q["text"],
    "en": q.get("en", ""),
    "ja": q.get("ja", ""),
    "author": q["author"],
    "authorEn": q.get("authorEn", ""),
    "authorJa": q.get("authorJa", ""),
}
json.dump(out, open("daily/quote.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)
print(f"{out['date']}: {out['text']} —— {out['author']}")
