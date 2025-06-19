import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import SvgIcon from "../SvgIcon";
import LogoIcon from "../../assets/icon/LogoIcon.svg?react";
import NavbarItem from "./NavbarItem";
import { Link } from "react-router-dom";

interface NavbarComponentProps {
    onCategorySelect: (category: string) => void;
}

export default function NavbarComponent({ onCategorySelect }: NavbarComponentProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${styles.container} ${scrolled ? styles.scrolled : ""}`}>
            <Link to={'/news'} className={styles.linkReset}>
                <SvgIcon icon={<LogoIcon />} color={'#5068A9'} height={30} width={30} />
                <span className={styles.logo_text}>Revos</span>
            </Link>
            <NavbarItem onCategorySelect={onCategorySelect} />
        </div>
    );
}