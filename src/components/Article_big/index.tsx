import styles from './styles.module.scss'

interface ArticleProps {
    title: string;
    description: string;
    image_url ?: string;
    className ?: string;
}

export default function Article_bigComponent({title,description, image_url, className}: ArticleProps) {
    return(
        <div className={[styles.container, className].join("")}>
            <img className={styles.main_image} alt={''} src={image_url ? image_url : '/src/assets/mok/apple_handphon2-upgrade.png'}/>
            <div className={styles.textfield}>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
            </div>
        </div>
    )
}