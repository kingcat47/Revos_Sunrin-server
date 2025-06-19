import styles from './styles.module.scss'
import { Article_bigComponent, Article_normalComponent, GraphComponent, WeatherComponent } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavbarComponent from "../../components/Navbar";

// Article 타입에 id 추가
interface Article {
    id: string;
    title: string;
    text: string;
    category: string;
    img?: string | null;
    created_at: string;
}

export default function NewsPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');

    useEffect(() => {
        axios.get('http://localhost:8000/get/get_all_article')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setArticles(res.data);
                } else if (typeof res.data === 'object' && res.data !== null) {
                    setArticles([res.data]);
                } else {
                    setArticles([]);
                }
            })
            .catch(() => setArticles([]));
    }, []);

    // 카테고리 필터링
    const filteredArticles = selectedCategory === '전체'
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    // 4개씩 배열로 묶기
    const rows: Article[][] = [];
    for (let i = 0; i < filteredArticles.length; i += 4) {
        rows.push(filteredArticles.slice(i, i + 4));
    }

    return (
        <div className={styles.container}>
            <NavbarComponent onCategorySelect={setSelectedCategory} />
            <div className={styles.helement}>
                <GraphComponent />
                <div className={styles.hright}>
                    <WeatherComponent />
                    <Article_bigComponent
                        title={'How to use Hobini Phone16'}
                        description={'The Jwa Ho Bin cell phone is superior and Apple\'s technology is overwhelming. '}
                        className={styles.atricle_big}
                    />
                </div>
            </div>
            {rows.map((row, idx) => (
                <div className={styles.newslist} key={idx}>
                    {Array.isArray(row) && row.map((article) => (
                        <Link
                            to={`/news/${article.id}`}
                            key={article.id}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Article_normalComponent article={article} />
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
}