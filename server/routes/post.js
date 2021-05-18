const router = require('express').Router();
const multer = require('multer')
const maxSize = 2 * 1024 * 1024;
const path = require('path')
const cryptoRandomString = require('crypto-random-string');
const Post = require('../model/Post')
const checkauth = require('../helpers/checkauth');
const { async } = require('crypto-random-string');
const User = require('../model/User');
const Follow = require('../model/Follow');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'media');
    },
    filename: (req, file, cb) => {
        let rname = cryptoRandomString({length: 25, type: 'alphanumeric'})
        req.rname = rname
        console.log(req.rname)
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

router.post('/new', checkauth, async (req, res) => {
    upload(req,res,async(err) => {
        if(req.fileValidationError || err){
            res.json({success:0});
            return;
       }

       const post = new Post({
           name: req.rname,
           description: req.body.description,
           user: req.user._id
       })
       console.log(post)
       try {
       await post.save()
       //console.log(post)
       //console.log(req.user._id)
       const user = await User.findOne({ _id: req.user._id })
       //console.log(user)

       await user.posts.push(post._id)

       await user.save()
       res.send({success:1});
       }
       catch (err) {
            res.send({success:0});
       }
       /*

       console.log(req.rname + "asd")
       try {
            const savedPost = post.save()
            const user = User.findOne({_id: req.user._id})
            const pushedPost = user.posts.push(post)
            const result = pushedPost.save()
            res.send({success:1});
        } catch (error) {
            console.log(error)
            res.send({success:0});
        }*/
    })
})

router.get('/explore', checkauth, async (req, res) => {

    const photographers = await User.find({ type: 2 })

    const posts = await Post.find({ user: photographers.map(p => (p._id)) })
        .limit(50)
        .populate({ path: 'user', select: 'username' })
        .sort({date: 'descending'})
        .exec()

        res.send(posts.map(p => p.name))

})

router.get('/timeline', checkauth, async (req, res) => {

        const user = await User.findOne({_id: req.user._id})

        if (!user) {
            res.send({ 'result': false })
        }

        const followedList = await Follow.find({ follower: user._id })
        const posts = await Post.find({ user: followedList.map(p => (p.followed)) })
            .limit(50)
            .populate({ path: 'user', select: 'username' })
            .sort({date: 'descending'})
            .exec()

        //const likes = await Like.find({ user: posts.map(p => (p.user)) })
        //console.log(posts)
        /*
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'follows',
                   // localField: 'belongTo',
                   // foreignField: 'followed',
                    pipeline: [{ $match: { 'follower': user._id } }],
                    as: "testtt"
                },
                $lookup: {

                }
            }
        ])
        */
        //console.log(posts)
        //const followedList = await Follow.find({ follower: user._id })
        //const followedList = await Follow.find().populate({ path: 'users', match: {  } })
        //console.log(followedList)
        //const followedIds = followedList.map(p => (p.followed))
        //const posts = await Post.find({ belongTo: followedList.map(p => (p.followed)) }).limit(50)


        res.send(posts)
        //const posts = await Post.find()
})

// Post like and dislike functions here...
router.post('/:postName/like', checkauth, async (req, res) => {

    const post = await Post.findOne({ name: req.params.postName })
    const isFollower = await Follow.findOne({ follower: req.user._id, followed: post.user })

    if (!isFollower) {
        res.send({ success: 0})
        return
    }

    const likeExist = await post.likes.includes(req.user._id)
    if (likeExist) {
        res.send({ success: 0})
        return
    }


    try {
        await post.likes.push(req.user._id)
        await post.save()
    } catch (err) {
        res.send({ success: 0})
        return
    }
    
    res.send({ success: 1})

})

router.post('/:postName/dislike', checkauth, async (req, res) => {
    const post = await Post.findOne({ name: req.params.postName })
    const isFollower = await Follow.findOne({ follower: req.user._id, followed: post.user })

    if (!isFollower) {
        res.send({ success: 0})
        return
    }
    
    const likeExist = await post.likes.includes(req.user._id)
    if (!likeExist) {
        res.send({ success: 0})
        return
    }
    
    try {
        const idx = await post.likes.indexOf(req.user._id)
        await post.likes.splice(idx, 1)
        await post.save()
    } catch (err) {
        console.log(err)
        res.send({ success: 0})
        return
    }
    
    res.send({ success: 1})    

})

module.exports = router;
