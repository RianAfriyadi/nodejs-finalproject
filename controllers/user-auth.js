const { getData, insertUser, deleteUser } = require("../models/user-auth")
const { generateToken } = require("../middlewares/jwt")
const md5 = require('md5');

class UserAuthController {

    static async Login(req, res) {
        const{username, password} = req.body
        const list = await getData()
        let found = null
        const xPassword = md5(password)
        list.forEach(itm => {
            if(found) {
                return
            }
            
            if(itm.user_name == username && itm.user_password == xPassword) {
                found = itm
            }
        });
        
        if(found) {
            const token = generateToken({
                id: found.id_user,
                username: username,
                password: xPassword
            })
            res.status(200).json({
                token: token
            });
        } else {
            res.status(401).json({
                message: "Invalid username or password"
            });
        }
        
    }

    static async Insert(req, res) {
        const{username, password} = req.body
        let errorMessage = null
        if(username && password) {
            const data = await insertUser({
                username: username,
                password: password
            });
            if(data) {
                res.status(200).json({
                    status: 0,
                    message: "successfuly",
                    data: data
                });
                return;
            } else {
                errorMessage = "failed inserting data user"
            }
        } else {
            errorMessage = "username or password is required"
        }
        res.status(200).json({
            status: 1,
            message: errorMessage
        });
    }

    static async Delete(req, res) {
        const{id} = req.params
        let errorMessage = null
        if(id) {
            const result = await deleteUser(id)
            if(result) {
                res.status(200).json({
                    status: 0,
                    message: "successfuly"
                });
                return;
            } else {
                errorMessage = "failed deleting data user"
            }
        } else {
            errorMessage = "id is required"
        }
        res.status(200).json({
            status: 1,
            message: errorMessage
        });
    }
}

module.exports = UserAuthController