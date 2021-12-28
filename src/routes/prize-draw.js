const express = require('express');
const router = express.Router();

const prizeDrawController = require("../controllers/prizeDrawController");

router.post('/', prizeDrawController.post);

router.get('/', prizeDrawController.getAll);

router.get('/:id', prizeDrawController.getId);

router.put('/:id', prizeDrawController.put);

router.delete('/:id', prizeDrawController.delete);

module.exports = router;