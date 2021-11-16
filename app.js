const express = require('express')
const app = express()
const port = 3000
const router = require('./router/index')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/', router)


app.listen(port, () => {
    console.log(`Berhasil running di port ${[port]}`);
})