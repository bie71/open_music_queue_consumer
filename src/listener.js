/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      const playlists = await this._playlistsService.getPlaylist(userId);
      const songs = await this._playlistsService.getPlaylistSongs(playlists.id);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify({
        playlist: {
          ...playlists,
          songs
        }
      }));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Listener;
