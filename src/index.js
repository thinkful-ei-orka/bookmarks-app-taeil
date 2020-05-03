import api from './api.js';
import store from './store.js';
import add from './add.js';

/* What functionality is this site going to have?

- Pull from the API
- Update the store

- Render the bookmarks page
- Render the add page

- Filter bookmarks page

Bookmarks
-
*/

const renderBookmarks = function() {
  let html = '';
  let htmlHeader = `
    <h1>Bookmarks</h2>
    <div class="bookmarkButtons mb15">
      <button class="primary addBookmark mr5">Add Bookmark</button>
      <select>
        <option value="0">Minimum Rating</option>
        <option value="5">5 Star</option>
        <option value="4">4+ Star</option>
        <option value="3">3+ Star</option>
        <option value="2">2+ Star</option>
        <option value="1">1+ Star</option>
      </select>
    </div>
  `;

  api.getBookmarks()
    .then(data => {
      console.log(data);

      let bookmarksHtml = '<div class="bookmarks">';
      data.forEach(function(bookmarkData) {
        bookmarksHtml += `
        <div class="bookmark" data-id="${bookmarkData.id}">
          <div class="titleAndRating">
            <h2>${bookmarkData.title}</h2>
            <div class="rating rating-${bookmarkData.rating}">
              <span class="star star1"></span>
              <span class="star star2"></span>
              <span class="star star3"></span>
              <span class="star star4"></span>
              <span class="star star5"></span>
            </div>
            <img class="expand-icon" src="./img/icons8-expand-arrow-50.png">
          </div>
          <div class="description">
            <p>${bookmarkData.description}</p>
            <a href="${bookmarkData.url}" class="btn primary visitSite mr5">Visit Site</a>
            <button class="red remove">Remove</button>
          </div>
        </div>
        `;
      });

      bookmarksHtml += '</div>';
      html += htmlHeader + bookmarksHtml;

      $('main').html(html);
      handleEvents();
    });
};

const handleEvents = function() {
  $('.addBookmark').click(function() {
    add.renderAdd();
  });

  $('.titleAndRating').click(function() {

  });
};



$(function() {
  renderBookmarks();
});

export default {
  renderBookmarks
};
