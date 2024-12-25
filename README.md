# Sample application "TASK MANAGER"

## Description
A sample 3-tier application built with Node.js, designed to demonstrate step-by-step containerization.

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

### 3. initial Setup postgresql 

```bash
sudo postgresql-setup --initdb
sudo systemctl enable --now postgresql
```

### 4. Configure remote connection to postgresql
### 5. restart postgresql server
### 6. Create database
### 7. Run nodejs application



