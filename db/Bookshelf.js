const Profile = require('./models/profiles.js');
const Question = require('./models/questions.js');
const Tags = require('./models/tags.js');
const Taglets = require('./models/taglets.js');
const Taglets_Question = require('./models/taglets_questions.js');

module.exports = {

	getUser : (userID, res) => {
		console.log(userID)
		Profile
		.where({id: userID}).fetch()
		.then(user => {
			res.send(user)
		})
	},

	updateProfile : (userID, userDescription, userAvatar, userType, userFirstName, userLastName, userPhone, callback) => {
		console.log(userID, userDescription, userAvatar, userType, userFirstName, userLastName, userPhone)
		Profile
		.where({ id: userID })
		.save({
			description : userDescription,
			avatar : userAvatar,
			type : userType,
			first : userFirstName,
			last : userLastName,
			phone : userPhone
		}, { method : 'update' })
		.then(doc => {
			console.log('SUCCESSFUL update of userProfile, status: ', doc);
			callback(null, doc);
		})
		.catch(error => {
			console.log('ERROR when trying to update userProfile, ', error);
			callback(error, null);
		})
	},

	saveQuestion : (qTitle, qBody, qId_profiles, qImage, qTag, qTaglets, callback) => {
		// select tag id
		// for each taglet, get taglet ids 
		// create new taglets 
		// insert into taglet_questions table 

		Tags.where({ value: qTag }).fetch({ columns: ['id'] })
		.then(tagid => {
			Question.forge({
				title : qTitle,
				body : qBody,
				profile_id : qId_profiles,
				image : qImage, 
				tag_id: tagid.id,
				tag_name: qTag
			})
			.save()
			.then(question => {
				qTaglets.forEach(function(taglet){
					var toProperCase = function(taglet){
						var firstletter = taglet.slice(0,1).toUpperCase()
						return firstletter+taglet.slice(1)	
					}

					var propercaseTaglet = toProperCase(taglet)

					Taglets.where({ value: propercaseTaglet }).fetch({columns: ['id']})
					.then(tagletinfo => {
						if (tagletinfo === null){
							return Taglets.forge({
								value: propercaseTaglet, 
								tag_id: question.attributes.tag_id
							}).save()
						} else {
							return tagletinfo
						}
					})
					.then(tagletinfo => {
						Taglets_Question.forge({ 
							taglet_id: tagletinfo.id, 
							question_id: question.id
						}).save()
					})
				})

				callback(null, question)
			})
		})
		.catch(error => {
			callback(error, null)
		})

		

	},

	getAllQuestions : (callback) => {
		Question.fetchAll()
		.then(questions => {
			callback(null, questions);
		})
		.catch(error => {
			callback(error, null);
		})
	},

	getOneQuestion : (questionID, callback) => {
		console.log("QUESTION", questionID);
		Question.where({ id : questionID }).fetch()
		.then(question => {
			callback(null, question);
		})
		.catch(error => {
			callback(error, null);
		})
	},

	getUserQuestions : (userID, callback) => {
		Question.where({ profile_id : userID }).fetchAll()
		.then(questions => {
			// console.log(questions, "QUESTIONS FROM GET")
			callback(null, questions);
		})
		.catch((error) => {
			callback(error, null);
		})
	}
}
