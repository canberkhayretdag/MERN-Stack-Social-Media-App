const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../helpers/validation')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

	// Check
	const { error } = registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message)
	}

	const emailExist = await User.findOne({email: req.body.email})

	if (emailExist) {
		return res.status(400).send('Email already exists')
	}

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	const user = new User({
    	name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        password: hashedPassword,
        username: req.body.username
    });

    try {
        const savedUser = await user.save()
        res.send(savedUser);
    } catch (err) {
        res.statusCode(400).send(err)
    }

});


router.post('/login', async (req, res) => {
    console.log(req.body)
	const { error } = await loginValidation(req.body);
	if(error){
        res.send({
            error: 1,
            message: 'Hata oluştu... Tekrar deneyin.'
        })
        return
	}

	
    const user = await User.findOne({email: req.body.email})        
    

	if(!user){
        res.send({
            error: 1,
            message: 'Email veya şifre hatalı'
        })
        return
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if(!validPass){
        res.send({
            error: 1,
            message: 'Email veya şifre hatalı'
        })
        return
    }

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
   
    res.send({
        token: token
    })

})



module.exports = router;
