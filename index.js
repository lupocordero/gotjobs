import express from 'express';
import {getJobs} from './services/notion.js'
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

app.get('/jobs/ux', async (req, res) => {
    const jobs = await getJobs.getUXJobs()
    res.json(jobs)
})

app.get('/jobs/wd', async (req, res) => {
    const jobs = await getJobs.getWDJobs()
    res.json(jobs)
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))