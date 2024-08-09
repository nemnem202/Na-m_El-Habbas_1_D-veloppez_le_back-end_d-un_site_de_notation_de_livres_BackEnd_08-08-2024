const http = require('http')

const server = http.createServer((req, res) => {
    res.end('Voilà laaaaa reeeeponse')
})

server.listen(process.env.PORT || 3000)