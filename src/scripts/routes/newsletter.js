function mailchimpRegister($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
    data: $form.serialize(),
    cache: false,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',

    beforeSend: () => $('body').addClass('is-loading'),

    success: data => {
      if (data.result === 'success') {
        $('.godo-ne-input').removeClass('error');
        $('.godo-ne-success').removeClass('u-hide');
        $form.addClass('u-hide');
        $('.godo-ne-input').val('');
      } else {
        $('.godo-ne-input').addClass('error');
      }
    },

    complete: () => setTimeout(() => $('body').removeClass('is-loading'), 700),
    // error: err => console.log(err),
  });

  return false;
}

export default {
  init() {
    const $form = $('#godo-form');

    $form.submit(function (e) {
      e.preventDefault();
      mailchimpRegister($form);
    });
  },
}
