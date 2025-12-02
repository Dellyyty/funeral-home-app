const { Pool } = require('pg');

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database schema
async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      deceased_first_name VARCHAR(255) NOT NULL,
      deceased_last_name VARCHAR(255) NOT NULL,
      deceased_dob DATE NOT NULL,
      deceased_dod DATE NOT NULL,
      deceased_ssn VARCHAR(11),
      service_type VARCHAR(100) NOT NULL,
      service_date DATE,
      service_time VARCHAR(10),
      service_location VARCHAR(255),
      burial_cremation VARCHAR(50),
      contact_first_name VARCHAR(255) NOT NULL,
      contact_last_name VARCHAR(255) NOT NULL,
      contact_phone VARCHAR(20) NOT NULL,
      contact_email VARCHAR(255) NOT NULL,
      contact_address VARCHAR(255),
      contact_city VARCHAR(100),
      contact_state VARCHAR(2),
      contact_zip VARCHAR(10),
      contact_relationship VARCHAR(100) NOT NULL,
      veteran_status VARCHAR(100),
      religious_preference VARCHAR(100),
      obituary_text TEXT,
      additional_notes TEXT,
      submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending'
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Database table initialized successfully.');
  } catch (err) {
    console.error('Error creating table:', err.message);
  }
}

// Test connection and initialize
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
  } else {
    console.log('Connected to PostgreSQL database.');
    release();
    initializeDatabase();
  }
});

// Insert new submission
async function insertSubmission(data) {
  const query = `
    INSERT INTO submissions (
      deceased_first_name, deceased_last_name, deceased_dob, deceased_dod, deceased_ssn,
      service_type, service_date, service_time, service_location, burial_cremation,
      contact_first_name, contact_last_name, contact_phone, contact_email,
      contact_address, contact_city, contact_state, contact_zip, contact_relationship,
      veteran_status, religious_preference, obituary_text, additional_notes
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
    RETURNING id
  `;

  const values = [
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

  try {
    const result = await pool.query(query, values);
    return { id: result.rows[0].id, message: 'Submission saved successfully' };
  } catch (err) {
    throw err;
  }
}

// Get all submissions
async function getAllSubmissions() {
  const query = 'SELECT * FROM submissions ORDER BY submission_date DESC';

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
}

// Get submission by ID
async function getSubmissionById(id) {
  const query = 'SELECT * FROM submissions WHERE id = $1';

  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

// Update submission status
async function updateSubmissionStatus(id, status) {
  const query = 'UPDATE submissions SET status = $1 WHERE id = $2';

  try {
    const result = await pool.query(query, [status, id]);
    return { message: 'Status updated successfully', changes: result.rowCount };
  } catch (err) {
    throw err;
  }
}

// Delete submission
async function deleteSubmission(id) {
  const query = 'DELETE FROM submissions WHERE id = $1';

  try {
    const result = await pool.query(query, [id]);
    return { message: 'Submission deleted successfully', changes: result.rowCount };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  pool,
  insertSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission
};
