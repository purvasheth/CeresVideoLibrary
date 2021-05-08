export const isPresentInArray = (array, id) =>
  array.find((video) => video._id === id);

export const getDefaultPlaylistArray = (playlists, id) =>
  playlists.find(({ _id }) => id === _id);
