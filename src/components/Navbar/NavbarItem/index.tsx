import styles from './styles.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
    onCategorySelect: (category: string) => void;
}

export default function NavbarItem({ onCategorySelect }: NavbarItemProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [subject, setSubject] = useState('전체');
    const [isLogin, setisLogin] = useState(false);

    const handleDropdownClick = (prop: string) => {
        setSubject(prop);
        setIsDropdownOpen(false);
        onCategorySelect(prop);
    };

    return (
        <>
            <ul className={styles.container}>
                <li className={styles.menu_items}><Link to="/news">뉴스</Link></li>
                <li className={styles.menu_items}><Link to="/board">게시판</Link></li>
                {/*<li className={styles.menu_items}><Link to="/write">게시물 작성</Link></li>*/}
                <li className={styles.menu_items}><Link to="/post">게시물 작성</Link></li>
                {!isLogin && <li className={styles.menu_items}><Link to="/login">로그인</Link></li>}
                {isLogin && <li className={styles.menu_items}><Link to="/profile">프로필</Link></li>}
                <li
                    className={styles.menu_items}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {subject} ▼
                </li>
            </ul>
            {isDropdownOpen && (
                <ul className={styles.dropdown}>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('전체')}>전체</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('정치')}>정치</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('경제')}>경제</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('과학/IT')}>과학/IT</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('사회')}>사회</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('국제')}>국제</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('문화')}>문화</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('연예')}>연예</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('스포츠')}>스포츠</div>
                    <div className={styles.dropdown_item} onClick={() => handleDropdownClick('other')}>other</div>
                </ul>
            )}
        </>
    );
}