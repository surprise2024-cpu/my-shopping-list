const jsonServer = require('json-server') // imports json-server
const auth = require('json-server-auth') // imports json-server-auth
const express = require('express') // imports express, so the server understands JSON request bodies
const path = require('path') // imports Node.js built-in path modules, builds file paths safely.
const cors = require('cors') // imports cors(cross-origin resource sharing), which controls which front end websites are allowed to communicate with the backend

const server = jsonServer.create()

// turns JSON file into API routes. 
// finds the db.json file and points to it
const router = jsonServer.router(path.join(__dirname, 'db.json'))

// creates json server default middleware, code that runs between receiving a request and sending a response.
const middlewares = jsonServer.defaults()

// Gives json-server-auth access to your database
server.db = router.db

// tells server to use cors(cross-origin resource sharing)
server.use(cors({
    // starts the list of frontend addresses allowed to commmunicate with the backend
    origin: [
        'http://localhost:5173',
        process.env.FRONTEND_URL
    ],

    // sends credentials between frontend and backend
    credentials: true
})) // Allow my local frontend and my deployed frontend to communicate with this backend

// creates pmy own middleware, all requests will pass through this function
server.use((req, res, next) => {
    if (req.headers['content-type'] && // prevents error if no content type exists
        req.headers['content-type'].startsWith('text/plain')
        // if the request has a content type, and that content type says text/plain, then do whats inside the if.
    ) {
        // turns text/plain to application/json
        req.headers['content-type'] = 'application/json'
    }
    
    // sends the request to the next checkpoint.
    next()

})

// loads my routes and allows me to rewrite them
const rules = jsonServer.rewriter(require('./routes.json'))
server.use(rules) // checks incoming URLs against my routes.json

server.use(middlewares)

server.use(express.json({ type: () => true }))

server.use(auth) // adds authentication to the server
server.use(router) // activates my db.jsonn  rest api

// if theres no environment PORT, use 3001
const port = process.env.PORT || 3001

// starts the server.
// 0.0.0.0 aalows the server to accept connnections from outside the local machine
server.listen(port, '0.0.0.0', () => { // runs after server successfuly starts
    console.log(`JSON Server is running on port ${port}`)
})

