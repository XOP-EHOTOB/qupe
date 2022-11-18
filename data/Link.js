const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true},
  to: {type: String, required: true, unique: true},
  code: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now},
  private: {type: Boolean},
  clicks: {type: Number, required: true, default: 0}
})

module.exports = model('Link', schema)