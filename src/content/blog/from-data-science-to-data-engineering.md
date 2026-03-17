---
title: "What a Weather ETL Project Taught Me About Data Engineering"
description: "A reflection on using a small but complete ETL build to learn orchestration, observability, and operational thinking."
publishedAt: "2026-03-17"
featured: true
tags:
  - "data-engineering"
  - "python"
  - "prefect"
---
One of the fastest ways to learn a new engineering discipline is to build something that has to keep working after the first successful run.

That was the lesson behind my weather ETL pipeline. The code to fetch data was not the hardest part. The harder part was everything around it: retries, database connectivity, scheduling, Docker networking, and understanding what failed when services stopped talking to one another.

## What changed in my thinking

Data science projects often reward exploration. Data engineering projects reward reliability. That difference shows up immediately when you move from notebooks into pipelines.

I found myself paying more attention to:

- how secrets were managed
- how flow runs were monitored
- how failures recovered automatically
- how the same setup could be reproduced locally

## Why small projects are powerful

The ETL pipeline only handled one city and one weather feed, but that did not make it trivial. Small scope is useful because it keeps the learning surface focused while still exposing the real problems that larger systems face.

## What I would build next

The next natural steps are multi-city ingestion, deployment beyond local containers, and notifications when runs fail. But even in its current form, the project changed how I think about production-ready software.
