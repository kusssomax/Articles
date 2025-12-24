import { Input, InputAdornment } from '@mui/material';
import { Search } from "lucide-react";
import type { ISearchInputProps } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { setSearchQuery } from '@/store/articles/articleSlice';
import useDebounce from "@/shared/hooks/useDebounce.tsx";
import {searchArticles} from "@/store/articles/articleSlice.ts"
import { useEffect } from 'react';

const SearchInput = ({ placeholder, type }: ISearchInputProps) => {
    const { searchQuery } = useSelector((state: RootState) => state.articles);
    const dispatch = useDispatch<AppDispatch>();

    const debouncedQuery = useDebounce(searchQuery, 500);
    useEffect(() => {
        dispatch(searchArticles(debouncedQuery));
    }, [debouncedQuery, dispatch]);

    const onInputChange = (value: string) => {
        dispatch(setSearchQuery(value));
    }

    return (
            <Input
                placeholder={placeholder}
                type={type}
                value={searchQuery}
                onChange={(e) => onInputChange(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                }
                sx={{
                    maxWidth: '600px',
                    width: '100%',
                    border: '1px solid #EAEAEA',
                    borderRadius: '7px',
                    ".MuiInput-input": {
                        paddingBlock: '13px',
                        color: '#575757',
                        "&::placeholder": {
                            color: '#575757',
                        }
                    },
                    ".MuiInputAdornment-positionStart": {
                        marginLeft: '8px',
                    }
                }}
                disableUnderline={true}
            />
    );
};

export default SearchInput;