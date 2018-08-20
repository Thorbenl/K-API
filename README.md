# K-API
A small API which returns kpop artists, albums, etc.

Getting Started
---------------

```sh
# clone it
git@github.com:Thorbenl/K-API.git
cd K-API

# Install dependencies
npm install

# Start MongoDB

# Env Variables
Windows & Linux
SET jwtPrivateKey=hello

Mac
export jwtPrivateKey=hello

# Start server
npm run start

You now can use Postman or curl to make requests to:

# User

## Create a new user



	POST /api/user/


### Payload:

{
	"name": String, 
	"password": String,
	"email": String
}


# Artist

## Create a new Artist

  POST /api/artists/
  
  To be continues
