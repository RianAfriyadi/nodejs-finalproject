const dbPG = require("../config/index")

const addTag = async ({idNote, idUser}) => {
    try {
        const query = await dbPG.query(`insert into note_user_tags (id_doc, id_user)
        values (${idNote},${idUser}) returning id_tags`)
        return query.rows[0]
    } catch (error) {
        console.error(error)
        return null
    }
}

const removeTag = async (idTag) => {
    try {
        await dbPG.query(`delete from note_user_tags where id_tags = ${idTag}`)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    addTag,
    removeTag
}