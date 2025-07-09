const Notification = require('../models/Notification');

async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({ user: req.userId, read: false }).populate('task');
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Fetching notifications failed' });
  }
}

async function markAsRead(req, res) {
  const notificationId = req.params.id;
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    if (notification.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    notification.read = true;
    await notification.save();
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Marking as read failed' });
  }
}

module.exports = {
  getNotifications,
  markAsRead,
};
