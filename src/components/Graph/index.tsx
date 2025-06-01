import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './styles.module.scss';

const newsData = [
    { category: '연예', 전체유저: 5, 나: 4 },         // 연예 뉴스: 전체유저 평균 5번, 나는 4번 읽음
    { category: '과학/IT', 전체유저: 16, 나: 39 },    // IT 뉴스: 전체유저 평균 16번, 나는 39번 읽음 (IT에 관심 많음)
    { category: '사회', 전체유저: 12, 나: 8 },        // 사회 뉴스: 전체유저 평균 12번, 나는 8번 읽음
    { category: '정치', 전체유저: 28, 나: 32 },       // 정치 뉴스: 전체유저 평균 28번, 나는 32번 읽음 (하루 1번 정도)
    { category: '문화', 전체유저: 6, 나: 15 },        // 문화 뉴스: 전체유저 평균 6번, 나는 15번 읽음
    { category: '스포츠', 전체유저: 7, 나: 5 },       // 스포츠 뉴스: 전체유저 평균 7번, 나는 5번 읽음
    { category: '경제', 전체유저: 22, 나: 19 },       // 경제 뉴스: 전체유저 평균 22번, 나는 19번 읽음
    { category: '국제', 전체유저: 9, 나: 11 },        // 국제 뉴스: 전체유저 평균 9번, 나는 11번 읽음
    { category: '기타', 전체유저: 2, 나: 1 }
];//나중에 json이런 형식으로 받아오도록 대체할거

interface GraphProps {
    className ?: string;
}

export default function GraphComponents({className}: GraphProps) {
    interface TooltipPayload {
        color: string;
        dataKey: string;
        value: number;

    }

    interface CustomTooltipProps {
        active?: boolean;
        payload?: TooltipPayload[];
        label?: string;
    }

    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.tooltip}>
                    <p className={styles.tooltipLabel}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className={styles.tooltipValue} style={{ color: entry.color }}>
                            {entry.dataKey}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const maxValue = Math.max(...newsData.flatMap(item => [item.전체유저, item.나]));
    const yAxisMax = Math.ceil(maxValue / 100) * 100;

    return (
        <div className={[styles.container, className].join("")}>
            <div className={styles.chartWrapper}>
                {/* 제목 */}
                <h2 className={styles.title}>Record</h2>

                {/* 그래프 */}
                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                            data={newsData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                            barCategoryGap="20%"
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis
                                dataKey="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                interval={0}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                domain={[0, yAxisMax]}
                                tickCount={6}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="전체유저"
                                fill="#2B3695"
                                radius={2}
                                barSize={20}
                            />
                            <Bar
                                dataKey="나"
                                fill="#6976EB"
                                radius={2}
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 범례 */}
                <div className={styles.legend}>
                    <div className={styles.legendItem}>
                        <div className={styles.legendColorPrev}></div>
                        <span className={styles.legendText}>전체유저</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendColorCurrent}></div>
                        <span className={styles.legendText}>나</span>
                    </div>
                </div>
            </div>
        </div>
    );
}