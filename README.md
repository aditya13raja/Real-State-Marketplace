# 🏠 Real Estate Marketplace

## 🚀 Project Overview

This is a dynamic **full-stack real estate marketplace** application built with the **MERN stack** (MongoDB, Express, React, Node.js). It provides a seamless platform for users to browse, manage, and interact with property listings. The platform features a user-friendly interface, robust authentication, and real-time data updates.

---

## ✨ Key Features

- **Property Listing Management**: Add, edit, and delete property listings.
- **Image Uploads**: Upload images via Firebase Storage.
- **User Authentication**: Secure login using JWT, Firebase, and Google OAuth.
- **Real-Time Data**: Keep data updated with real-time CRUD operations.
- **Responsive Design**: Optimized for all devices.
- **Search Functionality**: Find properties based on specific criteria.
- **Contact Landlord**: Message landlords directly via the listing page.
- **User Profile**: Create and manage user profiles.
- **User Listings**: View, update, and delete your own listings.
- **Sign In/Sign Up**: Register or log in to your account.
- **Sign Out**: Securely log out from the platform.

---

## 🛠️ Technologies Used

| **Frontend**      | React.js, HTML5, CSS, Tailwind CSS              |
|--------------------|------------------------------------------------|
| **Backend**       | Node.js, Express.js                            |
| **Database**      | MongoDB                                        |
| **Authentication**| JSON Web Token (JWT), Firebase, Google OAuth   |
| **State Management** | Redux Toolkit                              |
| **Storage**       | Firebase Storage                               |
| **Version Control** | Git, GitHub                                  |

---

## 📅 Development Timeline

### **August 2024**:
- Set up React app with Tailwind CSS.
- Created server and connected MongoDB.
- User model and authentication routes (Sign-up, Sign-in) implemented.
- Integrated Google OAuth and Redux Toolkit.

### **September 2024**:
- Added image upload functionality via Firebase Storage.
- Completed profile page and CRUD operations for listings.
- Enabled sign-out and user deletion features.

### **October 2024**:
- Added search and contact landlord functionality.
- Finalized Home and About pages.

### **December 2024**:
- Polished code and made minor adjustments.

---

## 📃 Pages

| Feature                   | Description                                      |
|---------------------------|--------------------------------------------------|
| **Listing Detail**  | Detailed property listing view with images.      |
| **Search Results**        | List of properties matching search criteria.     |
| **Update Listing**        | Page for updating property details.              |
| **Sign-In Page**          | User authentication interface.                   |
| **Home Page**             | Main website landing page.                       |

---

## 📝 Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites
- Install **Node.js** and **npm**.
- MongoDB connection string and authentication keys.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aditya13raja/Real-State-Marketplace/
   cd Real-State-Marketplace
   ```

2. Install server-side dependencies:
   ```bash
   npm install
   ```

3. Install client-side dependencies:
   ```bash
   cd client
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGODB_URI=<your_mongodb_connection_string>
     JSON_SECRET=<your_jwt_secret_key>
     ```

### Running the Application
- Start the backend server:
  ```bash
  npm run dev
  ```

- Start the frontend server:
  ```bash
  cd client
  npm run dev
  ```

---

## 🛡️ Additional Information

- Middleware included for handling errors efficiently.
- Firebase Storage powers image handling.
- Secure authentication implemented with JWT and Firebase Authentication.

---

## 🤝 Contributors

- **[Aditya Raj](https://github.com/aditya13raja)**  
  *(Feel free to add your name and GitHub profile.)*
