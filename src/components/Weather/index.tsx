import styles from './styles.module.scss';

interface WeatherData {
    city: string;
    temperature: number;
    condition: string;
    iconUrl: string;
}

export default function WeatherComponent() {
    // 가짜 데이터 (API 연결 전용 mock)
    const weather: WeatherData = {
        city: 'Seoul',
        temperature: 27,
        condition: 'Sunny',
        iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png',
    };

    return (
        <a className={styles.container}
           href="https://www.weather.go.kr/w/index.do"
           target="_blank"
           rel="noopener noreferrer">
            <div className={styles.weatherCard}>
                <div className={styles.city}>{weather.city}</div>
                <div className={styles.row}>
                    <img src={weather.iconUrl} alt={weather.condition} className={styles.icon}/>
                    <div className={styles.temperature}>{weather.temperature}°C</div>
                </div>
                <div className={styles.condition}>{weather.condition}</div>
            </div>
        </a>
    );
}
