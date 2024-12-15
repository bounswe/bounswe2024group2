import { apiClient } from './apiClient';
import log from '../utils/logger';

const transformProfile = (userData, profile, posts, comments, portfolios) => {
    console.log("Transforming profile data:", userData, profile, posts, comments, portfolios);
    profile = {
        ...profile,
        username: userData.username,
        // TODO list
        badges: [
        ],
        name: "Not Set",
        followingCnt: profile?.following?.length || 0,
        followersCnt: profile?.followers?.length || 0,
        postsCnt: posts.length || 0,
        commentsCnt: comments.length || 0,
        portfoliosCnt: portfolios.length || 0,
    };
    return profile;
};

const ProfileService = {

    async fetchUserById(id) {
        try {
            const response = await apiClient.get(`/users/${id}/`);
            return response.data;
        } catch (error) {
            log.error(`Error fetching user with ID ${id}:`, error);
            throw error;
        }
    },

    async fetchProfileById(id) {
        try {
            const userData = await this.fetchUserById(id);
            const posts = await this.fetchPostsByProfileId(id);
            const comments = await this.fetchCommentsByProfileId(id);
            const portfolios = await this.fetchPortfoliosByProfileId(id);

            const response = await apiClient.get(`/profiles/by-user-id/${id}/`);
            
            return transformProfile(userData, response.data, posts, comments, portfolios);
        } catch (error) {
            log.error(`Error fetching profile with ID ${id}:`, error);
            throw error;
        }
    },

    async fetchPostsByProfileId(id) {
        try {
            const response = await apiClient.get(`/posts/post-by-user/${id}/`);
            return response.data;
        } catch (error) {
            log.error(`Error fetching posts for profile with ID ${id}:`, error);
            return [];
        }
    },

    async fetchPortfoliosByProfileId(id) {
        console.log("Not implemented");
        return [];
    },

    async fetchCommentsByProfileId(id) {
        console.log("Not implemented");
        return [];
    }

    // async fetchCommentsByProfileId(id) {
    //     try {
    //         const response = await apiClient.get(`/profiles/${id}/comments/`);
    //         return response.data;
    //     } catch (error) {
    //         log.error(`Error fetching comments for profile with ID ${id}:`, error);
    //         throw error;
    //     }
    // }

};

export default ProfileService;