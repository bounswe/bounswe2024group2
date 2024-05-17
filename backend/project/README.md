## Semanticflix Django Backend Application 

Welcome !

## Notes for developers 

### Before run 
Please first activate your virtual environment and then use 

> pip install -r requirements.txt 

to get the latest updates to your environment 

### Before push 

Ensure that you updated the requirements.txt with your feature's new dependencies 

Don't push docker-compose's data folder possibly called "mydb", it is in gitignore but if you pushed it before it can be still in staging area so use  

> git rm -rf < foldername >

before commiting your changes 


### About docker 

