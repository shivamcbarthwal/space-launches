import { useCallback } from "react";
import { searchLaunches } from "../services/LaunchService";
import debounce from 'lodash.debounce';

/**
 * Custom hook that provides a debounced search function and a cancel function.
 * The debounced search function delays the execution of the search function until a certain delay has passed since the last call.
 * The cancel function can be used to cancel the execution of the debounced search function.
 * 
 * @param delay The delay in milliseconds before executing the search function.
 * @returns An object containing the debounced search function and the cancel function.
 */
export const useDebouncedSearch = (delay: number) => {
    const debouncedFunction = useCallback(debounce(async (query: string) => {
        return searchLaunches(query);
    }, delay), [delay]);

    const cancel = useCallback(() => {
        debouncedFunction.cancel();
    }, [debouncedFunction]);

    // Return the debounced function and the cancel function
    return { 
        debouncedSearch: (query: string) => debouncedFunction(query) || Promise.resolve(),
        cancel
    };
};
