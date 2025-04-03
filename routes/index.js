const express = require("express");
const {
  saveToken,
  sendNotification,
} = require("../controllers/admin.controller");
const router = express.Router();

router.post("/save-token", saveToken);
router.post("/send-notification", sendNotification);

module.exports = router;
