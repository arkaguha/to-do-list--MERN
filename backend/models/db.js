const mongoose = require("mongoose");

module.exports = mongoose.model(
  "List",
  mongoose.Schema(
    {
      completion_status: { type: Boolean, default: false },
      list_title: { type: String, required: true },
      list_content: { type: String, required: true },
      // user: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
    },
    { collection: "userlist" }
  )
);
