CREATE TABLE task-tracker {
task_id ID INT,
    task_id INT PRIMARY KEY,
    task_title VARCHAR(255),
    date date,
    time VARCHAR(8),
    task_type VARCHAR(20),
    task_status VARCHAR(15),
    priority INT,
    location VARCHAR(255)
    }