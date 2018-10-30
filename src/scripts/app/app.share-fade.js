const $win = $(window);

const intersects = (el1, el2) => {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right);
}

export default (box) => {
  if ($win.width() < 768) { return false }

  const intersectSels = ['.kg-width-full', '.kg-width-wide'];
  let observe = [];

  $(intersectSels.join(',')).map(function () {
    observe.push(this);
  });

  if (!observe.length) { return false }

  $win.on('scroll', () => {
    let isHidden = false;
    const ele = box.get(0);

    for( let i in observe) {
      if( intersects( ele, observe[i]) ) {
        isHidden = true;
        break;
      }
    }

    if (isHidden) {
      box.addClass('is-hidden')
    } else {
      box.removeClass('is-hidden')
    }
  });
}
