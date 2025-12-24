import ArticleCard from "../ArticleCard/ArticleCard";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { IArticle } from "@/features/articles/api/types";
import { getArticles } from "@/store/articles/articleSlice";
import CircularProgress from '@mui/material/CircularProgress';
import styles from './ArticlesList.module.scss';

const ArticlesList = () => {
    const { articlesData, isLoading, error, filteredArticles, searchQuery } = useSelector((state: RootState) => state.articles);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (articlesData.length === 0) {
            dispatch(getArticles(30));
        }
    }, [dispatch, articlesData.length]);

    const displayArticles = searchQuery.trim() ? filteredArticles : articlesData;


    if ((isLoading || searchQuery.length > 0) && !(filteredArticles.length > 0)) {
        return <div className={styles.loading}>
            <CircularProgress color="info" />
        </div>
    }

    if (error) {
        return <div className={styles.error}>
            {error}
        </div>
    }

    return (
        <div className={styles.articlesListContainer}>
            {displayArticles.length > 0 ? (displayArticles.map((article: IArticle, index: number) => (
                <ArticleCard key={index} id={article.id} imgUrl={article.image_url} title={article.title} description={article.summary.length > 100 ? article.summary.slice(0, 100) + '...' : article.summary} publishedAt={article.published_at} />
            ))
            ) : filteredArticles.length === 0 ? (
                <div className={styles.noArticles}>
                    No articles found
                </div>
            ) : null}
        </div>
    )
}

export default ArticlesList;