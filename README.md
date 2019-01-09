# Strawberry Ice Cream 🍓 😁 🍦 😋 🍨

A POC using **_Docker_**, **_Sockets_**, **_Node.js_** and **_MongoDB_** on AWS.

![transformers](https://user-images.githubusercontent.com/15273233/50936689-957b8300-14d5-11e9-91d4-36030f72d003.gif)

## Installation 🤖
**(Local development)**

- Clone this repository
```
git clone https://github.com/devonChurch/strawberry-ice-cream.git
```

- Install project dependancies
```
npm install
```

- Tell [Webpack](https://webpack.github.io/) to run a *development* build on your local files and watch files for changes
```
npm run build:development
```

- Log into your AWS ECR account
[(Instructions)](http://docs.aws.amazon.com/cli/latest/reference/ecr/get-login.html)
```
aws ecr get-login
```

- Start up your Docker containers in *development* mode
```
docker-compose up --build
```

- Go to the exposed localhost port 80 in your [browser](http://localhost) to view the app running inside Docker

## Deployment ⚙
**(AWS production)**

- SSH into your EC2 instance
[(Instructions)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)
```
ssh -i ~/path-to-my-key/ecs.pem ec2-user@54.206.53.176
```

- Install git
```
sudo yum install -y git-all
```

- Clone this repository
```
git clone https://github.com/devonChurch/strawberry-ice-cream.git
```

- Install Docker
[(Instructions)](http://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-basics.html#install_docker)
```
sudo yum install -y docker
```

- Install Docker Compose
[(Instructions)](https://docs.docker.com/compose/install/)
```
curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

- Start up Docker in *production* mode inside of the root app directory
```
docker-compose -f docker-compose-production.yml up --build
```

- Find the Public DNS for your [EC2](https://aws.amazon.com/ec2/) instance to see the application running in your browser

## Add to database 📋
You can add Transformers characters at any time to a running app instance by hitting the *modify* end point. You will need to supply two key value pairs (a *name* string and an *isAutobot* boolean).

An example is outlined below:
```
http://localhost/bin/modify/?name=Bumblebee&isAutobot=true
```

Once data has been successfully added to the database all active users browser instances will be updated with the changes using [socket.io](http://socket.io/)

**Note:**
- You cannot create a character based on a name that already exists in the database.
- When the app first initialises we seed the database with a few Transformers for you to play with =)

## License 📜

MIT
