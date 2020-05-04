const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

const addBookmarks = function(bookmarks) {
  /* Ignore. Bookmarks are added to store.bookmarks on page load. */
};

const addBookmark = function(bookmark) {
  store.bookmarks.push(bookmark);
};

const updateBookmark = function() {
  /* Optional */
};

const deleteBookmark = function(id) {
  store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
};

export default {
  store,
  addBookmarks,
  addBookmark,
  updateBookmark,
  deleteBookmark
};
