const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask,
  updateTask,
  assignTask,
  updateStatus,
  deleteTask
} = require('../controllers/taskController');

router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.put('/:id/assign', auth, assignTask);
router.put('/:id/status', auth, updateStatus);
router.delete('/:id', auth, deleteTask);

module.exports = router;
