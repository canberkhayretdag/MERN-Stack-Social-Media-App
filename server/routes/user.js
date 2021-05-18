const router = require('express').Router();
const User = require('../model/User');
const checkauth = require('../helpers/checkauth')
const { emailValidation, passwordValidation } = require('../helpers/validation')
const jwt = require('jsonwebtoken');
const { async } = require('crypto-random-string');
const cryptoRandomString = require('crypto-random-string');
const Post = require('../model/Post');
const Follow = require('../model/Follow');
const multer = require('multer')
const bcrypt = require('bcryptjs');
const MessageBox = require('../model/MessageBox');
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'media');
    },
    filename: (req, file, cb) => {
        let rname = cryptoRandomString({length: 25, type: 'alphanumeric'})
        req.rname = rname
        cb(null, rname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        req.fileValidationError = 'mimetype error';
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');

router.get('/me', checkauth, async (req, res) => {
    const user = await User.findOne({_id: req.user._id})
    res.send({
        'user_id':user._id,
        'user_username': user.username
    })
})

router.get('/:username/posts', checkauth, async (req, res) => {
    const user = await User.findOne({username: req.params.username})
    if (!user) {
        res.send({ 'user': '0' })
    }

    const posts = await Post.find({user: user._id})
    res.send(posts.map(p => p.name))
})

router.get('/:username/conversation', checkauth, async (req, res) => {

    const visitedUser = await User.findOne({ username: req.params.username })

    if (!visitedUser) {
        res.sendStatus(404)
        return
    }

    const messageBox = await MessageBox.findOne({ $or: [
        { combinedName: visitedUser._id + req.user._id },
        { combinedName: req.user._id + visitedUser._id }
    ] })

    if (!messageBox) {
        res.send({ conversation: 0 })
        return
    }

    res.send({ conversation: messageBox.combinedName })

})

router.get('/settings', checkauth, async (req, res) => {
    const user = await User.findOne({_id: req.user._id})
    if (!user) {
        res.send({ 'user': '0' })
        return
    }
    res.send({
        username: user.username,
        name: user.name,
        bio: user.bio,
        image: user.image,
        email: user.email
    })
})

router.get('/:username', checkauth, async (req, res) => {

    const user = await User.findOne({username: req.params.username})
    

    if (!user) {
        res.send({
            'user': '0'
        })
        return
    }

    if (!req.token) {
        res.send({
            'user_id': user.id,
            'user_name': user.name,
            'user_username': user.username,
            'user_bio': user.bio,
            'user_type': user.type
        })
        return
    }


        if (req.user._id == user._id) {
            res.send({
                'user_id': user._id,
                'user_name': user.name,
                'user_username': user.username,
                'user_bio': user.bio,
                'user_type': user.type,
                'me': true
            })     
            return   
        }
        else {
            const messageBox = await MessageBox.findOne({ $or: [
                { combinedName: user._id + req.user._id },
                { combinedName: req.user._id + user._id }
            ] })

            if (!messageBox) {
                res.send({
                    'user_id': user._id,
                    'user_name': user.name,
                    'user_username': user.username,
                    'user_bio': user.bio,
                    'user_type': user.type,
                    'me': false,
                    'conversation': 0
                })                 
            } else {
                res.send({
                    'user_id': user._id,
                    'user_name': user.name,
                    'user_username': user.username,
                    'user_bio': user.bio,
                    'user_type': user.type,
                    'me': false,
                    'conversation': messageBox.combinedName
                })                 
            }
        }
})

router.post('/settings/profile', checkauth, async (req, res) => {

    upload(req,res,async(err) => {

        if(req.fileValidationError || err){
            res.json({type_error:1});
            return;
       }

       

    const user = await User.findOne({ _id: req.user._id })

    if (req.body.username) {
        const usernameExist = await User.findOne({ username: req.body.username })

        if (usernameExist && usernameExist.username != req.body.username) {
            res.send({ message: 'Bu kullanıcı adı zaten bulunmakta' })
            return
        }
        else {
            user.username = await req.body.username
        }
    }

    if (req.body.name) {
        user.name = await req.body.name
    }

    if (req.body.bio) {
        user.bio = await req.body.bio
    }

    if(req.file){
         if(user.image != 'default'){
            await unlinkAsync("media/" + user.image)
            user.image = await req.rname
         }
         else {
            user.image = await req.rname  
         }
    }
    console.log(user.image)
    const savedUser = await user.save()

    res.send({
        image: savedUser.image,
        name: savedUser.name,
        username: savedUser.username,
        bio: savedUser.bio
    })

    })
})

router.post('/settings/account', checkauth, async (req, res) => {

    const user = await User.findOne({ _id: req.user._id })
    console.log(req.body.reqData.email)
    const validPass = await bcrypt.compare(req.body.reqData.currentPassword, user.password)

    if (!validPass) {
        res.send({ error: "Hatalı şifre" })
        return
    }

    if (req.body.reqData.newPassword || req.body.reqData.newPassword2) {
        if (req.body.reqData.newPassword !== req.body.reqData.newPassword2) {
            res.send({ error: "Girilen şifreler uyuşmamaktadır" })
            return        
        }

        // validate here
        const err = passwordValidation(req.body.reqData.newPassword)

        if (err) {
            res.send({ error: "Bu şifre uygun değil" })
            return                  
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.reqData.newPassword, salt)
        user.password = hashedPassword        
    }

    if(req.body.reqData.email){
        const { err } = emailValidation(req.body.reqData.email)
        if (err) {
            res.send({ error: "Lütfen geçerli bir e-posta adresi girin" })
            return             
        }

        const emailExist = await User.findOne({ email: req.body.reqData.email })

        if (emailExist && emailExist._id != req.user._id) {
            res.send({ error: "Bu e-posta adresi kullanımda" })
            return            
        }

        user.email = req.body.reqData.email

    }    

    await user.save()

    res.send({
        success: 1
    })

})

router.get('/:username/following', checkauth, async (req, res) => {

    const visitedUser = await User.findOne({username: req.params.username})
    const visitorUser = await User.findOne({_id: req.user._id})

    if (!visitedUser || !visitorUser) {
        res.sendStatus(400)
        return
    }

    const follow = await Follow.findOne({follower: visitorUser._id, followed: visitedUser._id})

    if (!follow) {
        res.send({ 'result': false })
        return
    }

    res.send({ 'result': true })

})

router.post('/:username/follow', checkauth, async (req, res) => {
    
    const followedUser = await User.findOne({username: req.params.username})
    const followerUser = await User.findOne({_id: req.user._id})

    if (!followedUser || !followerUser) {
        res.sendStatus(400)
    }

    const followExist = await Follow.findOne({follower: followerUser._id, followed: followedUser._id})
    
    if (followExist) {
        res.send({ 'result': false })
        return
    }

    const follow = new Follow({
        follower: followerUser._id,
        followed: followedUser._id
    })

    try{
        const savedFollow = await follow.save()
    } catch (error) {
        res.sendStatus(400)
    }

    res.send({ 'result': true })

})


router.post('/:username/unfollow', checkauth, async (req, res) => {
    
    const followedUser = await User.findOne({username: req.params.username})
    const followerUser = await User.findOne({_id: req.user._id})

    if (!followedUser || !followerUser) {
        res.sendStatus(400)
        return
    }

    const followExist = await Follow.findOne({follower: followerUser._id, followed: followedUser._id})
    
    if (!followExist) {
        res.send({ 'result': false })
        return
    }

    try{
        const removedFollow = await Follow.deleteOne({follower: followerUser._id, followed: followedUser._id})
    } catch (error) {
        res.sendStatus(400)
    }

    res.send({ 'result': true })

})

router.get('/photographers', checkauth, async (req, res) => {

    const photographers = await User.find({ type: 2 }).limit(50)

    res.send(photographers)

})

module.exports = router;
