let messageModel = require("../model/message-model")


module.exports.addMessage = async function (req, res) {
    message = new messageModel(req.body)
    await message.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to save message",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "message saved",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.getRequestedMessage = async function (req, res) {
    await messageModel.find({ conversationId: req.params.conversationId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to find messages",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "messages retrived",
                status: 200,
                data: success,
            })
        }
    }).clone()
}


