const { Router } = require('express');
const router = Router();

const { getUsers, createUsers, getUsersById, updateUserById, deleteUserById } = require('../controllers/index.controller');

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get('/users/:id', getUsersById);
router.put('/users/update/:id', updateUserById);
router.delete('/users/delete/:id', deleteUserById);

module.exports = router;