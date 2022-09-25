import chai from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../model/user-model.js';
import {dummyData} from '../data/userData.js';
import {app} from '../index.js';
import {
    STATUS_CODE_SUCCESS,
    STATUS_CODE_BAD_REQUEST,
    STATUS_CODE_CREATED,
} from '../common/constants.js';
import { 
    URL_LOGIN,
    URL_DELETE_USER,
    URL_CHANGE_PASSWORD, 
} from '../common/config.js';


// Configure chai
chai.use(chaiHttp)
chai.should()

describe("createUser", () => {
    describe('POST', () => {

    })   
})


describe('Login', function() {
    it('should add user', function(done) {
      chai.request(app)
          .post('/api/user')
          .send(dummyData[0])
          .end((error, result) => {
            console.log(dummyData[0])
            result.should.have.status(STATUS_CODE_CREATED);
            result.body.status.should.equal("success")
            result.body.message.should.equal(`Created new user ${dummyData[0].username} successfully!`);
            done();
        });
    }).timeout(10000);
  });