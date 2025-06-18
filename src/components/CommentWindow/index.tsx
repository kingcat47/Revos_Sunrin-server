import { useState, useEffect } from "react";
import axios from "axios";
import styles from './styles.module.scss';
import InputComponent from "../Input";

interface Comment {
    id: number;
    user: string;
    text: string;
    created_at: string;
}

interface CommentWindowProps {
    voteId: string;
}

export default function CommentWindow({ voteId }: CommentWindowProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // 댓글 목록 불러오기
    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000/get/comments/${voteId}`);
            if (Array.isArray(res.data.comments)) {
                setComments(res.data.comments);
            } else {
                setComments([]);
            }
        } catch {
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line
    }, [voteId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // 댓글 등록
    const handleAddComment = async () => {
        if (!input.trim()) return;
        try {
            const payload = {
                vote_id: voteId,
                user: "익명", // 필요시 사용자 정보로 대체
                text: input
            };
            console.log("POST /post/comment payload:", payload); // 전송 데이터 로그
            const res = await axios.post(`http://localhost:8000/post/comment/`, payload);
            setComments(prev => [...prev, res.data]);
            setInput("");
        } catch {
            alert("댓글 등록에 실패했습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.commentList}>
                {loading ? (
                    <div className={styles.empty}>댓글 불러오는 중...</div>
                ) : !Array.isArray(comments) || comments.length === 0 ? (
                    <div className={styles.empty}>아직 댓글이 없습니다.</div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className={styles.commentItem}>
                            <span style={{fontWeight: 500, marginRight: 8}}>{comment.user}</span>
                            {comment.text}
                            <span style={{float: "right", color: "#aaa", fontSize: 12}}>
                                {new Date(comment.created_at).toLocaleString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.inputRow}>
                <InputComponent
                    className={styles.input}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="댓글을 입력하세요"
                />
                <button className={styles.addButton} onClick={handleAddComment}>
                    등록
                </button>
            </div>
        </div>
    );
}