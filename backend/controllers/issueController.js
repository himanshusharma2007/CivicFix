
// controllers/issueController.js
const Issue = require('../models/Issue');
const { calculateSeverity } = require('../utils/severityRanker');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

exports.upload = upload.single('image');

exports.createIssue = async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const severity = calculateSeverity(description, title);
    const issue = new Issue({
      user: req.user.id,
      title,
      description,
      image,
      location,
      severity,
    });
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('user', 'name').sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user.id }).populate('user', 'name').sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getHighSeverityIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ severity: 'High' }).populate('user', 'name').sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('user', 'name').populate('comments.user', 'name');
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });

    if (issue.upvotes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already upvoted' });
    }

    issue.upvotes.push(req.user.id);
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  const { message } = req.body;
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });

    issue.comments.push({ user: req.user.id, message });
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateIssueStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });

    issue.status = status;
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getResolvedIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ status: 'Resolved' }).populate('user', 'name').sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
