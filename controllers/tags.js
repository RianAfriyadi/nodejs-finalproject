const { addTag, removeTag } = require("../models/tags")
const { getNoteByID } = require("../models/notes")

class TagsController {

    static async AddTags(req, res) {
        const user = res.locals.user
        const{idNote, taggedUsers} = req.body
        let errorMessage = null
        if(idNote && taggedUsers && taggedUsers.length > 0) {
            const note = await getNoteByID(idNote)
            if(note && note.note_type == 2 && note.owner_id == user.id_user) {
                const tags = [];
                for(let i = 0; i < taggedUsers.length; i++) {
                    const result = await addTag({
                        idNote: idNote, idUser: taggedUsers[i]
                    });
                    if(result) {
                        tags.push({
                            id: result.id_tags,
                            status:0,
                            message: "successfuly"
                        });
                    } else {
                        tags.push({
                            status:1,
                            message: "failed create tag"
                        });
                    }
                }
                res.status(200).json({
                    status: 0,
                    message: "successfuly",
                    data: tags
                });
                return;
            } else {
                errorMessage = "Note not found ,or it's not shareable note, or it's not yours note"
            }
        } else {
            errorMessage = "idNote or taggedUsers is required"
        }
        res.status(200).json({
            status: 1,
            message: errorMessage
        });
    }

    static async RemoveTags(req, res) {
        const{id} = req.params
        let errorMessage = null
        if(id) {
            const result = await removeTag(id)
            if(result) {
                res.status(200).json({
                    status: 0,
                    message: "successfuly"
                });
                return;
            } else {
                errorMessage = "failed deleting tags"
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

module.exports = TagsController