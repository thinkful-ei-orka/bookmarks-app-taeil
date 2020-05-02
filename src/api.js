const baseUrl = 'https://thinkful-list-api.herokuapp.com/taeil/';
// const itemsUrl = baseUrl + 'items/';
const bookmarksUrl = baseUrl + 'bookmarks/';
// https://thinkful-list-api.herokuapp.com/endpoints/bookmarks

const callApi = function(args = {}) {
  return fetch(bookmarksUrl, args)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
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

  return callApi(args);
};

const updateBookmark = function(id) {
  let data = {

  };

  let args = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return callApi(args);
};

const deleteBookmark = function(id) {


  let args = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return callApi(args);
};




export default {
  getBookmarks,
  postBookmark,
  updateBookmark,
  deleteBookmark
};
