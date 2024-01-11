import axios from 'axios';
export const INITIAL_URL = 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&page=1';
export const API_BASE_URL = 'https://lldev.thespacedevs.com/2.2.0/launch';

// Debounced search function to serach launches by serach term -> name, rocket name, mission name, launch service provider name
const searchLaunches = async (searchTerm: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/upcoming/?search=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error searching launches:', error);
        throw error;
    }
};

// Function to fetch launch details by ID
const fetchLaunchDetail = async (launchId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${launchId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching launch details:', error);
        throw error;
    }
};

export { searchLaunches, fetchLaunchDetail  };
