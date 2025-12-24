import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { IArticleCardProps } from '../../types';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.scss';
import { MoveRight } from 'lucide-react';
import { formatDate } from '../../utils';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { highlightKeywords } from '../../utils';

const ArticleCard = ({ id, imgUrl, title, description, publishedAt }: IArticleCardProps) => {

    const { searchQuery } = useSelector((state: RootState) => state.articles);
    const displayTitle = searchQuery ? highlightKeywords(String(title), searchQuery) : title;
    const displayDescription = searchQuery ? highlightKeywords(String(description), searchQuery) : description;

    return (
        <Card 
        sx={{
            
            width: '100%',
            display: "flex",
            flexDirection: "column",
        }}
        >
            <CardMedia
                component="img"
                height="200"
                image={imgUrl}
                alt={String(title)}
            />
            <CardContent>
                <Typography variant="body2" component="p" 
                sx={{
                    fontFamily: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    marginBottom: "1.5rem",
                  }}
                >
                    {formatDate(publishedAt)}
                </Typography>
                <Typography variant="h3" component="h3"
                 sx={{
                    fontFamily: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontWeight: 400,
                    fontSize: '1.5rem',
                    marginBottom: "1.25rem",
                  }}
                >
                    {displayTitle}
                </Typography>
                <Typography variant="body1" component="p">
                    {displayDescription}
                </Typography>
            </CardContent>
            <CardActions 
            sx={{
                marginTop: "auto",
                paddingInline: "1rem",
                paddingBottom: "1rem",
            }}
            >
                <Link className={styles.link} to={`/article/${id}`}>
                    Read more <MoveRight className={styles.iconMoveRight} />
                </Link>
            </CardActions>
        </Card>
    )

}

export default ArticleCard;