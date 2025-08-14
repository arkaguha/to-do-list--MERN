const mongoose = require("mongoose");

module.exports = mongoose.model(
  "List",
  mongoose.Schema(
    {
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
