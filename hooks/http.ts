import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://citc-ustpcdo.com/api/v1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// REQUEST INTERCEPTOR: Add auth token to every request
api.interceptors.request.use(
    async (config) => {
        try {
            // Add auth token if available
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting auth token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR: Handle errors globally
api.interceptors.response.use(
    (response) => {
        // Success - just return the response
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Handle 401 Unauthorized (token expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Try to refresh the token
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                
                if (refreshToken) {
                    // Call refresh token endpoint
                    const response = await axios.post(
                        'https://citc-ustpcdo.com/api/v1/auth/refresh',
                        { refresh_token: refreshToken },
                        { baseURL: '' } // Override baseURL for this call
                    );
                    
                    if (response.data.access_token) {
                        // Save new token
                        await AsyncStorage.setItem('authToken', response.data.access_token);
                        
                        // Update the failed request with new token
                        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                        
                        // Retry the original request
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                // Refresh failed - logout user
                console.log('Token refresh failed, logging out...');
                await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData', 'isLoggedIn']);
                // You might want to redirect to login here
            }
        }
        
        // Handle other errors
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.status, error.response.data);
            
            // You can add specific handling for different status codes
            switch (error.response.status) {
                case 403:
                    console.log('Forbidden access');
                    break;
                case 404:
                    console.log('Resource not found');
                    break;
                case 500:
                    console.log('Server error');
                    break;
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        } else {
            // Something else happened
            console.error('Request Error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default api;