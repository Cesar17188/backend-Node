const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();



router.get('/', (req, res) => {
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado",
    });
    response.success(req, res, 'Lista de mensajes');
});

router.post("/", async (req, res) => {
  try {
    const body = await controller.addMessage(req.body.user, req.body.message);
    
    await response.success(
      req,
      res,
      {
        error: null,
        body,
      },
      201
    );
  } catch (error) {
    console.error(`[POST/message]: ${error}`);
    await response.error(
      req,
      res,
      {
        error: "Internal Error Services",
        body: null,
      },
      500,
      "Es solo una simulación de los errores"
    );
  }
  
});

module.exports = router;