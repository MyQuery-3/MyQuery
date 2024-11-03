# MyQuery
This Project is SQL Grader
This repo is not mono repo becouse i cannot setup haha

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
Greader Setup
```bash
cd grader
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8787
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
```bash
# server
cd server
pip install -r ../grader/requirements.txt
python -m uvicorn main:app --reload --port 8888
or 
python -m grader.main
```
## Service Run
- grader port 8787
- website client 3000
- websit servee 8888