import styles from './styles.module.scss'

interface ArticleProps {
    title: string
    description: string
    image_url: string
}

export default function Article_bigComponent({title,description,image_url}: ArticleProps) {
    return(
        <div className={styles.container}>
            <img alt={''} src={image_url} />
            <div className={styles.textfield}>
                <h3>{title}</h3>
                <span>{description}</span>
            </div>
        </div>
    )
}