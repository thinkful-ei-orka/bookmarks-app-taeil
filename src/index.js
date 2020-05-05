import api from './api.js';
import store from './store.js';
import add from './add.js';

$(function() {

});

const renderBookmarks = function() {
  store.adding = false;

  let html = '';
  let htmlHeader = `
    <h1>Bookmarks</h2>
    <div class="bookmarkButtons mb15">
      <button class="primary addBookmark">Add Bookmark</button>
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
      store.store.bookmarks = data;

      let bookmarksHtml = '<div class="bookmarks">';
      data.forEach(function(bookmarkData) {
        let descriptionHtml = '';

        if (bookmarkData.desc !== null) {
          descriptionHtml = `<p>${bookmarkData.desc}</p>`;
        }

        bookmarksHtml += `
        <div class="bookmark rating-${bookmarkData.rating}" data-id="${bookmarkData.id}">
          <button class="titleAndRating">
            <h2>${bookmarkData.title}</h2>
            <div class="rating rating-${bookmarkData.rating}">
              <span class="star star1"></span>
              <span class="star star2"></span>
              <span class="star star3"></span>
              <span class="star star4"></span>
              <span class="star star5"></span>
            </div>
            <img class="expand-icon" src="./img/icons8-expand-arrow-50.png" alt="expand icon">
          </button>
          <div class="description">
            ${descriptionHtml}
            <a href="${bookmarkData.url}" target="_blank" class="btn primary visitSite mr5">Visit Site</a>
            <button class="red remove">Remove</button>
          </div>
        </div>
        `;
      });

      bookmarksHtml += '</div>';
      let errorMessage = '<div class="errorMessage"></div>';
      html += htmlHeader + bookmarksHtml + errorMessage;

      $('main').html(html);
      handleEvents();
    });
};

const handleEvents = function() {
  $('.addBookmark').click(function() {
    add.renderAdd();
  });

  $('select').on('change', function() {
    $('.bookmarks').removeClass('min-0 min-1 min-2 min-3 min-4 min-5');
    store.filter = $(this).val();
    $('.bookmarks').addClass('min-' + store.filter);
  });

  $('.titleAndRating').click(function() {
    $(this).toggleClass('expand');
    $(this).siblings('.description').slideToggle();
  });

  $('.remove').click(function() {
    let id = $(this).parents('.bookmark').attr('data-id');
    api.deleteBookmark(id)
      .then(data => {
        store.deleteBookmark(id);
        renderBookmarks();
      });
  });
};

const displayError = function(error) {
  $('.errorMessage').html(error);
  $('.errorMessage').show();
};

$(function() {
  renderBookmarks();
});

export default {
  renderBookmarks,
  displayError
};
