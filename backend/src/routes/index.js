const express = require('express');

const router = express.Router();

router.get('/hello', (req, res)=>{
    return res.json({
        "data": "U are in user route"
    })
})

module.exports = router;