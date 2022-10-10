import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, TextareaHTMLAttributes, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface PostProps {
    author: {
        avatarUrl: string;
        name: string;
        role: string;
    };
    content: [{type: 'paragraph' | 'link', content: string}];
    publishedAt: Date;
}

export const Post = ({ author, content, publishedAt }: PostProps) => {
    const [comments, setComments] = useState(['Post very nice *-* xD']);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
    });

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleted = comments.filter((comment) => comment != commentToDelete);
        setComments(commentsWithoutDeleted);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((cont) => {
                    if (cont.type == 'paragraph') return <p key={cont.content}>{cont.content}</p>;
                    else
                        return (
                            <p key={cont.content}>
                                <a href={cont.content}>{cont.content} </a>
                            </p>
                        );
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    required
                    onInvalid={handleNewCommentInvalid}
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    placeholder="Deixe um comentário"
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment) => (
                    <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
                ))}
            </div>
        </article>
    );
};
