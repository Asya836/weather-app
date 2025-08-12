import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

function Search({ onSearch }) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input) {
            onSearch(input);
            setInput('');
        }
    };

    return (
        <TextField
            id="standard-basic"
            label="Şehir ara"
            variant="standard"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
                style: { color: 'white' }
            }}
            InputLabelProps={{
                style: { color: 'white' }
            }}
            sx={{
                '& label': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                '& .MuiInputBase-input': { color: 'white' }
            }}
        />
    )
}

export default Search