const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log(+new Date());
  next();
});

router.get('/', (req, res) => {
  console.log('/ req: ', req);
  res.send('get /');
})

router.get('/getfullp', (req, res) => {
  console.log('/getfullp req: ', req);
  res.send('get /getfullp');
})

module.exports = router;