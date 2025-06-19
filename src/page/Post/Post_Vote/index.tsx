import React, { useState } from "react";
import styles from "./styles.module.scss";
import { InputComponent, ButtonComponent } from "../../../components/index";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

interface Choice {
    text: string;
}

interface Vote {
    title: string;
    choices: Choice[];
}

export default function Post_Vote_Page() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigation = useNavigate();
    const location = useLocation();
    // 글 작성 후 vote 페이지로 이동할 때 articleId를 state로 넘겨받는다고 가정
    const articleId = location.state?.articleId;

    const [votes, setVotes] = useState<Vote[]>([
        { title: "", choices: [{ text: "" }] },
        { title: "", choices: [{ text: "" }] },
        { title: "", choices: [{ text: "" }] }
    ]);

    const handleVoteTitleChange = (voteIndex: number, title: string) => {
        setVotes(votes.map((vote, idx) =>
            idx === voteIndex ? { ...vote, title } : vote
        ));
    };

    const handleAddChoice = (voteIndex: number) => {
        setVotes(votes.map((vote, idx) => {
            if (idx === voteIndex && vote.choices.length < 5) {
                return {
                    ...vote,
                    choices: [...vote.choices, { text: "" }]
                };
            }
            return vote;
        }));
    };

    const handleRemoveChoice = (voteIndex: number, choiceIndex: number) => {
        setVotes(votes.map((vote, idx) => {
            if (idx === voteIndex && vote.choices.length > 1) {
                return {
                    ...vote,
                    choices: vote.choices.filter((_, cIdx) => cIdx !== choiceIndex)
                };
            }
            return vote;
        }));
    };

    const handleChoiceChange = (voteIndex: number, choiceIndex: number, text: string) => {
        setVotes(votes.map((vote, idx) => {
            if (idx === voteIndex) {
                return {
                    ...vote,
                    choices: vote.choices.map((choice, cIdx) =>
                        cIdx === choiceIndex ? { ...choice, text } : choice
                    )
                };
            }
            return vote;
        }));
    };

    const handleSubmit = async () => {
        const validVotes = votes.filter(vote =>
            vote.title.trim() !== '' &&
            vote.choices.length > 0 &&
            vote.choices.every(choice => choice.text.trim() !== '')
        );

        if (validVotes.length === 0) {
            alert('최소 하나 이상의 유효한 투표가 필요합니다.');
            return;
        }

        if (!articleId) {
            alert('게시글 정보가 없습니다.');
            return;
        }

        const payload = {
            articleId: articleId,
            votes: validVotes
        };

        try {
            const response = await axios.post('http://localhost:8000/post/vote/create', payload);
            if (response.status === 200) {
                alert('투표가 성공적으로 생성되었습니다.');
                navigation('/news');
            }
        } catch (error) {
            console.error('투표 생성 중 오류 발생:', error);
            alert('투표 생성 중 오류가 발생했습니다.');
        }
    };

    const nextSlide = () => {
        if (currentSlide < 2) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className={styles.container}>
            <h1>투표 생성</h1>
            <div className={styles.form}>
                <div
                    className={styles.slides}
                    style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
                >
                    {votes.map((vote, voteIndex) => (
                        <div key={voteIndex} className={styles.voteSection}>
                            <div className={styles.voteContent}>
                                <div className={styles.voteHeader}>
                                    <h2>투표 {voteIndex + 1}</h2>
                                </div>

                                <div className={styles.inputGroup}>
                                    <span className={styles.label}>투표 제목</span>
                                    <InputComponent
                                        value={vote.title}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleVoteTitleChange(voteIndex, e.target.value)}
                                        placeholder="투표 제목을 입력하세요"
                                    />
                                </div>

                                <div className={styles.choices}>
                                    <h3>선택지</h3>
                                    {vote.choices.map((choice, choiceIndex) => (
                                        <div key={choiceIndex} className={styles.choice}>
                                            <InputComponent
                                                value={choice.text}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    handleChoiceChange(voteIndex, choiceIndex, e.target.value)}
                                                placeholder="선택지 내용을 입력하세요"
                                            />
                                            {vote.choices.length > 1 && (
                                                <ButtonComponent
                                                    onClick={() => handleRemoveChoice(voteIndex, choiceIndex)}
                                                    text="삭제"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    {vote.choices.length < 5 && (
                                        <ButtonComponent
                                            onClick={() => handleAddChoice(voteIndex)}
                                            text="선택지 추가"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.navigation}>
                <button
                    className={styles.navButton}
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                >
                    이전
                </button>
                <button
                    className={styles.navButton}
                    onClick={nextSlide}
                    disabled={currentSlide === 2}
                >
                    다음
                </button>
            </div>

            <div className={styles.submitSection}>
                <ButtonComponent
                    onClick={handleSubmit}
                    className={styles.submit}
                    text="투표 생성하기"
                />
            </div>
        </div>
    );
}