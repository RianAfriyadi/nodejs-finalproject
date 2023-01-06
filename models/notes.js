const dbPG = require("../config/index")

const listMyNotes =  async (ownerId) => {
    try {
        const query = await dbPG.query(`
        select distinct n.id_doc, title, description, note, note_type, created_date, usr.user_name owner_name
        from notes n left join note_user_tags nut
        on n.id_doc = nut.id_doc left join users usr
        on usr.id_user = n.owner_id
        where n.owner_id = ${ownerId} 
        or coalesce(nut.id_user, 0) = ${ownerId}  
        `)
        return query.rows
    } catch (error) {
        console.error(error)
        return []
    }
}

const getNoteByID =  async (id) => {
    try {
        const query = await dbPG.query(`select title, description, note, note_type, owner_id from notes where id_doc = ${id}`)
        return query.rows[0]
    } catch (error) {
        console.error(error)
        return null
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
    listMyNotes,
    getNoteByID
}