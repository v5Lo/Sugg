const mongoose = require('mongoose')

const suggestModel = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
    },
    suggestion: {
      type: String,
      required: true,
    },
  },
)

module.exports = mongoose.model('suggest', suggestModel);
