const Task = require('../models/Task');
const User = require('../models/User');
const Notification = require('../models/Notification');

async function createTask(req, res) {
  const { title, description, deadline, category, assigneeEmail } = req.body;
  try {
    let assignee = req.userId;
    if (assigneeEmail) {
      const user = await User.findOne({ email: assigneeEmail });
      if (!user) return res.status(404).json({ message: 'Assignee not found' });
      assignee = user._id;
    }

    const task = new Task({
      title,
      description,
      deadline,
      category,
      creator: req.userId,
      assignee,
    });

    await task.save();

    if (assignee.toString() !== req.userId) {
      const notification = new Notification({
        message: `You have been assigned: ${title}`,
        user: assignee,
        task: task._id,
      });
      await notification.save();
    }

    res.status(201).json({ taskId: task._id, message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Task creation failed' });
  }
}

async function updateTask(req, res) {
  const taskId = req.params.id;
  const { title, description, deadline, category } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.category = category || task.category;

    await task.save();
    res.json({ taskId: task._id, message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
}

async function assignTask(req, res) {
  const taskId = req.params.id;
  const { assigneeEmail } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only creator can assign tasks' });
    }

    const user = await User.findOne({ email: assigneeEmail });
    if (!user) return res.status(404).json({ message: 'Assignee not found' });

    task.assignee = user._id;
    await task.save();

    const notification = new Notification({
      message: `You have been assigned: ${task.title}`,
      user: user._id,
      task: task._id,
    });
    await notification.save();

    res.json({ taskId: task._id, message: 'Task assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Assignment failed' });
  }
}

async function updateStatus(req, res) {
  const taskId = req.params.id;
  const { status } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.creator.toString() !== req.userId && task.assignee.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update status' });
    }

    task.status = status;
    await task.save();

    res.json({ taskId: task._id, message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Status update failed' });
  }
}

async function deleteTask(req, res) {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
}

async function getAllTasks(req, res) {
  try {
    // Find tasks where user is either creator or assignee
    const tasks = await Task.find({
      $or: [
        { creator: req.userId },
        { assignee: req.userId }
      ]
    }).populate('category', 'name');
    
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

module.exports = {
  createTask,
  updateTask,
  assignTask,
  updateStatus,
  deleteTask,
  getAllTasks  // Add this line
};
