# Sample application "TASK MANAGER"

## Description
A sample 3-tier application built with Node.js, designed to demonstrate step-by-step containerization.

## What is "TASK MANAGER" ?
"Task Manager" is a simple application for managing tasks.
Here are its key features:

Users can add new tasks with a due date.
Registered tasks are shared among all users.
Users can filter tasks by user ID to see only specific user tasks.
This application demonstrates a basic 3-tier architecture, making it ideal for learning about application development and containerization.

### Archtecture that works on single VM .
![Single Node Architecture](images/TaskManager-SingleMachineArch.png, "TaskManager-SingleMachineArch")

## Prerequirements
I tested this application on Fedora Server 41.
My environment is ...
- OS : Fedora release 41 (Forty One)
- CPU : 2 core 
- RAM : 4 GiB
- HDD : 20 GiB

** Provisioned by KVM **

## Setup

### 1. Clone this repository

```bash
git clone https://github.com/toaraki/taskmgr.git
```

### 2. Install rpm packages

```bash
sudo dnf install -y postgresql-server nodejs
```

### 3. Initial Setup postgresql 

```bash
sudo postgresql-setup --initdb
sudo systemctl enable --now postgresql
```

### 4. Configure remote connection to postgresql

Edit /var/lib/pgsql/data/pg_hba.conf

```text
# Change Method from "ident" to "trust"
local   all             all                                     trust
# Change Method from "ident" to "trust"
host    all             all             127.0.0.1/32            trust
# Add new entry for task_user like below
host    task_manager    task_user       127.0.0.1/32    md5
```

### 5. restart postgresql server

```
sudo systemctl restart postgresql.service
```

### 6. Create database

### 7. Run nodejs application



