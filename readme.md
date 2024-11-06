# MyQuery

## Introduction
โปรเจคนี้เป็น Full-Stack Application ที่ใช้ **Next.js** สำหรับ Frontend และ **FastAPI** สำหรับ Backend 
โดยการเชื่อมต่อระหว่างกันผ่าน API endpoints ซึ่งให้บริการโดย FastAPI.

## Stack
- Main website
    - Frontend (Next JS)
    - Backend (Fast API)
    - Database (Postgres)
- Grader 
    - Backend (Fast API)
    - Main Database (Postgres)
    - Database for run test (sqlite)

## Setup and Run Project
Grader Setup
```bash
cd grader
pip install -r requirements.txt
python -m grader.main
```
Main Website setup
```bash
cd website
# if do not install js runtime
# windows
powershell -c "irm bun.sh/install.ps1|iex"
# mac
curl -fsSL https://bun.sh/install | bash
```
```bash
# client
cd client
bun install
bun dev
```
## Service Run
- grader port 8787
- website client 3000