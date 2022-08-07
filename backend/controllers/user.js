const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash,
                role: 0,
            })
            user.save()
                .then((reponse) =>{
                    console.log('Utilisateur créé !')
                    return res.status(201).json({ 
                        ...reponse
                        , message: 'Utilisateur créé !'
                        , token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => {
                    res.status(400).json({ error })
                })
        })
        .catch(error => res.status(500).json({ error }))
}


exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username || "" })
        .then(user => {
            console.log(user)
            if (!user) {
                console.log('Utilisateur non identifié')
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log('Utilisateur identifié')
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        role: user.role,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                        ,liked: user.liked
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.logout = (req, res, next) => {
    
}
exports.updateRole = (req, res, next) => {
    
    User.findOne({username: req.params.id})
        .then((user) => {
            console.log(user);
            user.role = req.params.value
            console.log(req.body);
            console.log(req.params.id);
            console.log(req.params.value);
            console.log(user);
            // let changeRoleUser = new User({username:user.username,password:user.password, role: 2})
            User.updateOne({_id:user._id},{role:2})
                .then((response) => {
                    return res.status(201).json({message: "le role vip a été rajouté à "+req.params.id})
                })
                .catch(error => {
                    res.status(400).json({ error, message:"hmhmmmm" })
                })
        })
        .catch( error => {
            res.status(500).json({ error })
        })
    
}