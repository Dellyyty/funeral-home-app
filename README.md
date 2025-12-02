# Funeral Home Services - Form Application

An enterprise-grade, full-stack web application for managing funeral home service arrangement requests with a professional admin dashboard.

## 🌟 Features

### Client-Facing Form
- **Comprehensive Information Collection**
  - Deceased person details (name, dates, SSN, veteran status)
  - Service preferences (type, date, location, burial/cremation)
  - Contact information with full address
  - Obituary text and additional notes
  
- **Professional Design**
  - Enterprise-grade UI with modern design system
  - Fully responsive layout for all devices
  - Real-time form validation
  - Auto-formatting for phone numbers and SSN
  - Success/error notifications

### Admin Dashboard
- **Submission Management**
  - View all form submissions in a sortable table
  - Real-time statistics (total, pending, completed)
  - Search and filter functionality
  - Detailed view for each submission
  
- **Status Management**
  - Update submission status (pending, reviewed, completed)
  - Color-coded status badges
  - Quick status updates from table view
  
- **Data Export**
  - Export all submissions to CSV
  - Print individual submission details
  - Complete data preservation

### Backend Features
- **RESTful API**
  - POST `/api/submit` - Submit new form
  - GET `/api/responses` - Get all submissions
  - GET `/api/responses/:id` - Get specific submission
  - PATCH `/api/responses/:id/status` - Update status
  - DELETE `/api/responses/:id` - Delete submission
  
- **Database**
  - SQLite database (no external setup required)
  - Automatic schema initialization
  - Persistent data storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - **Client Form**: http://localhost:3000
   - **Admin Dashboard**: http://localhost:3000/admin

The server will automatically:
- Create the SQLite database
- Initialize the database schema
- Start listening on port 3000

## 📁 Project Structure

```
funeral-home-form-app/
├── server.js              # Express server and API routes
├── database.js            # Database configuration and queries
├── package.json           # Project dependencies
├── funeral_home.db        # SQLite database (auto-created)
├── README.md             # This file
└── public/               # Frontend files
    ├── index.html        # Client form page
    ├── admin.html        # Admin dashboard page
    └── styles.css        # Enterprise CSS styling
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep blue (#1a365d) - Professional and trustworthy
- **Secondary**: Charcoal (#2d3748) - Modern and sophisticated
- **Success**: Green (#38a169) - Positive actions
- **Error**: Red (#e53e3e) - Warnings and errors
- **Background**: Light gray (#f7fafc) - Clean and minimal

### Typography
- System font stack for optimal performance
- Clear hierarchy with multiple heading levels
- Readable line heights and spacing

### Components
- Cards with subtle shadows
- Rounded corners (8-12px)
- Smooth transitions and animations
- Accessible form controls
- Responsive grid layouts

## 🔧 API Documentation

### Submit Form
```http
POST /api/submit
Content-Type: application/json

{
  "deceased_first_name": "John",
  "deceased_last_name": "Doe",
  "deceased_dob": "1950-01-01",
  "deceased_dod": "2024-01-01",
  "service_type": "traditional",
  "contact_first_name": "Jane",
  "contact_last_name": "Doe",
  "contact_phone": "(555) 123-4567",
  "contact_email": "jane@example.com",
  "contact_relationship": "spouse",
  "burial_cremation": "burial"
  // ... other fields
}
```

### Get All Submissions
```http
GET /api/responses

Response:
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Get Single Submission
```http
GET /api/responses/:id

Response:
{
  "success": true,
  "data": {...}
}
```

### Update Status
```http
PATCH /api/responses/:id/status
Content-Type: application/json

{
  "status": "completed"
}
```

### Delete Submission
```http
DELETE /api/responses/:id

Response:
{
  "success": true,
  "message": "Submission deleted successfully"
}
```

## 📊 Database Schema

```sql
CREATE TABLE submissions (
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
```

## 🔒 Security Considerations

For production deployment, consider adding:
- Authentication for admin dashboard
- HTTPS/SSL certificates
- Rate limiting on API endpoints
- Input sanitization and validation
- CORS configuration for specific domains
- Environment variables for sensitive data
- Database backups

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🛠️ Customization

### Changing Colors
Edit the CSS variables in `public/styles.css`:
```css
:root {
  --primary-color: #1a365d;
  --secondary-color: #2d3748;
  /* ... other colors */
}
```

### Adding Form Fields
1. Add field to `public/index.html`
2. Update database schema in `database.js`
3. Update API handlers in `server.js`
4. Update admin display in `public/admin.html`

### Changing Port
Set the PORT environment variable:
```bash
PORT=8080 npm start
```

## 📝 License

This project is provided as-is for use in funeral home operations.

## 🤝 Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure port 3000 is available
4. Check database file permissions

## 🎯 Future Enhancements

Potential features to add:
- Email notifications on form submission
- PDF generation for submissions
- Document upload capability
- Calendar integration for service scheduling
- Multi-user authentication system
- Advanced reporting and analytics
- Integration with payment processing
- SMS notifications

---

**Built with ❤️ for professional funeral home services**
