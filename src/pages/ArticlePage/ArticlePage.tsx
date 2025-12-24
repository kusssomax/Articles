import { useNavigate, useParams } from "react-router-dom";
import { useArticle } from "@/features/articles/hooks/useArticle";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./ArticlePage.module.scss";
import OneArticleCard from "@/features/articles/components/OneArticleCard/OneArticleCard";
import Button from '@mui/material/Button';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const ArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { article, isLoading, error } = useArticle(id)

    if (isLoading) {
        return <div className={styles.loading}>
            Loading article
            <CircularProgress color="info" />
        </div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    return (
        <div className={styles.articlePageContainer}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={article?.image_url} alt={article?.title} />
            </div>
            <OneArticleCard title={article?.title || ""} description={article?.summary || ""} />
        </div>
    )
}

export default ArticlePage;