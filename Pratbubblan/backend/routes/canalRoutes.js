import express from 'express'

const router = express.Router()
router.use( express.json() )

router.get('/', (req,res) => {
    res.send('GET /api/users<br/> <h1>  CANALS success! </h1>')
})

export default router