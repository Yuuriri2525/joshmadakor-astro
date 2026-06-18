---
id: 2265
title: "Build a Cybersecurity Home Lab on a Budget"
description: "How to set up a practical home lab for blue-team practice for under $200."
pubDate: 2024-06-02
updatedDate: 2025-02-10
tags: ["home-lab", "blue-team", "tools"]
---

> サンプル記事 / SAMPLE POST — id=2265 は SolutionDesign §4.2 の例（/blog/2265/）に対応。

A home lab is the fastest way to turn theory into skill.

## Hardware options

You can start with a single machine and virtualization:

- A laptop with 16GB RAM
- A hypervisor (VirtualBox / Hyper-V)

## Example detection rule

```bash
# Tail auth logs for failed SSH logins
grep "Failed password" /var/log/auth.log | tail -n 20
```

That's enough to begin hunting.
