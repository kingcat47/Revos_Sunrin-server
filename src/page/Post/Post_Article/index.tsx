import styles from './styles.module.scss'
import { ButtonComponent, CategoryComponent, InputComponent } from "../../../components";
import Sports from '../../../assets/icon/Category/volleyball.svg?react'
import Education from '../../../assets/icon/Category/book.svg?react'
import Coin from '../../../assets/icon/Category/coin.svg?react'
import People from '../../../assets/icon/Category/peoples.svg?react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Post_Article_Page() {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const navigation = useNavigate();

    const handleCategoryClick = (categoryName: string) => {
        setCategory(categoryName);
        console.log("Selected Category:", categoryName);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const pushArticleInfo = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('category', category);
        if (image) {
            formData.append('img', image);
        }

        axios.post('http://localhost:8000/post/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                // articleId를 받아서 vote 페이지로 넘김
                const articleId = response.data?.id;
                if (articleId) {
                    navigation('vote', { state: { articleId } });
                } else {
                    alert('게시글 생성 후 articleId를 받아오지 못했습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={styles.container}>
            <InputComponent placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
            <InputComponent placeholder={'Text'} value={text} onChange={(e) => setText(e.target.value)} />

            {/* 이미지 업로드 */}
            <input
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
            />

            <div className={styles.categorybox}>
                <CategoryComponent icon={<Sports />} text={'스포츠'} onClick={() => handleCategoryClick('스포츠')} />
                <CategoryComponent icon={<Education />} text={'교육'} onClick={() => handleCategoryClick('교육')} />
                <CategoryComponent icon={<Coin />} text={'사회'} onClick={() => handleCategoryClick('사회')} />
                <CategoryComponent icon={<People />} text={'경제'} onClick={() => handleCategoryClick('경제')} />
            </div>

            {/* 버튼 클릭 시 push 함수 호출 */}
            <ButtonComponent text={"다음"} onClick={pushArticleInfo} />
        </div>
    );
}