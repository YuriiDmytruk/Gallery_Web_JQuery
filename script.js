let images;
let currentImageID = 0;

const setImage = () => {
  $('#picture')
    .attr('src', images[currentImageID].src)
    .attr('alt', images[currentImageID].alt);
  $('#image-count').html(`${currentImageID + 1}/${images.length}`);
};

const createList = (index, image, $images) => {
  $images.append(`
          <div role='button' id="${index}" class="col">
            <div class="card h-100 user-select-none">
                <img src="${image.src}"
                    class="card-img-top h-75"
                    alt="${image.alt}">
                <div style="background-color: #acacae" class="card-body">
                    <div class="d-flex justify-content-center align-items-center card-title h5 h-100">${image.author}</div>
                </div>
            </div>
        </div>
        `);
};

$(function () {
  let $images = $('#card-list');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/',
    success: function (data) {
      images = data;
      $.each(images, function (index, image) {
        createList(index, image, $images);
      });
      $('#picture').attr('src', images[0].src).attr('alt', images[0].alt);
    },
  });
});

$(document).ready(function () {
  $(document)
    .on('mouseenter', '.col', function () {
      $('#' + $(this).attr('id'))
        .find('.card')
        .addClass('hover-card');
    })
    .on('mouseleave', '.col', function () {
      $('#' + $(this).attr('id'))
        .find('.card')
        .removeClass('hover-card');
    });

  $(document).on('click', '.card', function () {
    currentImageID = parseInt($(this).parent().attr('id'));
    setImage();
    $('#popup').modal('show');
  });

  $('#close-button').on('click', function () {
    $('#popup').modal('hide');
  });

  $('#next-button').on('click', function () {
    if (currentImageID !== images.length - 1) {
      currentImageID++;
      $('#picture').fadeOut('fast', function () {
        setImage();
        $('#picture').fadeIn('fast');
      });
    }
  });

  $('#prev-button').on('click', function () {
    if (currentImageID !== 0) {
      currentImageID--;
      $('#picture').fadeOut('fast', function () {
        setImage();
        $('#picture').fadeIn('fast');
      });
    }
  });

  $('#next-button')
    .on('mouseenter', function () {
      $('#right-arrow').attr('src', './images/black-arrow.png');
    })
    .on('mouseleave', function () {
      $('#right-arrow').attr('src', './images/white-arrow.png');
    });

  $('#prev-button')
    .on('mouseenter', function () {
      $('#left-arrow').attr('src', './images/black-arrow.png');
    })
    .on('mouseleave', function () {
      $('#left-arrow').attr('src', './images/white-arrow.png');
    });

  $('#logo').on('click', function () {
    $('#input').modal('show');
  });

  $('#button-add').on('click', function () {
    let $src = $('#input-src');
    let $alt = $('#input-alt');
    let $author = $('#input-author');
    let image = {
      src: $src.val(),
      alt: $alt.val(),
      author: $author.val(),
    };
    let $images = $('#card-list');
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4000/',
      data: JSON.stringify({ image }),
      contentType: 'application/json',
      success: function (data) {
        images = data;
        $images.html('');
        $.each(images, function (index, image) {
          createList(index, image, $images);
        });
        $('#picture').attr('src', images[0].src).attr('alt', images[0].alt);
      },
    });
  });
});
