# SecureAuth System

A modern, secure authentication system with role-based access control, featuring a React frontend and Node.js backend.

## Features

### 🔐 Security Features

- **JWT Authentication** with access and refresh tokens
- **Password Security** with bcrypt hashing and strong password requirements
- **Rate Limiting** to prevent brute force attacks
- **Account Locking** after failed login attempts
- **Input Validation** and sanitization
- **CORS Protection** and security headers
- **MongoDB Query Injection** protection

### 👥 User Management

- **Dual Role System**: Admin and User roles
- **User Registration** with email validation
- **Profile Management** with update capabilities
- **Password Change** functionality
- **Account Status** management (active/inactive)

### 🎨 Modern UI/UX

- **Responsive Design** with Tailwind CSS
- **Smooth Animations** and transitions
- **Beautiful Forms** with validation feedback
- **Role-based Dashboards** for different user types
- **Professional Components** with consistent design

## Technology Stack

### Backend

- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Rate Limit** for security
- **Helmet** for security headers

### Frontend

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Context API** for state management

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and setup the project**

   ```bash
   cd AuthSystem
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Copy environment file and configure
   cp .env.example .env
   # Edit .env with your MongoDB URI and secrets

   # Build and start the server
   npm run build
   npm start
   # Or for development
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install

   # Start the development server
   npm run dev
   ```

4. **Database Setup**
   - Ensure MongoDB is running
   - The database and collections will be created automatically

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/authsystem

# JWT Secrets (Change in production!)
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d

# Session Secret
SESSION_SECRET=your-session-secret

# CORS
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Usage

### Default Access

1. Navigate to `http://localhost:5173`
2. You'll be redirected to the login page
3. Register a new account or use demo accounts

### Demo Accounts

The login form includes demo account buttons:

- **Admin**: admin@example.com / Admin123!
- **User**: user@example.com / User123!

### Admin Features

- View dashboard with user statistics
- Manage all users (view, edit, activate/deactivate)
- Change user roles
- Delete users (except themselves)
- Security monitoring

### User Features

- Personal dashboard with account info
- Profile management
- Password change
- Activity tracking

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Admin (Admin only)

- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/:id` - Get user by ID
- `PUT /api/admin/users/:id/status` - Update user status
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## Security Considerations

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Rate Limiting

- General API: 100 requests per 15 minutes
- Auth endpoints: 5 attempts per 15 minutes
- Account lockout: 5 failed attempts = 2 hours lockout

### Production Deployment

1. Change all default secrets in `.env`
2. Use HTTPS in production
3. Configure proper CORS origins
4. Set up MongoDB with authentication
5. Use environment-specific rate limits
6. Enable additional security headers

## Development

### Backend Development

```bash
cd backend
npm run dev  # Starts with hot reload
```

### Frontend Development

```bash
cd frontend
npm run dev  # Starts Vite dev server
```

### Building for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## Project Structure

```
AuthSystem/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Note**: This is a demonstration project. For production use, ensure proper security reviews and additional hardening measures are implemented.
