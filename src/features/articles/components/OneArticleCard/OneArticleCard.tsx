import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import type { IOneArticleCardProps } from '../../types';
import styles from './OneArticleCard.module.scss';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OneArticleCard = ({ title, description }: IOneArticleCardProps) => {
    return (
        <div className={styles.articleContainer}>
            <Card
                sx={{
                    padding: "2rem 4rem 3rem 4rem",
                    maxWidth: "1290px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3.5rem",
                    margin: "-4.25rem auto 2rem auto",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Typography variant="h1" component="h1"
                    sx={{
                        fontFamily: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontWeight: 400,
                        fontSize: '1.5rem',
                        textAlign: "center",
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="body1" component="p"
                    sx={{
                        fontFamily: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontWeight: 400,
                        fontSize: '1rem',
                    }}
                >
                    {description}
                </Typography>
            </Card>
            <Link to="/" className={styles.backLink}>
                <ArrowLeft className={styles.backLinkIcon} />
                Back to homepage
            </Link>
        </div>
    )
}

export default OneArticleCard;