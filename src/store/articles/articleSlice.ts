import type { IArticleState } from "@/features/articles/types";
import type { IArticlesResponse, IArticle } from "@/features/articles/api/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: IArticleState = {
    articlesData: [],
    isLoading: false,
    error: null,
    searchQuery: "",
    filteredArticles: [],
}

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getArticles.pending, (state) => {
            state.isLoading = true;
        }).addCase(getArticles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.articlesData = action.payload.results;
        }).addCase(getArticles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to fetch articles";
        });

        builder.addCase(searchArticles.pending, (state) => {
            state.isLoading = true;
        }).addCase(searchArticles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.filteredArticles = action.payload;
        }).addCase(searchArticles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to search articles";
        });
    },
})

export default articleSlice.reducer;
export const {setSearchQuery} = articleSlice.actions;


export const getArticles = createAsyncThunk<IArticlesResponse, number, {rejectValue: string}>(
    "articles/getArticles",
    async (limit, {rejectWithValue}) => {
        try {
            const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                return rejectWithValue("Failed to fetch articles");
            }

            const data = await response.json();
            return data;
        } catch {
            return rejectWithValue("Failed to fetch articles");
        } 
    }
    
 )


 export const searchArticles = createAsyncThunk<IArticle[], string, {rejectValue: string}>(
    "articles/searchArticles",
    async (query, {rejectWithValue}) => {
        if (!query.trim()) return [];
        
        try {
            const keywords = query.trim().split(/\s+/).filter(k => k.length > 0);
            
            const titlePromises = keywords.map(keyword =>
                fetch(`https://api.spaceflightnewsapi.net/v4/articles/?title_contains=${encodeURIComponent(keyword)}&limit=50`)
                    .then(res => res.json())
            );
            
            const summaryPromises = keywords.map(keyword =>
                fetch(`https://api.spaceflightnewsapi.net/v4/articles/?summary_contains=${encodeURIComponent(keyword)}&limit=50`)
                    .then(res => res.json())
            );
            
            const [titleResults, summaryResults] = await Promise.all([
                Promise.all(titlePromises),
                Promise.all(summaryPromises)
            ]);
        
            const titleArticlesMap = new Map<number, IArticle>();
            titleResults.forEach((response: IArticlesResponse) => {
                response.results.forEach(article => {
                    titleArticlesMap.set(article.id, article);
                });
            });
            
            const summaryOnlyArticles: IArticle[] = [];
            summaryResults.forEach((response: IArticlesResponse) => {
                response.results.forEach(article => {
                    if (!titleArticlesMap.has(article.id)) {
                        summaryOnlyArticles.push(article);
                    }
                });
            });
            
            const sortedArticles = [
                ...Array.from(titleArticlesMap.values()),
                ...summaryOnlyArticles.filter((article, index, self) => 
                    self.findIndex(a => a.id === article.id) === index
                )
            ];
            
            return sortedArticles;
        } catch {
            return rejectWithValue("Failed to search articles");
        }
    }
);