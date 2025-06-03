import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import {getWeatherData} from "../../utils/axios.ts";
import SvgIcon from '../SvgIcon/index.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SunyIcon from '../../assets/icon/Weather/SunyIcon.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CloudyIcon from '../../assets/icon/Weather/CloudIcon.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import RainyIcon from '../../assets/icon/Weather/RainIcon.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SnowyIcon from '../../assets/icon/Weather/SnowIcon.svg?react';


type WeatherType = '맑음' | '비' | '눈' | '구름';

interface WeatherData {
    city: string;
    temperature: number;
    condition: WeatherType;
    icon: WeatherType;
}

const getWeatherIcon = (condition: string): WeatherType => {
    const conditionLower = condition.toLowerCase();
    
    // 비 관련 (천둥번개 포함)
    if (conditionLower.includes('thunderstorm') || 
        conditionLower.includes('rain') || 
        conditionLower.includes('drizzle')) {
        return '비';
    }
    // 눈 관련
    if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
        return '눈';
    }
    // 구름/안개 관련
    if (conditionLower.includes('cloud') || 
        conditionLower.includes('mist') || 
        conditionLower.includes('fog') || 
        conditionLower.includes('haze')) {
        return '구름';
    }
    // 맑음 (기본값)
    return '맑음';
};

const isDaytime = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
};

export default function WeatherComponent() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIcon, setCurrentIcon] = useState<typeof SunyIcon>(SunyIcon);
    const [isDay, setIsDay] = useState(isDaytime());

    useEffect(() => {
        // 시간에 따른 배경색 업데이트를 위한 인터벌 설정
        const interval = setInterval(() => {
            setIsDay(isDaytime());
        }, 60000); // 1분마다 체크

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log("위치:", lat, lng);

                try {
                    const response = await getWeatherData(lat, lng);
                    console.log(response);
                    const conditionLower = response.weather[0].description.toLowerCase();
                    
                    // 아이콘 설정
                    if (conditionLower.includes('thunderstorm') || 
                        conditionLower.includes('rain') || 
                        conditionLower.includes('drizzle')) {
                        setCurrentIcon(RainyIcon);
                    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
                        setCurrentIcon(SnowyIcon);
                    } else if (conditionLower.includes('cloud') || 
                        conditionLower.includes('mist') || 
                        conditionLower.includes('fog') || 
                        conditionLower.includes('haze')) {
                        setCurrentIcon(CloudyIcon);
                    } else {
                        setCurrentIcon(SunyIcon);
                    }

                    setWeather({
                        city: response.name || 'Unknown',
                        temperature: Math.round(response.main.temp),
                        condition: getWeatherIcon(response.weather[0].description),
                        icon: getWeatherIcon(response.weather[0].description),
                    });
                    setError(null);
                } catch (error) {
                    console.error("날씨 데이터 가져오기 실패:", error);
                    setError("날씨 데이터를 불러올 수 없습니다.");
                }
                setLoading(false);
            },
            (error) => {
                console.error("위치 가져오기 실패:", error);
                setError("위치 정보를 가져올 수 없습니다.");
                setLoading(false);
            }
        );
    }, []);

    if (loading) {
        return <div>날씨 정보를 불러오는 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!weather) {
        return <div>날씨 정보를 불러올 수 없습니다.</div>;
    }

    return (
        <a className={styles.container}
           href="https://www.weather.go.kr/w/index.do"
           target="_blank"
           rel="noopener noreferrer">
            <div className={`${styles.mianCard} ${isDay ? styles.daytime : styles.nighttime}`}>
                <div className={styles.top}>
                    <div className={styles.city}>{weather.city}</div>
                    <div className={styles.condition}>{weather.condition}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.temperature}>{weather.temperature}°C</div>
                    <div className={styles.icon}>
                        <SvgIcon color="white" icon={currentIcon} width={64} height={64} />
                    </div>
                </div>
            </div>
        </a>
    );
}