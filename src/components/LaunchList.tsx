import { CircularProgress, Container, Grid, List, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { LaunchContext } from '../context/LaunchContext';
import { Launch } from '../interfaces/Launch';
import { INITIAL_URL, searchLaunches } from '../services/LaunchService';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import SearchBar from './SearchBar';
import PaginationButton from './PaginationButton';
import LaunchItem from './LaunchItem';

const LaunchList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Launch[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

    const location = useLocation();
    const { launches = [], fetchLaunches, next, previous, setLaunchesFromCache  } = useContext(LaunchContext) || {};

    const displayLaunches = isSearching ? searchResults : launches;

    const {debouncedSearch, cancel} = useDebouncedSearch(300);

    useEffect(() => {
        if (!isSearching) {
            setLoading(true);
            let url = INITIAL_URL;
            if (url && fetchLaunches) {
                fetchLaunches(url)
                    .then(() => {
                        setIsInitialDataLoaded(true);
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }
    }, [fetchLaunches, isSearching]);

    // Scroll to top whenever launches change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [launches]);

    const handleSearch = async (query: string) => {
        if (!query) {
            cancel(); // cancel any pending debounced search if the user clears the search field and clicks search button
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        setLoading(true);
        try {
            const data = await searchLaunches(query);
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching launches:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            if (debouncedSearch) {
                debouncedSearch(searchTerm)
                    .then(data => {
                        setSearchResults(data.results);
                        setIsSearching(true);
                    })
                    .catch(error => {
                        console.error('Error searching launches:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        } else {
            setIsSearching(false);
        }
    }, [searchTerm]);

    const handleDebouncedSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
        setLoading(true);
    };

    const handlePreviousPage = async (): Promise<void> => {
        if (previous && fetchLaunches) {
            setLoading(true)
            try {
                await fetchLaunches(previous);
            } catch(error){
                console.error('Error fetching launches:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleNextPage = async (): Promise<void> => {
        if (next && fetchLaunches) {
            setLoading(true)
            try {
                await fetchLaunches(next);
            } catch(error){
                console.error('Error fetching launches:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const resetSearch = (): void => {
        setSearchTerm('');
        setSearchResults([]);
        setIsSearching(false);
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                {isInitialDataLoaded && (
                    <Grid item xs={12}>
                        <SearchBar
                            searchTerm={searchTerm}
                            onChange={handleDebouncedSearchInputChange}
                            onSearch={handleSearch}
                            onReset={resetSearch}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <React.Fragment>
                            <List>
                                {displayLaunches?.length > 0 ? (
                                    displayLaunches.map((launch) => (
                                        <LaunchItem key={launch.id} launch={launch} previous={previous || ''} />
                                    ))
                                ) : (
                                    <Typography style={{ textAlign: 'center', marginTop: '1rem', color: 'red' }}>
                                        No launches found
                                    </Typography>
                                )}
                            </List>
                        </React.Fragment>
                    )}
                </Grid>
                {!loading && displayLaunches.length > 0 && (
                    <Grid item xs={12}>
                        <PaginationButton
                            hasPrevious={!!previous}
                            hasNext={!!next}
                            onPrevious={handlePreviousPage}
                            onNext={handleNextPage}
                        />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default LaunchList;
