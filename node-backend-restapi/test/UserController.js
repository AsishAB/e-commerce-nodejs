const sinon = require('sinon');
const User = require('../models/UserModel');
const expect = require('chai').expect;

const AuthController = require('../controllers/UserController');

describe("Auth Controller Testing", function() {
    it('should throw an error if database is inaccessbile', function(done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'node@gm.com',
                password: 'nodejs'
            }
        }
        AuthController.login(req, {}, () => {})
        .then(result => {
            //console.log(result);
            expect(result).to.be.an('error');
            expect(result).to.have.a('statusCode', 500);
            done(); //Required only for async function
        })
        User.findOne.restore();
    })
    


});