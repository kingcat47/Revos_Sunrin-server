import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import SvgIcon from "../SvgIcon";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import LogoIcon from "../../assets/icon/LogoIcon.svg?react";
import NavbarItem from "./NavbarItem";

export default function NavbarComponent() {
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
            <SvgIcon icon={<LogoIcon />} color={'#5068A9'} height={30} width={30} />
            <span className={styles.logo_text}>Revos</span>
            <NavbarItem />
        </div>
    );
}
