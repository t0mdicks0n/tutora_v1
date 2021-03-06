'use strict';
const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers').Questions;

router.route('/')
  .get(QuestionController.getAll)
  .post(QuestionController.postQuestion)
  ;

  
router.route('/online')
  .get(QuestionController.getOnlineQ)

router.route('/:id')
  .get(QuestionController.getOne)
  ;

router.route('/tag/:tagname')
  .get(QuestionController.getAllQbyTag)


router.route('/taglet/:tagletid')
  .get(QuestionController.getAllQbyTaglet)

router.route('/user/:id')
  .get(QuestionController.getUserQ)
  .post(QuestionController.updateUserQ)
  ;


router.route('/recommended/:profileid')
  .get(QuestionController.getRecommendedQ)

router.route('/addTagstoQ')
  .post(QuestionController.addTagstoQ)

router.route('/addTagletstoQ')
  .post(QuestionController.addTagletstoQ)




module.exports = router; 