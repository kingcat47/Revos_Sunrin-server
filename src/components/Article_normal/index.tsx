import styles from './styles.module.scss';
import defaultImage from '/src/assets/mok/badminton.png';
import defaultAvatar from '/src/assets/mok/foriner_profile.png';

// Article 타입 정의 (id 추가)
interface Article {
    id: string;
    title: string;
    text: string;
    category: string;
    img?: string | null;
    created_at: string;
    authorName?: string;
    authorAvatar?: string;
}

// props 타입 정의
interface BadmintonCardProps {
    article?: Article;
    className?: string;
}

// 목데이터 (id 추가)
const mockArticle: Article = {
    id: "99999999999",
    title: "...",
    text: "...",
    category: "스포츠",
    img: defaultImage,
    created_at: "2023-06-01T00:00:00",
    authorName: "Bong Lozada",
    authorAvatar: defaultAvatar,
};

const Article_bigComponent = ({ article, className }: BadmintonCardProps) => {
    const data = article && Object.keys(article).length > 0 ? article : mockArticle;
    console.log("프론트엔드기준 이미지:", data.img);
    console.log("프론트엔드기준 id:", data.id);
    return (
        <div className={`${styles.badminton_card} ${className ?? ''}`}>
            <div className={styles.card_image}>
                <img
                    src={
                        data.img
                            ? (data.img.startsWith('http') ? data.img : "http://localhost:8000" + data.img)
                            : defaultImage
                    }
                    alt="Badminton equipment with shuttlecocks and racket"
                    className={styles.main_image}
                />
                <span className={styles.category_tag}>{data.category}</span>
            </div>

            <div className={styles.card_content}>
                <div className={styles.author_info}>
                    <img
                        src={data.authorAvatar ?? defaultAvatar}
                        alt={data.authorName ?? "Bong Lozada"}
                        className={styles.author_avatar}
                    />
                    <span className={styles.author_name}>{data.authorName ?? "Bong Lozada"}</span>
                </div>

                <div className={styles.post_date}>
                    {new Date(data.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: '2-digit' })}
                </div>

                <h3 className={styles.card_title}>
                    {data.title}
                </h3>

                <p className={styles.card_description}>
                    {data.text}
                </p>
            </div>
        </div>
    );
};

export default Article_bigComponent;