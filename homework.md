Create a Repository
Initialize the repository
node_module, package.json, package-lock.json
install express
Create a server
Listen to port 7777
Write request handler for /test, /hello
Install nodemon and update scripts inside package.json What are dependencies
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

- JS object() vs JSON ( Diffrences)
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from end user
- User.findOne with duplicate email ID's, which object returned
- API - Get user by email
- API - Feed API - GET / feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Diffrence between patch and put
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schematype options from the documention
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in Schema
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanitizing - Add API validation for each field
- Install validator
- Explore validator library funcation and Use vlidator funcs for password, email, photoURL
- NEVER TRUST req.body

- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is encrypted password
- Create login API
- Compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile APi and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create e JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

///////////////////////////////////////////////////////////////////

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under repective routers (API md file)
- Read documentation for express.Router
- Create routes folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Make you validate all data in every POST, PATCH apis

- Create Connnection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- schema.pre("save") function
- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantage of creating?
- Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES

- Write code with proper validations for POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
- Create GET GET /user/connections

- Logic for GET /feed API
- Explore the $nin , $and, $ne and other query operatorators
- Pagination
