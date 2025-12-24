import type { IArticle } from "../api/types";

export interface ISearchInputProps {
    placeholder: string;
    type: string;
    // value: string;
    // onChange: (value: string) => void;
}

export interface IArticleCardProps {
    id: number;
    imgUrl: string;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    publishedAt: string;
    searchQuery?: string;
}

export interface IArticleInitialState {
    articlesData: IArticle[];
    isLoading: boolean;
    error: string | null;
}

export interface IArticleState extends IArticleInitialState {
    searchQuery: string;
    filteredArticles: IArticle[];
}

export interface IOneArticleCardProps {
    title: string;
    description: string;
}