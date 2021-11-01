-- Tutorial how to init mySQL DB -- 

-- First step (HomeBrew) -- 
$ brew install mysql
$ brew services start mysql

-- Set password for mySQl --
$ mysql_secure_installation

Answer as the following: 
VALIDATE PASSWORD PLUGIN: no
When asked for a password I used: root (use whatever feels save)
Remove anonymous user: yes
Disallow root login from remote: yes
Remove the test database: yes
Reload privilege tables now: yes

-- Connect -- 
$ mysql -uroot -proot
-- u = user . p password --

-- CREATE DB use the command with utf8 in it. It’s considered best practice --
CREATE DATABASE `user_profile` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Connect to DB -- 
USE userprofile;

-- CREATE TABLE --
CREATE TABLE user (id INT AUTO_INCREMENT primary key NOT NULL, name VARCHAR(45), profile_image VARCHAR(100), job_title VARCHAR(45), description TEXT);

-- SHOW TABLE --
SHOW TABLES; 
DESCRIBE user;

-- ADD DATA -- 
INSERT INTO user (name) VALUES ('BL');

-- SHOW USER --
SELECT * FROM user;

-- UPDATE DATA -- 
UPDATE user SET job_title = 'Web Developer' WHERE name = 'BL';
UPDATE user SET description = 'Hi! I am BL. I am a web developer junior, i try to learn how to post image on database with express uploadFile and MySQL.' WHERE name = 'BL';

-- OR -- 
INSERT INTO `user` (`id`, `name`, `profile_image`, `job_title`, `description`) VALUES (NULL, 'BL', '', 'Web Developer', 'Hi! I am BL. I am a web developer junior, i try to learn how to post image on database with express uploadFile and MySQL.');

