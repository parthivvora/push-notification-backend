const adminModel = require("../models/admin.model");
const admin = require("../utils/firebase");

exports.saveToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;

    const isFcmToken = await adminModel.findOne({});

    if (isFcmToken) {
      await adminModel.updateOne({}, { fcmToken });
    } else {
      await adminModel.create({ fcmToken });
    }
    return res.status(200).json({
      status: true,
      message: "Token saved successfully",
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { title, body } = req.body;
    const adminToken = await adminModel.findOne({});

    const message = {
      notification: {
        title: "New Order Received",
        body: `${title}: ${body}`,
      },
      token: adminToken.fcmToken,
    };

    const result = await admin.messaging().send(message);
    return res.status(200).json({
      status: true,
      message: "Notification sent successfully",
      result,
    });
  } catch (error) {
    console.log("🚀 ~ exports.sendNotification= ~ error:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
