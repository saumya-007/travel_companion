let conversationModel = require("../model/conversation-model")
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.addConversation = async function (req, res) {
    let conversation = new conversationModel({
        members: [req.body.senderId, req.body.receiverId],
        associatedTrip: new ObjectId(req.body.trip)
    })

    conversation.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add conversation",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "conversation added",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.getRequestedConversation = async function (req, res) {

    // console.log(req.params.userId)
    let query = await conversationModel.find({
        members: { $in: [req.params.userId] },
    }).populate({
        path: 'associatedTrip',
        populate: {
            path: 'startLocationCity'
        }
    }).populate({
        path: 'associatedTrip',
        populate: {
            path: 'endLocationCity'
        }
    }).exec()
    // console.log(query)
    try {
        res.json({
            msg: "conversation returned",
            status: 200,
            data: query,
        })
    } catch (err) {
        res.json({
            msg: "conversation not returned",
            status: -1,
            data: err,
        })
    }

}



