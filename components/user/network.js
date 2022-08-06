const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", async(req, res) => {
    const filterUsers = req.query.name || null;
      try {
        const allUsers = await controller.getUsers(filterUsers);
        response.success(req, res, allUsers, 200);
      } catch (error) {
        response.error(req, res, error, 500, "Error getting users");
      }
  });

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(err => {
        response.error(req, res, 'Internal error', 500, err);
    });
});

module.exports = router;