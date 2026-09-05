const jsonServer = require('json-server')
const auth = require('json-server-auth')
const express = require('express')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.db = router.db

server.use((req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].startsWith('text/plain')) {
        req.headers['content-type'] = 'application/json'
    }
    
    next()

 })

const rules = jsonServer.rewriter(require('./routes.json'))
server.use(rules)

server.use(middlewares)

server.use(express.json({ type: () => true }))

server.use(auth)
server.use(router)

const port = process.env.PORT || 3001
server.listen(port, '0.0.0.0', () => {
    console.log(`JSON Server is running on port ${port}`)
})