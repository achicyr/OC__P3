const express = require('express')
const router = express.Router()
const dataCtrl = require('../controllers/data')

router.get('/', dataCtrl.getAll)
router.post('/menu/new', dataCtrl.addMenu)
router.put('/menu/update/:id', dataCtrl.updateMenu)
router.delete('/menu/delete/:id', dataCtrl.deleteMenu)
// router.get('/menus/', dataCtrl.getOneMenus)

module.exports = router