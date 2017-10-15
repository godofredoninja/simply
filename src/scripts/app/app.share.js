/*
* @package godofredoninja
* Share social media
*/

class simplyShare {
  constructor(elem) {
    this.elem = elem;
    this.popWidth = 600;
    this.popHeight = 480;
    this.left = ((window.innerWidth / 2) - (this.popWidth / 2)) + window.screenX;
    this.top = ((window.innerHeight / 2) - (this.popHeight / 2)) + window.screenY;
  }

  /**
   * @description Helper to get the attribute of a DOM element
   * @param {String} attr DOM element attribute
   * @returns {String|Empty} returns the attr value or empty string
   */
  attributes(a) {
    const val = this.elem.attr(`data-${a}`);
    return (val === undefined || val === null) ? false : val;
  }

  /**
   * @description Main share event. Will pop a window or redirect to a link
   */
  share() {
    const socialMediaName = this.attributes('share').toLowerCase();

    const socialMedia = {
      facebook: {
        shareUrl: 'https://www.facebook.com/sharer.php',
        params: {
          u: this.attributes('url'),
        },
      },
      twitter: {
        shareUrl: 'https://twitter.com/intent/tweet/',
        params: {
          text: this.attributes('title'),
          url: this.attributes('url'),
        },
      },
      reddit: {
        shareUrl: 'https://www.reddit.com/submit',
        params: {
          url: this.attributes('url'),
        },
      },
      pinterest: {
        shareUrl: 'https://www.pinterest.com/pin/create/button/',
        params: {
          url: this.attributes('url'),
          description: this.attributes('title'),
        },
      },
      linkedin: {
        shareUrl: 'https://www.linkedin.com/shareArticle',
        params: {
          url: this.attributes('url'),
          mini: true,
        },
      },
      whatsapp: {
        shareUrl: 'whatsapp://send',
        params: {
          text: this.attributes('title') + ' ' + this.attributes('url'),
        },
        isLink: true,
      },
      pocket: {
        shareUrl: 'https://getpocket.com/save',
        params: {
          url: this.attributes('url'),
        },
      },
    };

    const social = socialMedia[socialMediaName];

    return social !== undefined ? this.popup(social) : false;
  }

  /* windows Popup */
  popup(share) {
    const p = share.params || {};
    const keys = Object.keys(p);

    let socialMediaUrl = share.shareUrl;
    let str = keys.length > 0 ? '?' : '';

    Object.keys(keys).forEach((i) => {
      if (str !== '?') {
        str += '&';
      }

      if (p[keys[i]]) {
        str += `${keys[i]}=${encodeURIComponent(p[keys[i]])}`;
      }
    });

    socialMediaUrl += str;

    if (!share.isLink) {
      const popParams = `scrollbars=no, width=${this.popWidth}, height=${this.popHeight}, top=${this.top}, left=${this.left}`;
      const newWindow = window.open(socialMediaUrl, '', popParams);

      if (window.focus) {
        newWindow.focus();
      }
    } else {
      window.location.href = socialMediaUrl;
    }
  }
}

/* Export Class */
module.exports = simplyShare;
