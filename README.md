# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  #   b a i g i a m a s i s * d a r b a s 
   
   #   b a i g i a m a s i s * d a r b a s 
   
     

# Introduction

Projektas kurtas siekiant ateityje vystyti 3D model marketplace arba 3D model portfolio, internetinę svetainę.

1. Installation process:

- Clone the Repository
  git clone https://github.com/AiridasJudzentis/baigiamasis_darbas.git
  cd baigiamasis_darbas

- Install NPM
  cd C:\Users\airid\Desktop\Baigiamas_darbas\baigiamasis_darbas
  npm install

- Create .env
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=3000

2. Software dependencies

Server
Node.js
Express.js
Mongoose
Cors
dotenv
JSON Web Token (JWT)
Client
React
Axios
React Router DOM
PropTypes

3. Latest releases

Date: 2024-06-24

4. API references

Create User
POST /signup

Example request:
{
"full_name": "John Doe",
"username": "johndoe",
"email": "john@example.com",
"password": "password123"
}

Sign In User
POST /signin

Example request:
{
"email": "john@example.com",
"password": "password123"
}

Get All Users
GET /users

Create Model
POST /models

Example request:
{
"title": "Model Title",
"price": 39.99,
"description": "Model Description",
"images": {
"featured": "featured-image-url.jpg",
"additional": ["image1.jpg", "image2.jpg"]
},
"technical_info": {
"triangles": 123456,
"vertices": 78910
},
"categories": ["Category1", "Category2"],
"author": "user_id",
"license": "Standard"
}

Get All Models
GET /models

Get Model by ID
GET /models/:id

Delete Model by ID
DELETE /models/:id

# Build

TODO: - Start the project
cd C:\Users\airid\Desktop\Baigiamas_darbas\baigiamasis_darbas
npm run start
