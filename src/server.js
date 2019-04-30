const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('connectionRoom', box=> {
        socket.join(box);
    })
} );
mongoose.connect('[MBkey]', {
    useNewUrlParser: true,
    
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true})); //permite o envio de documentos pela URL- será necessário pois estaremos usando para o envio dos documentos
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));
app.use(require('./routes'));

server.listen(process.env.PORT || 3001);
