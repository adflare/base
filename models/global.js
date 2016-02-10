var mongoose    = require('mongoose');

mongoose.connect('mongodb://root:certGroup@ds033255.mongolab.com:33255/agents');
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var Documents = new Schema({
    type: {type: String, required: true}
});

var certScope = new Schema ({
   document: {type: String, required: true}
});

var Contact = new Schema ({
    name: {type: String, required: true},
    phone: {type: String, required: false},
    email: {type: String, required: false}
});

var RequiredDocs = new Schema ({
    type: {type: String, required: true},
    desc: {type: String, required: false}
});

var Deadlines = new Schema ({
   doc: {type: String, required: true},
   deadline: {type: String, required: false}
});

var Pricing = new Schema ({
    doc: {type: String, required: true},
    price: {type: String, required: true}
});

var Agent = new Schema ({
    id: {type: String, required: true},
    state: {type: Boolean, required: true, default: false},
    type: {type: String, required: false},
    documents: [Documents],
    scope: [certScope],
    contacts: [Contact],
    requirements: [RequiredDocs],
    deadlines: [Deadlines],
    pricing: [Pricing]
});

var AgentModel = mongoose.model('Agent', Agent);

module.exports.AgentModel = AgentModel;