import styles from './styles.module.scss'

export default function Fileinput(){
    return (
        <div className={styles.container}>
            <input className={styles.inputing} type={'file'} accept={'image/*'}/>
        </div>
    )
}