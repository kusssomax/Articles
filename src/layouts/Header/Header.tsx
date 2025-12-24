import SearchInput from "@/features/articles/components/SearchInput/SearchInput.tsx";
import styles from "./Header.module.scss";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const Header = () => {
    const { filteredArticles } = useSelector((state: RootState) => state.articles);

    return (
        <header className={styles.header}>
            <div className={styles.searchWrapper}>
                <h1 className={styles.searchTitle}>Filter by keywords</h1>
                <SearchInput
                    placeholder="The most successful IT companies in 2020"
                    type="search"
                />
            </div>
            <div className={styles.resultWrapper}>
                <p className={styles.resultInfo}>Result: {filteredArticles.length}</p>
            </div>
        </header>
    );
};

export default Header;