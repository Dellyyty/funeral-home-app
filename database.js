const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'funeral_home.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deceased_first_name TEXT NOT NULL,
      deceased_last_name TEXT NOT NULL,
      deceased_dob DATE NOT NULL,
      deceased_dod DATE NOT NULL,
      deceased_ssn TEXT,
      service_type TEXT NOT NULL,
      service_date DATE,
      service_time TEXT,
      service_location TEXT,
      burial_cremation TEXT,
      contact_first_name TEXT NOT NULL,
      contact_last_name TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      contact_email TEXT NOT NULL,
      contact_address TEXT,
      contact_city TEXT,
      contact_state TEXT,
      contact_zip TEXT,
      contact_relationship TEXT NOT NULL,
      veteran_status TEXT,
      religious_preference TEXT,
      obituary_text TEXT,
      additional_notes TEXT,
      submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending'
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Database table initialized successfully.');
    }
  });
}

// Insert new submission
function insertSubmission(data) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO submissions (
        deceased_first_name, deceased_last_name, deceased_dob, deceased_dod, deceased_ssn,
        service_type, service_date, service_time, service_location, burial_cremation,
        contact_first_name, contact_last_name, contact_phone, contact_email,
        contact_address, contact_city, contact_state, contact_zip, contact_relationship,
        veteran_status, religious_preference, obituary_text, additional_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.deceased_first_name, data.deceased_last_name, data.deceased_dob, 
      data.deceased_dod, data.deceased_ssn,
      data.service_type, data.service_date, data.service_time, 
      data.service_location, data.burial_cremation,
      data.contact_first_name, data.contact_last_name, data.contact_phone, 
      data.contact_email, data.contact_address, data.contact_city, 
      data.contact_state, data.contact_zip, data.contact_relationship,
      data.veteran_status, data.religious_preference, data.obituary_text, 
      data.additional_notes
    ];

    db.run(query, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, message: 'Submission saved successfully' });
      }
    });
  });
}

// Get all submissions
function getAllSubmissions() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM submissions ORDER BY submission_date DESC';
    
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Get submission by ID
function getSubmissionById(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM submissions WHERE id = ?';
    
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Update submission status
function updateSubmissionStatus(id, status) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE submissions SET status = ? WHERE id = ?';
    
    db.run(query, [status, id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Status updated successfully', changes: this.changes });
      }
    });
  });
}

// Delete submission
function deleteSubmission(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM submissions WHERE id = ?';
    
    db.run(query, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Submission deleted successfully', changes: this.changes });
      }
    });
  });
}

module.exports = {
  db,
  insertSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission
};
