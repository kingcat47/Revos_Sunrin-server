import styles from './styles.module.scss'
import {Article_bigComponent, Article_normalComponent, GraphComponent, WeatherComponent} from "../../components";
import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

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

    useEffect(() => {
        axios.get('http://localhost:8000/get/get_all_article')
            .then(res => {
                console.log('받아온 데이터:', res.data);
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

    // 4개씩 배열로 묶기
    const rows: Article[][] = [];
    for (let i = 0; i < articles.length; i += 4) {
        rows.push(articles.slice(i, i + 4));
    }

    return (
        <div className={styles.container}>
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