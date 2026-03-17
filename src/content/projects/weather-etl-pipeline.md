---
title: "Weather ETL Pipeline"
summary: "An end-to-end ETL workflow that ingests weather data, transforms it, stores it in PostgreSQL, and runs on schedule through Prefect and Docker."
description: "Case study for a weather ETL pipeline built with Python, Supabase, Prefect 3, and Docker."
year: "2026"
role: "Data Engineering Project"
status: "Shipped locally with orchestration and monitoring"
featured: true
visibility: "public"
stack:
  - "Python"
  - "Prefect 3"
  - "Supabase"
  - "PostgreSQL"
  - "Docker"
  - "Pandas"
repoUrl: "https://github.com/kennyOlakunle/ETL_Weather_App"
documentUrl: "https://github.com/kennyOlakunle/ETL_Weather_App#readme"
---
## Overview

This project was built as a practical move from data science into data engineering. The goal was not just to fetch weather data once, but to create a workflow that could run every day, recover from issues, and remain understandable when something broke.

## Problem

I wanted a portfolio project that showed more than notebooks or isolated scripts. The system needed to demonstrate extraction, transformation, loading, scheduling, containerization, and monitoring in one believable workflow.

## What I built

- A Python ETL pipeline that pulls Bournemouth weather data from OpenWeatherMap
- Data transformation logic for cleanup, conversion, and quality checks
- Load steps into a Supabase PostgreSQL table
- Prefect tasks and flows for retries, logging, and scheduled execution
- Dockerized flow and worker setup for repeatable local deployment

## Technical decisions

I chose Prefect because it kept orchestration in Python and made retries and observability much easier to reason about than building a scheduler from scratch. Supabase gave me hosted PostgreSQL with fast setup, while Docker kept the environment reproducible across runs.

## Challenges

The hardest problems were operational rather than algorithmic:

- database connection issues caused by incorrect pooler modes
- changing Prefect deployment syntax
- Docker networking differences on macOS
- getting environment variables and service communication right across containers

Working through those issues made the project more valuable because it forced production-style debugging instead of happy-path scripting.

## Outcome

The result is a functioning local data pipeline that can run on schedule, persist data, and surface execution history through Prefect. It is a strong foundation for scaling into multi-city ingestion, cloud deployment, or alerting workflows.
