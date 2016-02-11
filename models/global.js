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


var RequiredDocs = new Schema ({
    type: {type: String, required: true},
    desc: {type: String, required: false}
});

var Document  = new Schema({
    name: {type: String, required: false},
    time: {type: String, required: false},
    price: {type: String, required: false},
    req: [RequiredDocs]
});

var certScope = new Schema ({
   document: {type: String, required: true}
});

var Contact = new Schema ({
    name: {type: String, required: true},
    phone: {type: String, required: false},
    email: {type: String, required: false}
});

var Agent = new Schema ({
    id: {type: String, required: true},
    state: {type: Boolean, required: true, default: false},
    type: {type: String, required: false},
    docs: [Document],
    scope: [certScope],
    contacts: [Contact]
});

var AgentModel = mongoose.model('Agent', Agent);

module.exports.AgentModel = AgentModel;