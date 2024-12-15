import { apiClient } from './apiClient';
import log from '../utils/logger';

const ProfileService = {

    async fetchProfileById(id) {
        try {
            const response = await apiClient.get(`/profiles/${id}/`);
            return response.data;
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