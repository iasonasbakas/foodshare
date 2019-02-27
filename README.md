# FoodShare Platform Implementation

<p align="center">
  <img width="230" height="168" src="http://foodshare.gr/img/ff.png">
</p>

###### *This repository depicts a platform conducted by 2 students of the [Department of Management Science and Technology](https://www.dept.aueb.gr/en/dmst) (DMST) of the Athens University of Economics and Business (AUEB), for the self-titled assignment implemented in the context of the course "Internet and Cloud Application Development", under the supervision of professor [Mr. Panagiotis Louridas](https://github.com/louridas).*

### *The Project Selection*
Currently we are building our own startup with the aid of the Athens Center of Entrepreunship and Innovation, called "FoodShare". This is why we decided to combine this assignment and start building our platform. In short terms, FoodShare is an incentivised peer-to-peer platform with the ultimate goal of reducing food waste. 

### *Main Features:*

* User's Authorization
* Animations & Front-end design materials
* Real-time posts
* Connection with back-end for image deployment
* Food search based on product you are searching for 
* User's Profile
* User's Communication - Messaging
* Donations - Payment API

### *Features on Progress:*

* Private Chat Messaging
* Real-time Location
* Clear connection in posting images between front and back-end
* Secure Payment
* Ratings 

### *Hosting Service*

Our project is currently hosted under [Okeanos](https://okeanos.grnet.gr/home/) which is GRNET's cloud service for the Greek Research and Academic Community.
A link redirecting to the development website can be found [here](https://snf-862057.vm.okeanos.grnet.gr/home). The production site is currently under contruction 
and can be found [here](http://foodshare.gr/).


# Installation


### *Linux Environment (Server Side)*


> First clone the repository to your local machine

```
git clone https://github.com/iasonasbakas/foodshare-assignment.git
```

> Navigate to directory

```
cd foodshare-assignment/server
```

> Install MySQL 

```
sudo apt-get install mysql-server
```

> Install python3 & pip3

```
sudo apt-get install python3
sudo apt-get install pip3
```

> Sync python & pip

```
alias python=python3
alias pip=pip3
```

> Initialize virtual environment

```
sudo apt install virtualenv
pip install virtualenv
source env/bin/activate
```

> Install Django Rest Framework & JWT

```
pip install django
pip install djangorestframework
pip install djangorestframework-jwt
pip install djangorestframework-simplejwt
```

> MySQL Deployment

###### *Execute commands as root*

```
sudo -i
pip install mysql-python
apt-get install python3-mysqldb libmysqlclient-dev python-dev
```

```
sudo apt-get install mysql-server
mysql -u root -p
```

###### *See site_config for password*


```
CREATE DATABASE djbr CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE USER 'root'@'localhost' IDENTIFIED BY 'djbr';

GRANT ALL PRIVILEGES ON djbr.* TO 'djbr'@'localhost';

FLUSH PRIVILEGES;
```

###### *or if possible straight-forward*

```
USE djbr;
```

> Apply Migrations


```
python manage.py makemigrations
python manage.py migrate
```

> Run Server 

```
python manage.py runserver
```


### *Linux Environment (Client Side)*


> Navigate to client directory

```
cd foodshare-assignment/client
```

> Install Packages

```
npm install
```

> Install Angular Command Line

```
npm install -g @angular/cli
ng config -g cli.warnings.versionMismatch false
```

> Run Client

```
ng serve
```


### *Linux Environment (Client Chat API)*


> Navigate to client directory

```
cd foodshare-assignment/client
```

> Run Client's Server

```
node server.js
```

##### Postscript:
###### *This repository was created for educational purposes.*
###### *We are very thankful to Okeanos that provides us with all the hosting services.*