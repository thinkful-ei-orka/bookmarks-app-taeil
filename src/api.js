import store from './store.js';

const baseUrl = 'https://thinkful-list-api.herokuapp.com/taeil/';
const bookmarksUrl = baseUrl + 'bookmarks/';
// https://thinkful-list-api.herokuapp.com/endpoints/bookmarks

const callApi = function(url = bookmarksUrl, args = {}) {
  return fetch(url, args)
    .then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        let errorMessage = `${res.status}: ${res.statusText}`;
        store.error = errorMessage;
        alert(errorMessage);
        // The DOM hasn't loaded at this point.
      }
    })
    .then(data => {
      console.log('data returned', data);
      return data;
    })
    .catch(e => {
      store.error = e;
      $('.errorMessage').html(e);
    });
};

const getBookmarks = function() {
  return callApi();
};

const postBookmark = function(bookmark) {
  let args = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookmark),
  };

  return callApi(bookmarksUrl, args);
};

const updateBookmark = function(id) {
  let data = {
    id: id
  };

  let args = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return callApi(bookmarksUrl, args);
};

const deleteBookmark = function(id) {
  let url = bookmarksUrl + id;
  let data = {
    id: id
  };

  let args = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return callApi(url, args);
};

export default {
  getBookmarks,
  postBookmark,
  updateBookmark,
  deleteBookmark
};
