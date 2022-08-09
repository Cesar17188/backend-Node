const express = require("express");
const multer = require("multer");
const path = require('path');
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "public/files/",
  filename: (_req, file, cb)  => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage
})

router.get("/", async(req, res) => {
  const filterMessages = req.query.user || null;
    try {
      const allMessages = await controller.getMessages(filterMessages);
      response.success(req, res, allMessages, 200);
    } catch (error) {
      response.error(req, res, error, 500, "Error getting messages");
    }
});

router.post("/", upload.single('file'),  async (req, res) => {
  try {
    const body = await controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file);

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

router.patch('/:id', async(req, res)=> {
  await controller.updateMessage(req.params.id, req.body.message)
  .then((data) => {
    response.success(req, res, data, 200);
  })
  .catch(e => {
    response.error((req, res, 'Error interno', 500, e));
  });
});

router.delete('/:id', (req, res) => {
  controller.deleteMessage(req.params.id)
  .then(() => {
    response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
  })
  .catch(e => {
    response.error(req, res, 'Error interno', 500, e);
  });
});

module.exports = router;
