import api from './api.js';
import store from './store.js';
import index from './index.js';

const renderAdd = function() {
  store.adding = true;

  let html = `
    <h1>Add Bookmark</h1>
    <form id="addForm">
      <fieldset>
        <label for="title">Title</label>
        <input type="text" id="title" name="title">
        <label for="url">URL Link</label>
        <input type="text" id="url" name="url">
        <label for="desc">Description <small>(optional)</small></label>
        <textarea id="desc" name="desc"></textarea>
        <label for="rating">Rating <small>(optional)</small></label>
        <input type="text" id="rating" name="rating">
        <div class="rating ratingSelect">
          <span class="star star1" data-value="1"></span>
          <span class="star star2" data-value="2"></span>
          <span class="star star3" data-value="3"></span>
          <span class="star star4" data-value="4"></span>
          <span class="star star5" data-value="5"></span>
        </div>
        <div class="formButtons">
          <input type="submit" value="Create" class="primary create mr5">
          <button type="button" class="gray cancel">Cancel</button>
        </div>
      </fieldset>
    </form>
    <div class="errorMessage">The Title and URL Link are required.</div>
  `;

  $('main').html(html);
  handleEvents();
};

const handleEvents = function() {
  $('.rating .star').click(function() {
    let rating = $(this).attr('data-value');
    $('#rating').val(rating);

    $(this).parents('.ratingSelect').removeClass('rating-1 rating-2 rating-3 rating-4 rating-5');
    $(this).parents('.ratingSelect').addClass('rating-' + rating);
  });

  $('form').submit(function(e) {
    e.preventDefault();
    clearErrors();
    handleFormSubmit();
  });

  $('.cancel').click(function() {
    index.renderBookmarks();
  });
};

const handleFormSubmit = function() {
  let form = document.getElementById('addForm');
  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((val, name) => formObject[name] = val);

  if (formObject.title === '' || formObject.url === '') {
    displayErrors(formObject.title, formObject.url);
  } else {
    formObject.url = normalizeUrl(formObject.url);
    formObject.rating = parseInt(formObject.rating);

    api.postBookmark(formObject)
      .then(data => {
        if (data.message) {
          store.error = data.message;
          $('.errorMessage').html(data.message);
          $('.errorMessage').show();
        } else {
          store.addBookmark(data);
          index.renderBookmarks();
        }
      });
  }
};

const normalizeUrl = function(url) {
  if (url.indexOf('http://') === -1 || url.indexOf('https://') === -1){
    return 'https://' + url;
  }
};

const displayErrors = function(title, url) {
  if (title === '' && url === '') {
    store.error = 'The Title and URL Link are required.';
    $('#title').addClass('error');
    $('#url').addClass('error');
  } else if (title === '') {
    store.error = 'The Title is required.';
    $('#title').addClass('error');
  } else {
    store.error = 'The URL Link is required.';
    $('#url').addClass('error');
  }
  $('.errorMessage').html(store.error);
  $('.errorMessage').show();
};

const clearErrors = function() {
  $('#title').removeClass('error');
  $('#url').removeClass('error');
  $('.errorMessage').hide();
};

export default {
  renderAdd
};
