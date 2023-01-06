const dbPG = require("../config/index")
const md5 = require('md5');

const getData = async () => {
    try {
        const query = await dbPG.query("select id_user, user_name, user_password from users")
        return query.rows
    } catch (error) {
        console.error(error)
        return []
    }
}

const insertUser = async (data) => {
    try {
        const query = await dbPG.query("insert into users (user_name, user_password) values ('"+data.username+"','"+md5(data.password)+"') returning id_user")
        return query.rows[0]
    } catch (error) {
        console.error(error)
        return null
    }
}

const deleteUser = async (id) => {
    try {
        await dbPG.query("delete from users where id_user = " + id)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const findByID = async (id) => {
    try {
        const query = await dbPG.query("select * from users where id_user = " + id)
        return query.rows[0]
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getData,
    insertUser,
    deleteUser,
    findByID
}