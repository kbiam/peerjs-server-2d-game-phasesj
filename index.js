const express = require('express')
const {ExpressPeerServer} = require('peer')
const http = require('http')
const cors = require('cors')


const app = new express()
const server = http.createServer(app)
app.use(cors({ origin: '*' }));

const peerServer = ExpressPeerServer(server,{
    debug:true,
    corsOptions:{
        origin: "*",
        methods: ["GET", "POST"]
    }
})


app.use('/peerjs',peerServer)

server.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});