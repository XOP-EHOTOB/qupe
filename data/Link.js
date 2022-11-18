const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true},
  to: {type: String, required: true, unique: true},
  code: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now},
  private: {type: Boolean},
  clicks: [{ type: Types.ObjectId, ref: 'Click' }]
})

module.exports = model('Link', schema)