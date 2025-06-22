
// routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, issueController.upload, issueController.createIssue);
router.get('/', issueController.getAllIssues);
router.get('/mine', protect, issueController.getMyIssues);
router.get('/high', issueController.getHighSeverityIssues);
router.get('/:id', issueController.getIssueById);
router.patch('/:id/upvote', protect, issueController.upvoteIssue);
router.post('/:id/comments', protect, issueController.addComment);
router.patch('/:id/status', protect, isAdmin, issueController.updateIssueStatus);
router.get('/success', protect, isAdmin, issueController.getResolvedIssues);

module.exports = router;
