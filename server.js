const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const {
  insertSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission
} = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// API Routes

// Submit form
app.post('/api/submit', async (req, res) => {
  try {
    const result = await insertSubmission(req.body);
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: result
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting form',
      error: error.message
    });
  }
});

// Get all submissions
app.get('/api/responses', async (req, res) => {
  try {
    const submissions = await getAllSubmissions();
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
});

// Get submission by ID
app.get('/api/responses/:id', async (req, res) => {
  try {
    const submission = await getSubmissionById(req.params.id);
    if (submission) {
      res.status(200).json({
        success: true,
        data: submission
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submission',
      error: error.message
    });
  }
});

// Update submission status
app.patch('/api/responses/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await updateSubmissionStatus(req.params.id, status);
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
});

// Delete submission
app.delete('/api/responses/:id', async (req, res) => {
  try {
    const result = await deleteSubmission(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully',
      data: result
    });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting submission',
      error: error.message
    });
  }
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Form: http://localhost:${PORT}`);
  console.log(`📊 Admin: http://localhost:${PORT}/admin`);
  console.log(`========================================\n`);
});
