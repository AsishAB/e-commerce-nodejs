const AuthMiddleware = require('../middlewares/AuthMiddleware');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

describe('Testing Auth Middleware', function() {
    it ('should throw an error if no Authorization Header is set', function() {
        const req = {
            get: function(headerName) {
                return null;
            } 
        }
        expect(AuthMiddleware.bind(this,req, {}, () => {})).to.throw('No Token Found! User is not authorized');
    });

    it('should throw an error if userId is NOT defined or missing', function() {
        const req = {
                    get: function(headerName) {
                        return "Bearer xyzudjnfkjbf;owe;o";
                    } 
                };
        sinon.stub(jwt,'verify');
        jwt.verify.returns({userId: 'abc'}); //sinon automatically adds stub       
        // jwt.verify = function() {
        //     return {userId: 'abc'};
        // }      
        AuthMiddleware(req, {}, () => {})  
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId','abc');
        jwt.verify.restore();
    });
    it('should throw an error if Auth Header is a single string', function() {
        const req = {
                    get: function(headerName) {
                        return "Bearer ";
                    } 
                }
        expect(AuthMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    
})
