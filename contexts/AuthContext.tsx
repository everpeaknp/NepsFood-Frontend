"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, userAPI, setAuthTokens, clearAuthTokens, getUser, setUser as saveUser } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    console.log('🔐 Login attempt:', { username });
    try {
      console.log('📡 Calling login API...');
      const response = await authAPI.login(username, password);
      const data = response.data;
      console.log('✅ Login successful');
      
      if (data.access && data.refresh) {
        setAuthTokens(data.access, data.refresh);
        console.log('💾 Tokens saved');
        
        // Fetch user profile
        console.log('👤 Fetching profile...');
        const profileResponse = await userAPI.getProfile();
        const profile = profileResponse.data;
        console.log('✅ Profile loaded');
        setUser(profile);
        saveUser(profile);
        
        return { success: true };
      } else {
        return { success: false, error: 'Login failed. Please try again' };
      }
    } catch (error: any) {
      // Handle all errors gracefully - no console errors
      console.log('⚠️ Login failed');
      
      // Always show the same message for security
      return { success: false, error: 'Incorrect email or password' };
    }
  };

  const register = async (username: string, email: string, password: string, firstName: string, lastName: string) => {
    console.log('📝 Registration attempt:', { email });
    try {
      console.log('📡 Calling registration API...');
      const response = await authAPI.register({ username, email, password, first_name: firstName, last_name: lastName });
      const data = response.data;
      console.log('✅ Registration successful');
      
      if (data.access && data.refresh) {
        setAuthTokens(data.access, data.refresh);
        console.log('💾 Tokens saved');
        
        // Fetch user profile
        console.log('👤 Fetching profile...');
        const profileResponse = await userAPI.getProfile();
        const profile = profileResponse.data;
        console.log('✅ Profile loaded');
        setUser(profile);
        saveUser(profile);
        
        return { success: true };
      } else {
        return { success: false, error: 'Registration failed. Please try again' };
      }
    } catch (error: any) {
      // Handle all errors gracefully - no console errors
      console.log('⚠️ Registration failed');
      
      // Check for specific validation errors
      if (error.response?.status === 400 && error.response?.data) {
        const data = error.response.data;
        
        if (data.username) {
          if (data.username[0].includes('already exists') || data.username[0].includes('taken')) {
            return { success: false, error: 'User already exists. Please login instead' };
          }
          return { success: false, error: data.username[0] };
        }
        
        if (data.email) {
          if (data.email[0].includes('already exists') || data.email[0].includes('taken')) {
            return { success: false, error: 'Email already registered. Please login instead' };
          }
          return { success: false, error: data.email[0] };
        }
        
        if (data.password) {
          return { success: false, error: data.password[0] };
        }
      }
      
      // Default error message
      return { success: false, error: 'Registration failed. Please try again' };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      clearAuthTokens();
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
