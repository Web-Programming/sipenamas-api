var express = require('express');
var router = express.Router();
const {
    expressjwt: jwt
} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
})

//import controller
const ctrlPenelitian = require("../controllers/penelitian");
const ctrlPengabdian = require("../controllers/pengabdian");
const ctrlAuth = require('../controllers/authentication');
//routes penelitian
router.route('/penelitian')
    .get(ctrlPenelitian.penelitianShow) //tambahkan auth to fix it
    .post(auth, ctrlPenelitian.penelitianCreate);

router.route('/penelitian/:id')
    .get(auth, ctrlPenelitian.penelitianReadOne)
    .put(auth, ctrlPenelitian.penelitianUpdateOne)
    .delete(auth, ctrlPenelitian.penelitianDeleteOne);

// routes pengabdian
router.route('/pengabdian')
    .get(auth, ctrlPengabdian.pengabdianShow)
    .post(auth, ctrlPengabdian.pengabdianCreate);

router.route('/pengabdian/:id')
    .get(auth, ctrlPengabdian.pengabdianReadOne)
    .put(auth, ctrlPengabdian.pengabdianUpdateOne)
    .delete(auth, ctrlPengabdian.pengabdianDeleteOne);


router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
module.exports = router;