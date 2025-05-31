import styles from './styles.module.scss'
import {GraphComponent} from "../../components";

export default function NewsPage() {
    return(
        <div className={styles.container}>
            <span>news page</span>
            <GraphComponent/>
        </div>
    )
}