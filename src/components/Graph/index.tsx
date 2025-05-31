import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './styles.module.scss';

const newsData = [
    { category: '정치', 한달전: 285, 이번달: 320 },
    { category: '경제', 한달전: 215, 이번달: 186 },
    { category: '사회/IT', 한달전: 165, 이번달: 394 },
    { category: '사회', 한달전: 95, 이번달: 67 },
    { category: '국제', 한달전: 75, 이번달: 89 },
    { category: '스포츠', 한달전: 55, 이번달: 45 },
    { category: '연예', 한달전: 45, 이번달: 38 },
    { category: '기타', 한달전: 0, 이번달: 0 }
];

export default function GraphComponents() {
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

    const maxValue = Math.max(...newsData.flatMap(item => [item.한달전, item.이번달]));
    const yAxisMax = Math.ceil(maxValue / 100) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.chartWrapper}>
                {/* 제목 */}
                <h2 className={styles.title}>History</h2>

                {/* 그래프 */}
                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
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
                                dataKey="한달전"
                                fill="#4F46E5"
                                radius={2}
                                barSize={20}
                            />
                            <Bar
                                dataKey="이번달"
                                fill="#8B5CF6"
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
                        <span className={styles.legendText}>전체 유저</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendColorCurrent}></div>
                        <span className={styles.legendText}>나</span>
                    </div>
                </div>

                {/* 상위 값 표시 */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h4 className={styles.statTitle}>이번 달 최고</h4>
                        <div className={styles.statValueBlue}>
                            사회/IT: 394
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <h4 className={styles.statTitle}>가장 큰 증가</h4>
                        <div className={styles.statValueGreen}>
                            사회/IT: +229
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <h4 className={styles.statTitle}>총 조회수</h4>
                        <div className={styles.statValueGray}>
                            이번 달: {newsData.reduce((sum, item) => sum + item.이번달, 0).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}