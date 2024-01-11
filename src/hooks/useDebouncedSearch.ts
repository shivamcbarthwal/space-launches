import { useCallback } from "react";
import { searchLaunches } from "../services/LaunchService";
import debounce from 'lodash.debounce';

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
