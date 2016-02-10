var express = require('express');
var router = express.Router();
var AgentModel    = require('../models/global').AgentModel;

router.get('/', function(req, res) {
    var x;
    return AgentModel.find(function (err, agents) {
        if (!err) {
            x = agents;
            //return res.send(agents);
            res.render('index', {title: 'Test', agents: agents});
        } else {
            res.statusCode = 500;
            console.error('Internal error(%d): %s',res.statusCode,err.message);
            x = { error: "Server error"};
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/agents', function(req, res) {
    var agent = new AgentModel({
        id: req.body.id,
        state: req.body.state,
        type: req.body.type,
        documents: req.body.documents,
        scope: req.body.scope,
        contacts: req.body.contacts,
        requirements: req.body.requirements,
        deadlines: req.body.deadlines,
        pricing: req.body.pricing
    });

    agent.save(function (err) {
        if (!err) {
            console.info("agent created");
            return res.send({ status: 'OK', agent:agent });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            console.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

router.get('/agents/:id', function(req, res) {
    return AgentModel.findById(req.params.id, function (err, agent) {
        if(!agent) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            res.render('cart', {title: agent.id,
                id: agent.id,
                state: agent.state,
                type: agent.type,
                documents: agent.documents,
                scope: agent.scope,
                contacts: agent.contacts,
                requirements: agent.requirements,
                deadlines: agent.deadlines,
                pricing: agent.pricing
            });
            //return res.send({ status: 'OK', agent:agent });
        } else {
            res.statusCode = 500;
            console.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

router.put('/agents/:id', function (req, res){
    return AgentModel.findById(req.params.id, function (err, agent) {
        if(!agent) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        agent.id = req.body.id;
        agent.state = req.body.state;
        agent.type = req.body.type;
        agent.documents = req.body.documents;
        agent.scope = req.body.scope;
        agent.contacts = req.body.contacts;
        agent.requirements = req.body.requirements;
        agent.deadlines = req.body.deadlines;
        agent.pricing = req.body.pricing;
        return agent.save(function (err) {
            if (!err) {
                console.info("agent updated");
                return res.send({ status: 'OK', agent:agent });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                console.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

router.delete('/agents/:id', function (req, res){
    return AgentModel.findById(req.params.id, function (err, agent) {
        if(!agent) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return agent.remove(function (err) {
            if (!err) {
                console.info("article removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                console.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});


module.exports = router;