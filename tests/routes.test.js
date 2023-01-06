// const request = require('supertest');
const UserAuthController = require('../controllers/user-auth');
const { generateToken, verifyToken } = require("../middlewares/jwt")

const mockRequest = (headers, body, params, query) => ({
    get(name) {
        if(name == "token") {
            return headers.token;
        }
        return null
    },
    body,
    params,
    query,
  });
  
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.locals = {};
    return res;
  };

  describe('User Test', () => {
    it('Test Login Valid', async () => {
        const req = mockRequest({},{
            username:"ADMIN",
            password:"ADMIN"
        });
        const res = mockResponse();
        await UserAuthController.Login(req, res);
        console.log(res.json)
        expect(res.status).toHaveBeenCalledWith(200);
      });
      it('Test Wrong Login', async () => {
        const req = mockRequest({},{
            username:"ADMIN",
            password:"12345"
        });
        const res = mockResponse();
        await UserAuthController.Login(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
      });
      it('Test JWT token', async () => {
        const payload = {
            username:"USER2",
            password:"USER2-PWD"
        }
        const token = generateToken(payload);
        const decoded = verifyToken(token);
        expect(decoded).toMatchObject(payload);
      });
  })