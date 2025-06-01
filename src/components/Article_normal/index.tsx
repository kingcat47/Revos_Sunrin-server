import styles from './styles.module.scss';

// interface ArticleProps {
//     title: string;
//     description: string;
//     image_url ?: string;
//     className ?: string;
// }

//아 백엔 하기전에 목데이터 디테일은 크게 필요없는듯 걍 여기서 냅두겠음

const BadmintonCard = () => {
    return (
        <div className={styles.badminton_card}>
            <div className={styles.card_image}>
                <img
                    src="/src/assets/mok/badminton.png"
                    alt="Badminton equipment with shuttlecocks and racket"
                    className={styles.main_image}
                />
                <span className={styles.category_tag}>스포츠</span>
            </div>

            <div className={styles.card_content}>
                <div className={styles.author_info}>
                    <img
                        src="/src/assets/mok/foriner_profile.png"
                        alt="Bong Lozada"
                        className={styles.author_avatar}
                    />
                    <span className={styles.author_name}>Bong Lozada</span>
                </div>

                <div className={styles.post_date}>01 June 2023</div>

                <h3 className={styles.card_title}>
                    'Outdoor' Badminton Gets Support From Local Federation
                </h3>

                <p className={styles.card_description}>
                    The Badminton World Federation is developing Air Badminton and the country's governing body is taking steps to...
                </p>
            </div>
        </div>
    );
};

export default BadmintonCard;