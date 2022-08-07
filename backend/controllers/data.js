
const fs = require('fs')
const Data = require('../models/Data')

exports.getAll = (req, res, next) => {
    /*SNIPPET REQUEST BODY*/
    // ner_body
    /*SNIPPET MONGOOSE CRUD*/
    // necmfind
    /*SNIPPET express res*/
    res.status(200).json(Data)
    
}

exports.updateMenu = (req, res, next) => {
    res.json({message: "le controlleur pour cette action ('update') n'a pas encore été codé"})
}
exports.deleteMenu = (req, res, next) => {
    console.log("uuu");
    res.status(201).json({message: "le controlleur pour cette action ('delete') n'a pas encore été codé"})
}
exports.addMenu = (req, res, next) => {
    console.log(req.body);
    console.log(Data);

    let entrees = {}, plats = {}, desserts = {}
    , nom_restau = Object.keys(req.body)[0]
    , lieu_restau = Object.keys(req.body)[1]
    delete req.body[lieu_restau]
    Data.menus.carte = {...Data.menus.carte, ...req.body}
    Data.home.restaurants.card.cards.push(
        {
          makeClickable: ["", { to: "/menu/"+(Data.home.restaurants.card.cards.length+1) }],
          image: [
            "Les plat du restaurant '"+nom_restau+"'",
            { src: "assets/images/restaurants/restaurant-"+(Data.home.restaurants.card.cards.length+1)+".jpg" },
          ],
          content: [{ h3: [nom_restau], p: [lieu_restau] }, {}],
        }
    )
    let buffer = new Buffer.from("const Data = "+JSON.stringify(Data));
    fs.open("models/Data.js", "w", function(err, fd) {
        if(err) {
            console.log('Cant open file');
        }else {
            fs.write(fd, buffer, 0, buffer.length, 
                    null, function(err,writtenbytes) {
                if(err) {
                    console.log('Cant write to file');
                }else {
                    console.log(writtenbytes +
                        ' characters added to file');
                }
            })
        }
    })
    res.status(200).json({message:"Fichier upadté avec succès"})
}
