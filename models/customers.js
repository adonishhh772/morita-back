var mongoose = require('mongoose');
// Setup schema
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    password: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
      type: Date,
      default: '',
    },
    reply_email:{
      type:String,
      default: '',
    },
    gender: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    profile_photo:{
      type: String,
    },
    street: {
        type: String,
        default: '',
    },
    disability: {
        type: Boolean,
        default: false,
    },
    // passport_no: String,
    postal_code: {
        type: String,
        default: '',
    },
    blackList: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: '',
    },
    county:{
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    role:String,
    completed:{
        type:Boolean,
        default:false,
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    modified_date:{
        type:Date,
    }
});
// Export Contact model
var Contact = module.exports = mongoose.model('customers', contactSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}