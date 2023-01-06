const { databaseLocation } = require("../config/index")
const fs = require('fs');

const getData = () => {
    try {
        const data = fs.readFileSync(databaseLocation+'user-auth.json', 'utf8');
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const findByID = (id) => {
    const list = getData();
    for(let i = 0; i < list.length; i++) {
        if(id == list[i].id) {
            return list[i]
        }
    }
    return null
}

module.exports = {
    getData,
    findByID
}