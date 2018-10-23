const Router = require('express-promise-router');
const router = new Router();
const { addRowToNewsletter } = require('../spreadsheets');

router.get('/', (req, res) => {});

router.post('/newsletter', async (req, res) => {
  const { name, mail } = req.body;

  try {
    const result = await addRowToNewsletter(name, mail);
    res.send({
      msg: `a new row with name:${result.name} and email:${
        result.mail
      } has successfully been added!`
    });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

router.post('/order', (req, res) => {});

router.post('/ambassador', (req, res) => {
  res.send({ msg: 'Recieved!' });
});

module.exports = router;
