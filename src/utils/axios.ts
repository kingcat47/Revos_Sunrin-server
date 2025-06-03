import axios from "axios";

const timeout = 15000;


export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    timeout,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const accessToken = localStorage.getItem("accessToken");
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                console.log("error");
                const response = await axios.post(
                    `http://localhost:3000/user/token`, //refresh-token
                    {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    }
                );

                const newAccessToken = response.data.data.accessToken;
                // const newRefreshToken = response.data.data.refreshToken;

                localStorage.setItem("accessToken", newAccessToken);

                // if (newRefreshToken) {
                //   localStorage.setItem("refreshToken", newRefreshToken);
                // }

                axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (error) {
                // 토큰 재발급 실패 시 로그아웃 처리
                console.log(error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/signin";
                return Promise.reject(error);
            }
        }
    }
);

export const getWeatherData = async (lat: number, lon: number) => {
    const WEATHER_API = import.meta.env.VITE_WEATHER_KEY;

    if (!lat || !lon) throw new Error("위도 또는 경도가 없습니다.");
    if (!WEATHER_API) throw new Error("날씨 API 키가 설정되지 않았습니다.");

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric`);
        return response.data;
    } catch (error) {
        console.error("날씨 데이터를 불러오는 중 오류:", error);
        throw error;
    }
};

export default axiosInstance;
