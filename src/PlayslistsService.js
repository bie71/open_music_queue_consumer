/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(owner) {
    const query = {
      text: `SELECT p.id, p.name FROM playlists p
      left JOIN collaborations c ON c.playlist_id = p.id
      JOIN users u ON p.owner =  u.id WHERE p.owner = $1 or c.user_id  = $1`,
      values: [owner],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: 'SELECT s.id, s.title, s.performer FROM playlistsongs p INNER JOIN songs s ON p.playlist_id  = $1 AND s.id = p.song_id',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
