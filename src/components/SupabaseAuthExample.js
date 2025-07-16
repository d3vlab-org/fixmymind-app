// src/components/SupabaseAuthExample.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';

/**
 * Example component demonstrating how to use the useSupabaseAuth hook
 * This component shows how to:
 * - Access the current user and loading state
 * - Login with email and password
 * - Register a new user
 * - Login with Google
 * - Login with phone
 * - Logout
 */
const SupabaseAuthExample = () => {
  const { user, loading, login, register, logout, loginWithGoogle, loginWithPhone } = useSupabaseAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  // Handle email/password login
  const handleLogin = async () => {
    try {
      await login(email, password);
      // Clear form after successful login
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (show error message, etc.)
    }
  };
  
  // Handle user registration
  const handleRegister = async () => {
    try {
      await register(email, password);
      // Clear form after successful registration
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error (show error message, etc.)
    }
  };
  
  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
      // Handle Google login error (show error message, etc.)
    }
  };
  
  // Handle phone login
  const handlePhoneLogin = async () => {
    try {
      await loginWithPhone(phone);
      // Clear form after sending OTP
      setPhone('');
    } catch (error) {
      console.error('Phone login error:', error);
      // Handle phone login error (show error message, etc.)
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error (show error message, etc.)
    }
  };
  
  // Show loading indicator while authentication is in progress
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  // Show user info if logged in
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.email || 'User'}!</Text>
        <Text style={styles.userInfo}>User ID: {user.id}</Text>
        {user.phone && <Text style={styles.userInfo}>Phone: {user.phone}</Text>}
        
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Show login/register form if not logged in
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Authentication</Text>
      
      {/* Email/Password Login Form */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Email/Password Authentication</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Social Login Buttons */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Social Login</Text>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
      
      {/* Phone Login Form */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Phone Authentication</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number (with country code)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handlePhoneLogin}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  formSection: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  socialButton: {
    backgroundColor: '#db4437',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SupabaseAuthExample;