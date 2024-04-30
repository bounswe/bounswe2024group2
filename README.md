# SemanticFlix - 2024 CMPE352 Group 2
![Icon](https://github.com/bounswe/bounswe2024group2/assets/36034222/30e12948-b3ba-45fa-bcd1-242041ee5821)

## 👋 Hello there! 

Welcome to the project repository of Group 2 in CMPE352 2024. Our team consists of students who are attending Bogazici University's CMPE352 Fundamentals of Software Engineering course. The wiki page of our repository can be found [here](https://github.com/bounswe/bounswe2024group2/wiki).

## 📋 About Project

Our project aims to create a platform that allows people to share their thoughts and comments about films, create film lists, and learn some information about films, actors, and directors by utilizing the power of the semantic web. 

## 👧👦 Team Members 
- [Halil İbrahim Kasapoğlu](https://github.com/bounswe/bounswe2024group2/wiki/Halil-%C4%B0brahim-Kasapo%C4%9Flu)

- [Rukiye Aslan](https://github.com/bounswe/bounswe2024group2/wiki/Rukiye-Aslan)

- [Kamil Deniz Coşkuner](https://github.com/bounswe/bounswe2024group2/wiki/Kamil-Deniz-Co%C5%9Fkuner)

- [Mahmut Buğra Mert](https://github.com/bounswe/bounswe2024group2/wiki/Mahmut-Bu%C4%9Fra-Mert)

- [İrem Nur Yıldırım](https://github.com/bounswe/bounswe2024group2/wiki/%C4%B0rem-Nur-Y%C4%B1ld%C4%B1r%C4%B1m-,-About)

- [Furkan Şenkal](https://github.com/bounswe/bounswe2024group2/wiki/Furkan-%C5%9Eenkal)

- [Muhammed Erkam Gökcepınar](https://github.com/bounswe/bounswe2024group2/wiki/Muhammed-Erkam-G%C3%B6kcep%C4%B1nar)

- [Osman Yasin Baştuğ](https://github.com/bounswe/bounswe2024group2/wiki/Yasin-Ba%C5%9Ftu%C4%9F)


## Project Status 

We have created our requirements about our project and it can be seen [here](https://github.com/bounswe/bounswe2024group2/wiki/Requirements).
Also the project plan, user scenarios and mockups can be accessed from the [wiki page](https://github.com/bounswe/bounswe2024group2/wiki).

## How to render and create diagrams 

For Use case diagram written in PlantUml, you can refer to below information to render and edit our puml file. I will also add a pdf version of the current file.

To change the use case diagram, you can use a docker image for plantuml server and further add/change features in your localhost.

To achieve this, run the commands in your terminal : 

  > docker pull plantuml/plantuml-server:tomcat  (you can use jetty as well as provider)

  > docker run -d -p 8080:8080 plantuml/plantuml-server:tomcat (run the image, change the first 8080 whatever port you want to use in local)

then open in your browser : http://localhost:8080 (or the port you choose)

You will see the PlantUml server and you can start editing the puml file of ours.

### Pre-requisites
Make sure you have docker installed in your local machine. If not, you can download it from [here](https://docs.docker.com/get-docker/). To check if you have docker installed, you can run the following command in your terminal:

```bash
docker --version
```

If you have docker installed, you should see the version of docker you have. If you don't see the version, you should install docker.


### Installation
1. Clone the repository:

```bash
 git clone https://github.com/bounswe/bounswe2024group2.git
```

2. Go into the project folder

```bash
cd bounswe2024group2
```

3. Build the docker images

```bash
docker-compose build
```

4. Run the docker containers

```bash
docker-compose up -d
```

With these commands, you will start the containers for backend, frontend and database. You can access the frontend from `http://localhost:3000` and the backend from `http://localhost:8020`. Database will be running on `localhost:3037`.

