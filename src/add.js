import api from './api.js';
import store from './store.js';
import index from './index.js';

const renderAdd = function() {
  let html = `
    <h1>Add Bookmark</h1>
    <form>
      <fieldset>
        <label for="title">Title</label>
        <input type="text" id="title">
        <label for="url">URL Link</label>
        <input type="text" id="url">
        <label for="description">Description <small>(optional)</small></label>
        <textarea id="description"></textarea>
        <label for="rating">Rating <small>(optional)</small></label>
        <input type="text" id="rating">
        <div class="rating ratingSelect">
          <span class="star star1" data-value="1"></span>
          <span class="star star2" data-value="2"></span>
          <span class="star star3" data-value="3"></span>
          <span class="star star4" data-value="4"></span>
          <span class="star star5" data-value="5"></span>
        </div>
        <div class="formButtons">
          <input type="submit" value="Create" class="primary create mr5">
          <button class="gray cancel">Cancel</button>
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
  let title = $('#title').val();
  let url = $('#url').val();
  let description = $('#description').val();
  let rating = parseInt($('#rating').val());



  if (title === '' || url === '') {
    displayErrors(title, url);
  } else {
    let bookmark = {
      title: title,
      url: url,
      description: description,
      rating: rating
    };
    console.log(bookmark);
    api.postBookmark(bookmark)
      .then(data => {
        if (data.message) {
          $('.errorMessage').html(data.message);
          $('.errorMessage').show();
        }
      });
  }
};

const displayErrors = function(title, url) {
  let errorMessage = '';
  if (title === '' && url === '') {
    errorMessage = 'The Title and URL Link are required.';
    $('#title').addClass('error');
    $('#url').addClass('error');
  } else if (title === '') {
    errorMessage = 'The Title is required.';
    $('#title').addClass('error');
  } else {
    errorMessage = 'The URL Link is required.';
    $('#url').addClass('error');
  }
  $('.errorMessage').html(errorMessage);
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
