const { insertNote, listMyNotes } = require("../models/notes")

class NoteController {

    static async ListMyNotes(req, res) {
        const user = res.locals.user
        const data = await listMyNotes(user.id_user)
        if(data.length > 0) {
            res.status(200).json({
                status: 1,
                message: "successfuly",
                data: data
            });
        } else {
            res.status(200).json({
                status: 1,
                message: "Not found"
            });
        }
    }

    static async Insert(req, res) {
        const user = res.locals.user
        const{title, description, note, type} = req.body
        let errorMessage = null
        if(title && type) {
            const data = await insertNote({
                title:title, 
                description:description, 
                note:note, 
                type:type, 
                ownerId:user.id_user
            });
            if(data) {
                res.status(200).json({
                    status: 0,
                    message: "successfuly",
                    data: data
                });
                return;
            } else {
                errorMessage = "failed inserting data note"
            }
        } else {
            errorMessage = "title or type is required"
        }
        res.status(200).json({
            status: 1,
            message: errorMessage
        });
    }
}

module.exports = NoteController