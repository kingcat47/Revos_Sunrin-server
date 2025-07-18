import axios from "axios";
import type { AxiosInstance } from "axios";

// 이하 동일
// ===== JWT 토큰 관리 유틸 함수 =====
export const getToken = () => localStorage.getItem("accessToken");
export const setToken = (token: string) => localStorage.setItem("accessToken", token);
export const removeToken = () => localStorage.removeItem("accessToken");

interface AxiosConfig {
    baseURL?: string;
    auth?: boolean;
    timeout?: number;
}

const defaultConfig = {
    baseURL: "http://localhost:8000",
    timeout: 15000,
    auth: true,
};

// ===== axios 인스턴스 생성 함수 =====
export const createAxios = (config: AxiosConfig = {}): AxiosInstance => {
    const { baseURL, timeout, auth } = { ...defaultConfig, ...config };
    const instance = axios.create({
        baseURL,
        timeout,
        headers: {
            "Content-Type": "application/json",
            ...(auth && getToken() && { Authorization: `Bearer ${getToken()}` }),
        },
    });

    // 요청 인터셉터: 매 요청마다 최신 토큰 첨부
    instance.interceptors.request.use(
        (cfg) => {
            const accessToken = getToken();
            if (auth && accessToken) {
                cfg.headers.Authorization = `Bearer ${accessToken}`;
            }
            return cfg;
        },
        (error) => Promise.reject(error)
    );

    // 응답 인터셉터: 401(토큰 만료) 시 토큰 재발급 및 자동 재요청
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                try {
                    const accessToken = getToken();
                    const refreshToken = localStorage.getItem("refreshToken");
                    if (!refreshToken) throw new Error("No refresh token");
                    // 토큰 재발급 요청
                    const res = await axios.post(
                        "http://localhost:8000/user/token",
                        { accessToken, refreshToken }
                    );
                    const newAccessToken = res.data.data.accessToken;
                    setToken(newAccessToken);
                    instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                } catch (err) {
                    removeToken();
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/signin";
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

// ===== (예시) 날씨 데이터 가져오는 함수 =====
export const getWeatherData = async (lat: number, lon: number) => {
    const WEATHER_API = import.meta.env.VITE_WEATHER_KEY;
    if (!lat || !lon) throw new Error("위도 또는 경도가 없습니다.");
    if (!WEATHER_API) throw new Error("날씨 API 키가 설정되지 않았습니다.");
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric`
        );
        return response.data;
    } catch (error) {
        console.error("날씨 데이터를 불러오는 중 오류:", error);
        throw error;
    }
};

// 기본 인스턴스 export (기존 코드 호환)
const axiosInstance = createAxios();
export default axiosInstance;