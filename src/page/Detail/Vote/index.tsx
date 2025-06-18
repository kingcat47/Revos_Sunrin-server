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
    const { id } = useParams<{ id: string }>();
    const [votes, setVotes] = useState<Vote[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState<{ [voteId: string]: string }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasVoted, setHasVoted] = useState(false);
    const navigation = useNavigate();

    // 투표 데이터 불러오기
    const fetchVotes = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000/get/votes_by_article/${id}`);
            if (Array.isArray(res.data)) {
                setVotes(res.data);
            } else {
                setVotes([]);
            }
        } catch {
            setVotes([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchVotes();
    }, [id]);

    const handleChoiceSelect = (voteId: string, choiceId: string) => {
        if (hasVoted) return;
        setSelectedChoices(prev => ({
            ...prev,
            [voteId]: choiceId
        }));
    };

    const handleAllVoteSubmit = async () => {
        const allSelected = votes.every(vote => selectedChoices[vote.id]);
        if (!allSelected) {
            alert('모든 투표에 선택지를 선택해주세요.');
            return;
        }

        try {
            const payload = votes.map(vote => ({
                voteId: vote.id,
                choiceId: selectedChoices[vote.id]
            }));

            const response = await axios.post('http://localhost:8000/post/vote/submit', payload);

            if (response.status === 200) {
                setHasVoted(true);
                // 투표 결과를 다시 불러옴
                fetchVotes();
            }
        } catch {
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
                        return (
                            <div className={styles.voteCard}>
                                <div className={styles.voteTitleContainer}>
                                    <h3 className={styles.voteTitle}>{vote.title}</h3>
                                </div>
                                <div className={styles.choices}>
                                    {vote.choices.map((choice) => {
                                        // 투표 전: 선택지 선택, 투표 후: 결과 표시
                                        const isSelected = selectedChoices[vote.id] === choice.id;
                                        return (
                                            <div
                                                key={choice.id}
                                                className={
                                                    hasVoted
                                                        ? styles.resultChoice
                                                        : `${styles.choice} ${isSelected ? styles.selected : ''}`
                                                }
                                                onClick={
                                                    hasVoted
                                                        ? undefined
                                                        : () => handleChoiceSelect(vote.id, choice.id)
                                                }
                                            >
                                                <div className={styles.choiceContent}>
                                                    <span className={styles.choiceText}>{choice.text}</span>
                                                    {hasVoted && (
                                                        <span className={styles.voteCount}>
                                                            {choice.vote_count}표
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.voteActions}>
                                    {hasVoted && (
                                        <div className={styles.voteComplete}>
                                            <p>투표 결과</p>
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
                {!hasVoted && currentSlide === votes.length - 1 && (
                    <ButtonComponent
                        text="투표하기"
                        onClick={handleAllVoteSubmit}
                        className={styles.submit}
                    />
                )}
                <ButtonComponent
                    text="뉴스로 돌아가기"
                    onClick={() => navigation('/news')}
                    className={styles.backButton}
                />
            </div>
        </div>
    );
}