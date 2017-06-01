const models = require('../../db/models');
const Bookshelf = require('../../db/Bookshelf.js')

module.exports.getOne = (req, res) => {
	Bookshelf.getOneQuestion(req.params.id, function(error, result) {
		if (error) {
			console.log(error);
			return res.sendStatus(500);
		}
		return res.send(result);
	})
};

module.exports.getAll = (req, res) => {
	Bookshelf.getAllQuestions(function(error, result) {
		if (error) {
			console.log(error);
			return res.sendStatus(500);
		}
		return res.send(result);
	});
};

module.exports.getUserQ = (req, res) => {
	Bookshelf.getUserQuestions(req.params.id, function(error, result) {
		if (error) {
			console.log(error);
			return res.sendStatus(500);
		}
		return res.send(result);
	});
};

module.exports.postQuestion = (req, res) => {
	Bookshelf.saveQuestion(req.body.title, req.body.body, req.body.userid, req.body.image, function(error, result) {
		if (error) {
			return res.sendStatus(500);
			console.log(error);
		}
		return res.sendStatus(201);
		console.log('The question have been saved to DB, ', result);
	});
};