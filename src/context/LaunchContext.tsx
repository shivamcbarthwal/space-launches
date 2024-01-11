import React, { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { Launch } from '../interfaces/Launch';
import { LaunchData } from '../interfaces/LaunchData';
import { LaunchContextValue } from '../interfaces/LaunchContext/LaunchContextValue';

export const LaunchContext = createContext<LaunchContextValue | undefined>(undefined);

export const LaunchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [launches, setLaunches] = useState<Launch[]>();
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);

    /*
        // Function to update launches from cached data so that we see the updated data when we go back to the list page
        // when user closes the modal in the detail page    
    */
    const setLaunchesFromCache = useCallback((cachedLaunches: Launch[]) => {
        setLaunches(cachedLaunches);
        console.log('cachedLaunches', cachedLaunches);
    }, []);

    /**
     * Fetches launches from the specified URL and caches the data in local storage.
     * If the data is already cached and not expired, it retrieves the cached data instead.
     * If an error occurs during the fetch, it returns an empty result.
     *
     * @param url - The URL to fetch the launches from.
     * @returns A Promise that resolves to the fetched launch data.
     */

    const fetchLaunches = useCallback(async (url: string): Promise<LaunchData> => {
        const cachedData = localStorage.getItem(url);
        const cachedTimestamp = localStorage.getItem(`${url}_timestamp`);
        const currentTime = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (cachedData && cachedTimestamp) {
            const parsedData = JSON.parse(cachedData);
            const cachedTime = parseInt(cachedTimestamp);

            if (currentTime - cachedTime < twentyFourHours) {
                setLaunches(parsedData.results);
                setNext(parsedData.next);
                setPrevious(parsedData.previous);
                return parsedData;
            }
        }

        try {
            const response = await axios.get(url);
            const data = { results: response.data.results, count: response.data.count, next: response.data.next, previous: response.data.previous };
            localStorage.setItem(url, JSON.stringify(data));
            localStorage.setItem(`${url}_timestamp`, currentTime.toString());
            setLaunches(data.results);
            setNext(data.next || null);
            setPrevious(data.previous || null);
            return data;
        } catch (error) {
            console.error('Error fetching launches:', error);
            return { results: [], count: 0, next: null, previous: null }
        }
    }, []);

    const value: LaunchContextValue = { launches, fetchLaunches, next, previous, setLaunchesFromCache };

    return <LaunchContext.Provider value={value}>{children}</LaunchContext.Provider>;
};
