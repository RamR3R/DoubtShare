const Tutor = require('../models/tutor.model');

const PollingController = {};

PollingController.updateTutorPing = async (req, res) => {
  const { tutorId } = req.body;

  try {
    const tutor = await Tutor.findOne({where:{id:tutorId}});
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    // Update tutor's last ping time
    tutor.lastPingTime = new Date();
    await tutor.save();

    return res.json({ message: 'Tutor ping updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = PollingController;
