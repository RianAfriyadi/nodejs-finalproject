const dbPG = require("../config/index")

const listMyNotes =  async (ownerId) => {
    try {
        const query = await dbPG.query(`select id_doc, title, description, note, note_type, created_date from notes where owner_id = ${ownerId}`)
        return query.rows
    } catch (error) {
        console.error(error)
        return []
    }
}
const insertNote = async ({title, description, note, type, ownerId}) => {
    try {
        const query = await dbPG.query(`insert into notes (title, description, note, note_type, created_date, owner_id)
        values ('${title}','${description}','${note}',${type}, current_timestamp, ${ownerId}) returning id_doc`)
        return query.rows[0]
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    insertNote,
    listMyNotes
}