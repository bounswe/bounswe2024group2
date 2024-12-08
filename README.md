# CMPE 352 Archive
Hello!
This is the repository for the CMPE451 - Group 2 project. We have moved the cmpe352 files to [archive](https://github.com/bounswe/bounswe2024group2/tree/archive-352) branch.

# Running the application locally


To run the backend in your local machine, follow the steps below. Make sure you have docker installed on your system. Also make sure that you can run docker compose command. Then follow these steps:

1. Pull the repository
2. Go into the project cd bounswe2024group2
3. docker compose build 
4. docker compose up -d

```
git clone https://github.com/bounswe/bounswe2024group2.git
cd bounswe2024group2
docker compose build
docker compose up -d
```

After that API, web, db and a local smtp configured in our system using mail hog. Any mail sent to visible 
on 8025 port of our localhost.

```
API is served on localhost:8000
WEB is served on localhost:3000
MAILHOG is served on localhost:8025
```
    
# Deployment on CSP

The application is deployed on Digital Ocean. To access application frontend simply go 

- WEB : 'http://159.223.28.163:30001/'

Similarly to view deployed api 
- API : 'http://159.223.28.163:30002/docs'

