---
id: 101
title: "Getting Started in Cybersecurity"
description: "A practical first step for breaking into cybersecurity without a degree."
pubDate: 2024-01-15
category: "Cybersecurity"
tags: ["cybersecurity", "career"]
# 動画hero検証用（記事ページは youtube を優先、カードのサムネは heroImage を使用）
youtube: "https://www.youtube.com/watch?v=RAEHt_sdxZo"
heroImage: "../../assets/images/cyber/job-role/role-soc-analyst.webp"
# Top 5 Reads を手動指定（この記事はフォールバックではなく明示リスト）
topReads: [2265, 88, 305, 412]
---

> サンプル記事 / SAMPLE POST — フェーズ4-4 テンプレート検証用。WordPress 移行（61件）で置き換える。

Breaking into cybersecurity feels intimidating, but it doesn't have to be. This post walks
through a realistic first 90 days — what to learn, what to build, and how to prove it.

## Why start now

The demand for entry-level analysts keeps growing. You don't need to know *everything* — you
need **momentum**. Small, consistent reps beat a giant plan you never finish.

### The mindset that works

Treat learning like training, not cramming. Show up daily, keep notes, and ship small projects
you can talk about in an interview.

## A simple 90-day plan

1. Learn the fundamentals (networking, operating systems, security basics)
2. Build a home lab and break things on purpose
3. Practice with real-world scenarios and write up what you found

### Tools you'll touch early

- A hypervisor (VirtualBox or Hyper-V)
- A SIEM to centralize logs
- A scripting language — PowerShell or Python

```bash
# Your first detection: failed SSH logins
grep "Failed password" /var/log/auth.log | tail -n 20
```

## Prove your skills

A portfolio beats a list of buzzwords. Document each lab on GitHub with screenshots and a short
write-up of the attack, the detection, and the fix.

> The best resume line isn't "familiar with SIEM" — it's "built a SIEM dashboard that caught X."

Ready to practice on a live environment? Check out the [Cyber Range](/cyber) for hands-on labs.
