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
    },

    async handleFollowToggle(username) {
        // try to follow if not already following
        // try to unfollow if already following
        try {
            await this.follow(username);
            return "followed";
        } catch (error) {
            if (error.response?.status !== 400) {
                throw error;
            }
        }

        try {
            await this.unfollow(username);
            return "unfollowed";
        }
        catch (error) {
            if (error.response?.status !== 400) {
                throw error;
            }
        }
    },

    async follow(username) {
        try {
            const response = await apiClient.post(`/follow/`, { username: username });
            return response.data;
        } catch (error) {
            log.error(`Error following user with ID ${username}:`, error);
            throw error;
        }
    },

    async unfollow(username) {
        try {
            const response = await apiClient.post(`/unfollow/`, { username: username });
            return response.data;
        } catch (error) {
            log.error(`Error unfollowing user with ID ${username}:`, error);
            throw error;
        }
    },

    async profileIdByUserId(userId) {
        try {
            const response = await apiClient.get(`/profiles/by-user-id/${userId}/`);
            return response.data.id;
        } catch (error) {
            log.error(`Error fetching profile ID for user with ID ${userId}:`, error);
            throw error;
        }
    },

    async userIdByProfileId(profileId) {
        try {
            const response = await apiClient.get(`/profiles/${profileId}/`);
            return response.data.user;
        } catch (error) {
            log.error(`Error fetching user ID for profile with ID ${profileId}:`, error);
            throw error;
        }
    },

    // is user following target user 
    // all props with id
    async isFollowing(user, target) {
        try{
            const response = await apiClient.get(`/profiles/by-user-id/${target}/`);
            const userProfileId = await this.profileIdByUserId(user);
            const followers = response.data.followers;
            console.log("followers", followers);
            console.log("userProfileId", userProfileId);
            if (followers.includes(userProfileId)) {
                return true;
            }
            return false;
        }
        catch (error) {
            log.error(`Error fetching followers for user with ID ${target}:`, error);
            throw error;
        }
    },

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