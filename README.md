# Git Repository link

https://github.com/vishalwandile04/nestJs-mongodb

# REST api to CRUD ING ATMs

Application Features:

* Create the ING's ATM
* Update the existing ATM
* Delete the ATM record
* List all ATM records
* Get single ING ATM record

## How to build and deploy application

Installation:
```text
npm install 
```

Command to run application locally:

```text
npm run start:dev
```

Command to build application:

```text
npm run build  
```

Command to deploy application on google cloud:

```text
npm run deploy  
```

### Technology stack

* NodeJs
* NestJs
* MongoDB

## Flow 

Login by auth/login api - with request data :
{
    "username":"",
    "password":"",
}
 in response will get access token to access other APIs.


## Swagger UI

http://localhost:3000/api/#/
