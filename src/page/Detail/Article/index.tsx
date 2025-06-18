import styles from "./styles.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultImage from "../../../assets/mok/badminton.png";
import {ButtonComponent} from "../../../components";

interface Article {
    id: string;
    title: string;
    text: string;
    category: string;
    img?: string | null;
    created_at: string;
}

export default function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigate()
    
    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        console.log('요청하는 ID:', id);
        axios
            .get(`http://localhost:8000/get/get_article_by_id`, {
                params: {
                    id: id
                }
            })
            .then(res => {
                console.log('받은 데이터:', res.data);
                setArticle(res.data);
            })
            .catch((error) => {
                console.error('기사 로딩 중 오류:', error);
                setArticle(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <div>로딩 중...</div>;
    if (!article) return <div>기사를 찾을 수 없습니다.</div>;

    return (
        <div className={styles.container}>
            <h1>{article.title}</h1>
            <img
                src={
                    typeof article.img === "string"
                        ? (article.img.startsWith("http")
                            ? article.img
                            : "http://localhost:8000" + article.img)
                        : defaultImage
                }
                alt={article.title}
                style={{ width: 400, height: "auto" }}
            />
            <div style={{ whiteSpace: "pre-line", marginTop: 20 }}>
                {article.text}
            </div>
            <ButtonComponent text={'다음ㄱㄱ'} onClick={()=>navigation(`/vote/${id}`)} />
        </div>
    );
}