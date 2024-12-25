CREATE DATABASE task_manager;
CREATE USER task_user WITH PASSWORD 'secure_password';
\c task_manager
ALTER SCHEMA public OWNER TO task_user;  
GRANT USAGE, CREATE ON SCHEMA public TO task_user;  
GRANT ALL ON DATABASE task_manager TO task_user;  
\q

