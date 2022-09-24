import chai from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../model/user-model.js';
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