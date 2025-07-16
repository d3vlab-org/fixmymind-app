# Authentication in FixMyMind

This directory contains authentication contexts for the FixMyMind application.

## Supabase Authentication

The `SupabaseAuthContext.js` file provides a React context and hook for Supabase authentication. It wraps the Supabase authentication API in a React-friendly way and maintains the authentication state.

### Features

- User state management
- Loading state for authentication operations
- Email/password authentication (login and registration)
- Social authentication (Google)
- Phone authentication
- Automatic session persistence
- Auth state change listener

### Usage

1. The `SupabaseAuthProvider` is already set up in the `App.js` file, so the authentication context is available throughout the application.

2. To use the authentication context in a component, import the `useSupabaseAuth` hook:

```jsx
import { useSupabaseAuth } from '../context/SupabaseAuthContext';

const MyComponent = () => {
  const { user, loading, login, register, logout, loginWithGoogle, loginWithPhone } = useSupabaseAuth();
  
  // Now you can use these values and functions in your component
  // ...
};
```

3. Check authentication state:

```jsx
if (loading) {
  return <LoadingSpinner />;
}

if (user) {
  return <AuthenticatedContent user={user} />;
} else {
  return <LoginForm />;
}
```

4. Login with email and password:

```jsx
const handleLogin = async () => {
  try {
    await login(email, password);
    // Login successful
  } catch (error) {
    // Handle login error
  }
};
```

5. Register a new user:

```jsx
const handleRegister = async () => {
  try {
    await register(email, password);
    // Registration successful
  } catch (error) {
    // Handle registration error
  }
};
```

6. Login with Google:

```jsx
const handleGoogleLogin = async () => {
  try {
    await loginWithGoogle();
    // Google login initiated
  } catch (error) {
    // Handle Google login error
  }
};
```

7. Login with phone:

```jsx
const handlePhoneLogin = async () => {
  try {
    await loginWithPhone(phoneNumber);
    // OTP sent to phone
  } catch (error) {
    // Handle phone login error
  }
};
```

8. Logout:

```jsx
const handleLogout = async () => {
  try {
    await logout();
    // Logout successful
  } catch (error) {
    // Handle logout error
  }
};
```

### Example Component

For a complete example of how to use the `useSupabaseAuth` hook, see the `SupabaseAuthExample.js` component in the `src/components` directory.

## Firebase Authentication

The `AuthContext.js` file provides a React context and hook for Firebase authentication. It is used alongside the Supabase authentication for backward compatibility.