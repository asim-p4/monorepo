import express from 'express'
import cors from 'cors'
import test from './routes/test.js'

const app = express()

const PORT = process.env.PORT 

app.use(cors())
app.use(express.json())

app.use('/api', test)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})