
module.exports = (app) => {
    const services = app.services;

    return {

        index: async () => {
            return await services.spotifyApi.getProfile();
        },
        
        listening: async () => {
            return await services.spotifyApi.getProfileCurrentSong();
        },

        playlists: async () => {
            return await services.spotifyApi.profilePlaylists();
        },

        playlistTracks: async (playlistId) => {
            return await services.spotifyApi.playlistTracks(playlistId);
        },
        
        addPlaylist: async (name) => {
            return await services.spotifyApi.addPlaylist(name);
        },

        token: async(clientId, clientSecret, code, urlRedirect) => {
            return await services.spotifyApi.getToken(clientId, clientSecret, code, urlRedirect);
        },

        play: async() => {
            return await services.spotifyApi.playSong();
        },

        pause: async() => {
            return await services.spotifyApi.pauseSong();
        },

        back: async() => {
            return await services.spotifyApi.backSong();
        },

        forward: async() => {
            return await services.spotifyApi.forwardSong();
        },

        playlistInfo: async (playlistId) => {
            return await services.spotifyApi.getPlaylistInfo(playlistId);
        },

    };
};
