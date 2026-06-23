---
id: 2265
title: "Build a Cybersecurity Home Lab on a Budget"
description: "How to set up a practical home lab for blue-team practice for under $200."
pubDate: 2024-06-02
updatedDate: 2025-02-10
category: "Home Lab"
tags: ["home-lab", "blue-team", "tools"]
# 画像hero検証用（youtube なし → heroImage を記事冒頭に表示）
heroImage: "../../assets/images/cyber/job-role/role-it-technician.webp"
# topReads 未指定 → 新着5件フォールバックを検証
---

> サンプル記事 / SAMPLE POST — id=2265 は SolutionDesign §4.2 の例（/blog/2265/）に対応。

A home lab is the fastest way to turn theory into skill. You'll learn more in a weekend of
breaking and fixing your own machines than in a month of passive video watching.

## Hardware options

You don't need a server rack. Start with what you have and grow from there.

### The single-laptop setup

You can start with a single machine and virtualization:

- A laptop with **16GB RAM** (8GB works, but it's tight)
- A hypervisor (VirtualBox / Hyper-V)
- 100GB of free disk for a couple of VMs

### When to add a mini PC

Once you're running three or more VMs at once, a cheap refurbished mini PC pays for itself in
saved frustration.

## Your first detections

Logs are where the learning happens. Start simple and build up.

```bash
# Tail auth logs for failed SSH logins
grep "Failed password" /var/log/auth.log | tail -n 20
```

Once that feels natural, forward those logs into a SIEM and build a dashboard.

## What to do next

1. Stand up a victim VM and an attacker VM
2. Run a noisy attack and watch the logs light up
3. Write a detection rule, then tune out the false positives

That loop — attack, detect, tune — is the whole job in miniature. That's enough to begin hunting.
