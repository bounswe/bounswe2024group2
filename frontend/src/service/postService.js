import { apiClient } from "./apiClient";
import ProfileService from "./profileService";

export const transformPost = async (post) => {
    let username = "Unknown";
    try {
        const response = ProfileService.profileIdByUserId(post.author);
        if (response) {
            username = response.username;
        }   
    } catch (error) {
        console.error(
        `Error fetching username for post ${post.id}:`,
        error
        );
    }

    try {
        const commentsResponse = await apiClient.get(
        `/comments/post-comments/${post.id}`
        );
        return {
        "post-id": post.id,
        user: username || "Unknown",
        title: post.title,
        content: [{ type: "plain-text", "plain-text": post.content }],
        comments: commentsResponse.data,
        likes: post.liked_by?.length || 0,
        tags: post.tags || [],
        "publication-date": new Date(post.created_at),
        };
    } catch (error) {
        console.error(
        `Error fetching comments for post ${post.id}:`,
        error
        );
        return {
        "post-id": post.id,
        user: username || "Unknown",
        title: post.title,
        content: [{ type: "plain-text", "plain-text": post.content }],
        comments: 0,
        likes: post.liked_by?.length || 0,
        tags: post.tags || [],
        "publication-date": new Date(post.created_at),
        };
    }
}
