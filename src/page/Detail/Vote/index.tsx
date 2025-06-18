import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { ButtonComponent } from "../../../components/index";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

interface Choice {
    id: string;
    text: string;
    vote_count: number;
}

interface Vote {
    id: string;
    title: string;
    choices: Choice[];
}

export default function Vote() {
    const { id } = useParams<{ id: string }>(); // article id
    const [votes, setVotes] = useState<Vote[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState<{ [voteId: string]: string }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasVoted, setHasVoted] = useState<{ [voteId: string]: boolean }>({});
    const navigation = useNavigate();

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);
        // 해당 기사의 투표들을 가져오기
        axios.get(`http://localhost:8000/get/votes_by_article/${id}`)
            .then(res => {
                console.log('받은 투표 데이터:', res.data);
                if (Array.isArray(res.data)) {
                    setVotes(res.data);
                } else {
                    setVotes([]);
                }
            })
            .catch(error => {
                console.error('투표 데이터 로딩 중 오류:', error);
                setVotes([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const handleChoiceSelect = (voteId: string, choiceId: string) => {
        if (hasVoted[voteId]) return; // 이미 투표한 경우 선택 불가

        setSelectedChoices(prev => ({
            ...prev,
            [voteId]: choiceId
        }));
    };

    const handleVoteSubmit = async (voteId: string) => {
        const selectedChoiceId = selectedChoices[voteId];
        if (!selectedChoiceId) {
            alert('선택지를 선택해주세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/post/vote/submit', {
                voteId: voteId,
                choiceId: selectedChoiceId
            });

            if (response.status === 200) {
                // 투표 완료 상태 업데이트
                setHasVoted(prev => ({
                    ...prev,
                    [voteId]: true
                }));

                // 투표 결과 업데이트
                setVotes(prev => prev.map(vote => {
                    if (vote.id === voteId) {
                        return {
                            ...vote,
                            choices: vote.choices.map(choice => {
                                if (choice.id === selectedChoiceId) {
                                    return { ...choice, vote_count: choice.vote_count + 1 };
                                }
                                return choice;
                            })
                        };
                    }
                    return vote;
                }));

                alert('투표가 완료되었습니다!');
            }
        } catch (error) {
            console.error('투표 제출 중 오류:', error);
            alert('투표 제출 중 오류가 발생했습니다.');
        }
    };

    const nextSlide = () => {
        if (currentSlide < votes.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const getTotalVotes = (vote: Vote) => {
        return vote.choices.reduce((total, choice) => total + choice.vote_count, 0);
    };

    const getPercentage = (choice: Choice, totalVotes: number) => {
        if (totalVotes === 0) return 0;
        return Math.round((choice.vote_count / totalVotes) * 100);
    };

    if (isLoading) {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (votes.length === 0) {
        return (
            <div className={styles.container}>
                <div>이 기사에 대한 투표가 없습니다.</div>
                <ButtonComponent
                    text="뉴스로 돌아가기"
                    onClick={() => navigation('/news')}
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>투표 참여</h2>
                <div className={styles.slideIndicator}>
                    {currentSlide + 1} / {votes.length}
                </div>
            </div>

            <div className={styles.slideContainer}>
                <div className={styles.currentSlide}>
                    {votes.length > 0 && (() => {
                        const vote = votes[currentSlide];
                        const totalVotes = getTotalVotes(vote);
                        const currentVoteHasVoted = hasVoted[vote.id];

                        return (
                            <div className={styles.voteCard}>
                                <div className={styles.voteTitleContainer}>
                                    <h3 className={styles.voteTitle}>{vote.title}</h3>
                                </div>

                                <div className={styles.choices}>
                                    {vote.choices.map((choice) => {
                                        const isSelected = selectedChoices[vote.id] === choice.id;
                                        const percentage = getPercentage(choice, totalVotes);

                                        return (
                                            <div
                                                key={choice.id}
                                                className={`${styles.choice} ${isSelected ? styles.selected : ''} ${currentVoteHasVoted ? styles.voted : ''}`}
                                                onClick={() => handleChoiceSelect(vote.id, choice.id)}
                                            >
                                                <div className={styles.choiceContent}>
                                                    <span className={styles.choiceText}>{choice.text}</span>
                                                    {currentVoteHasVoted && (
                                                        <div className={styles.voteResult}>
                                                            <span className={styles.percentage}>{percentage}%</span>
                                                            <span className={styles.count}>({choice.vote_count}표)</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {currentVoteHasVoted && (
                                                    <div
                                                        className={styles.progressBar}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={styles.voteActions}>
                                    {!currentVoteHasVoted ? (
                                        <ButtonComponent
                                            text="투표하기"
                                            onClick={() => handleVoteSubmit(vote.id)}
                                            disabled={!selectedChoices[vote.id]}
                                            className="vote-button"
                                        />
                                    ) : (
                                        <div className={styles.voteComplete}>
                                            <p>투표 완료! 총 {totalVotes}명이 참여했습니다.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>

            {votes.length > 1 && (
                <div className={styles.navigation}>
                    <button
                        className={`${styles.navButton} ${currentSlide === 0 ? styles.disabled : ''}`}
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                    >
                        이전
                    </button>
                    <button
                        className={`${styles.navButton} ${currentSlide === votes.length - 1 ? styles.disabled : ''}`}
                        onClick={nextSlide}
                        disabled={currentSlide === votes.length - 1}
                    >
                        다음
                    </button>
                </div>
            )}

            <div className={styles.bottomActions}>
                <ButtonComponent
                    text="뉴스로 돌아가기"
                    onClick={() => navigation('/news')}
                    className={styles.backButton}
                />
            </div>
        </div>
    );
}