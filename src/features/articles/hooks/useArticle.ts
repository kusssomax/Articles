import { useEffect, useState } from "react";
import type { IArticle } from "../api/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";


export const useArticle = (id: string | undefined) => {
    const [article, setArticle] = useState<IArticle | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const articlesData = useSelector((state: RootState) => state.articles.articlesData);


    useEffect(() => {

        if (!id) {
            setError("Invalid article id");
            setIsLoading(false);
            return;
        }

        const cachedArticle = articlesData.find((article: IArticle) => article.id === Number(id));

        if (cachedArticle) {
            setArticle(cachedArticle);
            setIsLoading(false);
            return;
        }

        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch article");
                } 

                const data = await response.json();
                setArticle(data);
                setIsLoading(false);
            } catch (error) {
                setError("Failed to fetch article, try to refresh the page");
            } finally {
                setIsLoading(false);
            }
        }
        
        
        fetchArticle();
    }, [id, articlesData])

    return { article, isLoading, error }
    
}