const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", async(req, res) => {
    try {
      const allMessages = await controller.getMessages();
      response.success(req, res, allMessages, 200);
    } catch (error) {
      response.error(req, res, error, 500, "Error getting messages");
    }
});

router.post("/", async (req, res) => {
  try {
    const body = await controller.addMessage(req.body.user, req.body.message);

    await response.success(req,res, 
        {
            error: null,
            body,
        },
        201
    );
    }
    catch (error) {
        console.error(`[POST/message]: ${error}`);
        await response.error(req,res, 
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
