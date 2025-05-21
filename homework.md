Create a Repository
Initialize the repository
node_module, package.json, package-lock.json
install express
Create a server
Listen to port 7777
Write request handler for /test, /hello
Install nodemon and update scripts inside package.jsonWhat are dependencies
What ais the use of "-g" while npm install
Diffrence between caret and tilda ( ^ vs ~)

- Intialize git
- .gitIgnore
- Creatre a remote repo on github.com
- Play with routes and route extenstions ex. /hello , / , hello/2 , /xyz
- Order of the routes matter a lot
- Deeply learn http method
- Install postman app and make workspace/collection > test API call
- Write logic to handle GET,POST,PATCH, DELETE API calls and test them to postman
- Explore routing and use of ?, +, (), \* inth routes
- use of regex in routes /a/, /.\*fly$
- Reding the query params in the routes
- Reading the dynmic routes

- Multiple Route Handlers - Play with Code
- next()
- next function and errors along with res.send()
- app.use(("/route, r1,[r2],r3,[r4,r5]))
- What is a middleware ? why do we need it
- How expres js basically handle request behind the scenenes.
- Diffrence between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dumy auth middlaware for all user routes except /user/login
- Error handling using app.use("/",(err,req,res,next) => {})

- Create free clustor on Mongodb official website (Mongo Atlas )
- Install Mongoose library
- Connect your application to teh Database "Connection-url"/devtinder
- call the connect DB function and connect to database before starting applocation on 7777
- Create a userSchema and user Model
- create a POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Hnadling using try , catch
