const router = require('express').Router();
const Message = require('../model/Message');
const MessageBox = require('../model/MessageBox');
const checkauth = require('../helpers/checkauth');
const { async } = require('crypto-random-string');
const User = require('../model/User');
 


router.get('/inbox', checkauth, async (req, res) => {
    const messageBoxes = await MessageBox.find({ 
        $or: [
                { firstUser: req.user._id }, 
                { secondUser: req.user._id }
            ]
    })
    .populate({ path: 'lastMessage', populate: { path: 'sender', select: ['_id','username'] } }) // add profile image pat
    .exec()

    
    console.log(messageBoxes)
    res.send(messageBoxes)

})

router.get('/inbox/:inboxId', checkauth, async (req, res) => {

    const inbox = await MessageBox.findOne({ combinedName:  req.params.inboxId })

    if (!inbox) {
        res.send({'inbox':'0'})
        return
    }

    const messages = await Message.find({ messageBox:  inbox._id}).sort({ date: -1 }).exec()

    if (!messages) {
        messages = []
        res.send(messages)
        return
    }

    res.send(messages)

})

router.get('/inbox/:inboxId/with', checkauth, async (req, res) => {

    const inbox = await MessageBox.findOne({ combinedName: req.params.inboxId })

    if (!inbox) {
        res.send({'inbox':'0'})
        return
    }

    let searchId;

    if (inbox.combinedName.split('-')[0] == req.user._id) {
        searchId = inbox.combinedName.split('-')[1]
    } else {
        searchId = inbox.combinedName.split('-')[0]
    }

    const withChat = await User.findOne({ _id: searchId }).select('username')

    res.send({ 'chatWith': withChat.username })


})

router.post('/inbox/:inboxId/new', checkauth, async (req, res) => {

    const inboxId = await req.params.inboxId

    if (inboxId.split('-')[0] == req.user._id || inboxId.split('-')[1] == req.user._id) {

        const inbox = await MessageBox.findOne({ combinedName: inboxId })

        if (!inbox) {
            
            const newInbox = await new MessageBox({
                combinedName: inboxId,
                firstUser: inboxId.split('-')[0],
                secondUser: inboxId.split('-')[1]
            })

            const newMessage = await new Message({
                sender: req.user._id,
                content: req.body.message,
                messageBox: newInbox._id
            })

            newInbox.lastMessage = await newMessage._id

            await newInbox.save()
            await newMessage.save()    
            
            res.send({ success: 1 })

        }
        else {

            const newMessage = await new Message({
                sender: req.user._id,
                content: req.body.message,
                messageBox: inbox._id
            })

            inbox.lastMessage = await newMessage._id
            
            await inbox.save()
            await newMessage.save()   
            
            res.send({ success: 1 })
        }

    }
    else {
        res.sendStatus(404)
    }

})

router.post('/new', checkauth, async (req, res) => {
    const messageBox = await MessageBox.findOne({ 
        $or: [
                { firstUser: req.user._id }, 
                { secondUser: req.user._id }
            ]
    })

    if (messageBox) {
        
        const message = await new Message({
            sender: req.user._id,
            content: req.body.content,
            messageBox: messageBox._id
        })

        await message.save()

        messageBox.lastMessage = message._id

        res.send({ success: 1})


    } else {

        const newMessageBox = await new MessageBox({
            firstUser: req.user._id,
            secondUser: req.body.receiver
        })

        await newMessageBox.save()

        const message = await new Message({
            sender: req.user._id,
            content: req.body.content,      
            messageBox: newMessageBox._id
        })

        newMessageBox.lastMessage = message._id

        await newMessageBox.save()
        await message.save()

        res.send({ success: 0})
        
    }

    

})


/*

router.post('/new', async (req, res) => {

}

router.get('/:id', async (req, res) => {

}

router.get('/inbox', async (req, res) => {

}

*/

module.exports = router;