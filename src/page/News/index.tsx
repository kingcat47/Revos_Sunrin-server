import styles from './styles.module.scss'
import {Article_bigComponent, Article_normalComponent, GraphComponent, WeatherComponent} from "../../components";

export default function NewsPage() {
    return(
        <div className={styles.container}>
            <div className={styles.helement}>
                <GraphComponent/>
                <div className={styles.hright}>
                    <WeatherComponent/>
                <Article_bigComponent title={'How to use Hobini Phone16'}
                                      description={'The Jwa Ho Bin cell phone is superior and Apple\'s technology' +
                                          'is overwhelming. '} className={styles.atricle_big}></Article_bigComponent>

                </div>
            </div>
            <div className={styles.newslist}>
                <Article_normalComponent/> <Article_normalComponent/> <Article_normalComponent/>
                <Article_normalComponent/>
            </div>
            <div className={styles.newslist}>
                <Article_normalComponent/> <Article_normalComponent/> <Article_normalComponent/>
                <Article_normalComponent/>
            </div>
            <div className={styles.newslist}>
                <Article_normalComponent/> <Article_normalComponent/> <Article_normalComponent/>
                <Article_normalComponent/>
            </div>
        </div>
    )
}