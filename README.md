[package-lock.json](https://github.com/user-attachments/files/17981854/package-lock.json)
[package.json](https://github.com/user-attachments/files/17981861/package.json)

Thanks for sharing the details of your project! Here's the content for your `README.md` file tailored to your telemedicine application:

---

# TeleMed: Bridging Healthcare Gaps

## Description
**TeleMed** is a telemedicine platform designed to connect financially disadvantaged individuals and those facing barriers to accessing healthcare with doctors through an affordable, user-friendly web platform. The platform addresses challenges such as geographical distance, lack of nearby healthcare facilities, and financial constraints.

## Features
- **Patient Management**: Add, view, and manage patient records.
- **Doctor Integration**: Store doctor details and specializations.
- **Visitor Logs**: Track visitor details for patients.
- **Database Integration**: Stores all data securely in a MySQL database.
- **Responsive Design**: Ensures usability across devices.
- **Notifications**: Provides real-time feedback for actions like adding patients.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS (with Bootstrap), JavaScript
- **Database**: MySQL
- **Environment Variables**: dotenv
- **Real-Time Features**: socket.io

## Installation
### Prerequisites
1. Node.js (version 12+)
2. MySQL server
3. Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Appolinary07/Final-project.git
   cd Final-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a database named `telemedicine` in MySQL.
   - Run the following SQL script to set up the database tables:
     ```sql
     CREATE DATABASE telemedicine;

     USE telemedicine;

     CREATE TABLE Patients (
         patient_id INT AUTO_INCREMENT PRIMARY KEY,
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         date_of_birth DATE NOT NULL,
         gender ENUM('M', 'F', 'Other') NOT NULL,
         email VARCHAR(100) UNIQUE,
         phone VARCHAR(20) NOT NULL,
         address TEXT,
         emergency_contact_name VARCHAR(100),
         emergency_contact_phone VARCHAR(20),
         medical_history TEXT,
         diagnosis VARCHAR(255),
         status ENUM('Active', 'Discharged', 'Deceased') DEFAULT 'Active',
         date_admitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         date_discharged TIMESTAMP NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     );

     CREATE TABLE Doctors (
         doctor_id INT AUTO_INCREMENT PRIMARY KEY,
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         specialization VARCHAR(100) NOT NULL,
         license_number VARCHAR(50) UNIQUE NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL,
         phone VARCHAR(20) NOT NULL,
         department VARCHAR(100),
         status ENUM('Active', 'Inactive', 'On Leave') DEFAULT 'Active',
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     );

     CREATE TABLE Visitors (
         visitor_id INT AUTO_INCREMENT PRIMARY KEY,
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         relationship VARCHAR(50) NOT NULL,
         phone VARCHAR(20) NOT NULL,
         patient_id INT NOT NULL,
         visit_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         purpose VARCHAR(255),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
         FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE RESTRICT
     );
     ```

4. Configure environment variables:
   - Create a `.env` file in the project root and add the following:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     PORT=3000
     ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open the application in your browser:
   ```
   http://localhost:3000
   ```

**Usage**
- **Add Patients**: Fill out the patient form to add a new patient.
- **View Patients**: The patient list displays all registered patients with their admission and discharge status.

**Folder Structure**
- **app.js**: Frontend logic for managing patient records.
- **server.js**: Backend server with API routes.
- **public/**: Static files (HTML, CSS, JavaScript).
- **package.json**: Contains dependencies and scripts.

**Contributions**
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

**License**
This project is licensed under the MIT License.

---
Next Steps
1. Save this content in a `README.md` file in the root of your project.
2. Push it to your GitHub repository:
   ```bash
   git add README.md
   git commit -m "Add README file"
   git push origin main
   ```


