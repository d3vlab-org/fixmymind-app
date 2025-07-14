# FixMyMind Development Setup

## CORS Issue Resolution

The CORS issue you encountered has been fixed. Here's what was done and how to use the development setup:

### What was fixed:

1. **PricingController**: Removed the `die($json)` statement that was causing improper response headers
2. **CORS Configuration**: Updated to include all necessary Expo development origins
3. **API Configuration**: Created a centralized config file for API endpoints
4. **PaymentPlans Component**: Updated to use configurable API URLs

### Development Setup:

#### 1. Start the Backend Server

```bash
# Option 1: Use the provided script
./scripts/start-backend.sh

# Option 2: Manual start
cd /Users/jd/fixmymind/fixmymind-backend
php artisan serve --port=8000
```

#### 2. Start the React Native App

```bash
# In the main project directory
npm start
# or
expo start
```

### API Configuration

The app now uses environment-based API URLs:

- **Development**: `http://localhost:8000/api`
- **Production**: `https://api.fixmymind.org/api`

The configuration automatically switches based on the `__DEV__` flag.

### CORS Headers

The backend now properly sets these CORS headers:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Credentials`
- `Content-Type: application/json`

### Testing the Fix

You can test the API directly:

```bash
curl -i -H "Origin: http://localhost:19006" http://localhost:8000/api/pricing.json
```

Expected response should include:
```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:19006
```

### Important Notes

- The CORS configuration currently includes `'*'` for development convenience
- **Remember to remove the wildcard (`'*'`) from allowed origins before deploying to production**
- The backend server needs to be running on `localhost:8000` for the mobile app to work in development mode

### File Structure

```
src/
├── config/
│   └── api.js          # API configuration and URL helpers
├── screens/
│   └── PaymentPlans.js # Updated to use configurable API
└── scripts/
    └── start-backend.sh # Backend startup script
```
