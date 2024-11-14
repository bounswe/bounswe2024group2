import React from 'react';
import { useParams } from 'react-router-dom';
import mockPosts from '../../data/mockPosts';
import FinancialGraph from './FinancialGraph';
import '../../styles/community/PostView.css';
import { FaNewspaper, FaImage, FaChartLine, FaThumbsUp, FaComment, FaUserPlus, FaCircle } from 'react-icons/fa';

const PostView = () => {
    const { postId } = useParams();
    const post = mockPosts.find(post => post["post-id"] === parseInt(postId));

    const getColorForTag = (tag) => {
        const asciiValue = tag.charCodeAt(0);
        const colors = [
            '#3498db', 
            '#e74c3c', 
            '#2ecc71', 
            '#f1c40f', 
            '#9b59b6'  
        ];
        return colors[asciiValue % 5]; 
    };

    if (!post) {
        return <p>Post not found!</p>;
    }

    return (
        <div className="post-view">
            <h1>{post.title}</h1>
            <div className="post-author">
                <p>By: {post['user']}</p>
                <p>Published on: {post['publication-date']}</p>
                <button className="follow-button">
                    <FaUserPlus /> Follow Author
                </button>
            </div>
            <div className="tags">
                {post.tags.map((tag, index) => (
                    <span key={index} className="tag" style={{ backgroundColor: getColorForTag(tag), color: '#ffffff' }}>
                        {tag}
                    </span>
                ))}
            </div>
            <div className="post-content">
                {post.content.map((content, index) => (
                    <div className="timeline-item" key={index}>
                        <span className="timeline-dot">
                            {content.type === 'plain-text' && <FaCircle className="icon" />}
                            {content.type === 'news' && <FaNewspaper className="icon" />}
                            {content.type === 'image' && <FaImage className="icon" />}
                            {content.type === 'graph' && <FaChartLine className="icon" />}
                        </span>
                        <div className="timeline-content">
                            {content.type === 'plain-text' && <p>{content["plain-text"]}</p>}
                            {content.type === 'news' && (
                                <div className="news">
                                    <a href={content["news-link"]} target="_blank" rel="noreferrer">
                                        <h3>{content["news-title"]}</h3>
                                        <p>{content["news-description"]}</p>
                                    </a>
                                    <p className="footer-label">Click the title for more details.</p>
                                </div>
                            )}
                            {content.type === 'image' && (
                                <div className="image">
                                    <img src={content["image-url"]} alt={content["image-alt"]} />
                                    <p className="footer-label">Image description: {content["image-alt"]}</p>
                                </div>
                            )}
                            {content.type === 'graph' && (
                                <div className="graph">
                                    <FinancialGraph />
                                    <p className="footer-label">Financial trends illustrated above.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="comments">
                <h2>Comments</h2>
                {post.comments.map(comment => (
                    <div key={comment["comment-id"]} className="comment">
                        <span className="comment-user">{comment.user}</span>
                        <p className="comment-text">{comment.comment}</p>
                    </div>
                ))}
            </div>
            <div className="post-actions">
                <button className="like-button">
                    <FaThumbsUp /> Like
                </button>
                <button className="comment-button">
                    <FaComment /> Comment
                </button>
            </div>
        </div>
    );
};

export default PostView;
