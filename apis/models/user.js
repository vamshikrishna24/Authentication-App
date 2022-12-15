const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
  },
  bio: String,
  name: {
    type: String,
  },
  HashedPassword: {
    type: String,
    required: true,
  },
  OrignalPassword: {
    type: String,
    required: true,
  },
  phone: Number,
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("users", userSchema);
