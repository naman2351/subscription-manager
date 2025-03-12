CREATE DATABASE subscription_tracker;

USE subscription_tracker;

CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  recurring BOOLEAN NOT NULL
);
