import { Button, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import React, { ChangeEvent } from 'react';

type SearchBarProps = {
    searchTerm: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearch: (term: string) => void;
    onReset?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange, onSearch, onReset }) => {
    return (
        <Paper elevation={3} style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
            <TextField
                label="Search by Name"
                value={searchTerm}
                onChange={onChange}
                style={{ marginRight: '1rem' }}
                InputProps={{
                    endAdornment: (
                        searchTerm && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => onReset?.()} // Reset search term
                                    edge="end"
                                >
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    ),
                }}
            />
            <Button variant="contained" onClick={() => onSearch(searchTerm)}>Search</Button>
        </Paper>
    );
};

export default SearchBar;