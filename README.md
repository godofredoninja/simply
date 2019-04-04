# Simply free theme for [Ghost](https://github.com/tryghost/ghost/)

[![Ghost version](https://img.shields.io/badge/Ghost-2.x-brightgreen.svg)](https://github.com/TryGhost/Ghost)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/godofredoninja)

> *Simple and Elegant Theme*

Hello, I created this theme for Ghost with inspiration from [Medium](https://medium.com/).
It is available for free so you can use on your site. It is strictly forbidden to use it for commercial use. If you have any suggestions to improve the theme,  you can send me a tweet [@GodoFredoNinja](https://goo.gl/y3aivK).

## 🙏 Please, help me with a small donation [here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Y7UB5Q8GVN3HN&source=url) or [PayPal](https://www.paypal.me/godofredoninja). It'll help motivate me to update the theme with many improvements

[![donate](./donate.gif)](https://www.paypal.me/godofredoninja)

![Simply free theme for ghost](./screenshot.jpg)

## Demo

You can see Simply in action on my Page [Demo](https://goo.gl/V7moIY)

## Featured

- Support for different languages
- [AMP](https://github.com/godofredoninja/Hodor-AMP-Ghost) Template
- Includes 3 templates for Home Page
- Responsive Layout
- Blog Navigation
- Include sections to add ads
- Include Google Analytics Tracking use (Google Tag Manager)
- Custom Search Engine (works almost in all languages)
- Template Page Newsletter (Mailchimp)
- Template Page Podcast
- Template Page Tag
- Template Video Post Format
- Template Image post Format
- Template not Image
- Related Articles (6 articles)
- Previous and next button in the Post
- YouTube Subscribe Button in video post Format
- Links to Social Media
- 4 latest posts in the Sidebar (Author - Tag)
- Tags Cloud in the Sidebar (Author - Tag)
- Instagram random in (Post)
- Cover Image in (Home - Tag - Author)
- Page 404 (Multiple faces emoticons)
- Pagination Infinite Scroll
- Support for comments (Facebook or Disqus)
- Comment Counter (Facebook or Disqus)
- Buttons to share the article (Facebook - Twitter - Reddit - Linkedin - Pinterest - Whatsapp)
- Counter shared articles on Facebook
- YouTube, Vimeo, kickstarter, dailymotion => Responsive
- Varied colors to change the look of the theme
- Lazy load Image for better performance only in backgrounds
- Code syntax [Prismjs](http://prismjs.com/index.html#languages-list) Supported all syntax.

## Navigation

- [Web Browser Support for Simply](#web-browser-support-for-simply)
- [Ghost Settings](#ghost-settings)
- [Simply Settings](#simply-settings)
  - [Social Media Links](#social-media-links)
  - [YouTube Subscribe Button](#youtube-subscribe-button)
  - [Instagram](#instagram)
  - [Comments](#comments)
  - [Search](#search)
- [Theme Translation](#theme-translation)
- [AMP](#amp)
- [Home Page](#home-page)
- [Post Format](#post-format)
- [Tags Page](#tags-page)
- [Newsletter Page](#newsletter-page)
- [Podcast Page](#podcast-page)
- [Ads](#ads)
- [Change Theme Color](#change-theme-color)
- [Tracking Google Tag Mananger](#tracking-google-tag-mananger)
- [Warning - Note - Success](#warning---note---success)
- [PrismJS code syntax](#prismjs-code-syntax)

## Web Browser Support for Simply

Simply supports the following web [browsers](http://caniuse.com/#search=flexbox)

## Ghost Settings

> Enable Subscribers checkbox on the labs page in your Ghost admin panel.

![ghost labs](./documentation/labs.jpg)

## Simply Settings

> You don't have to add all the Simply configurations. only the ones you need

### Social Media Links

> Facebook and Twitter is not necessary because I use them from the ghost settings

Add the Social Links only for the services you want to appear in the header section of your website. Pay attention as enabling too many services will cause menu problems.

### YouTube Subscribe Button

Subscription Button of YouTube in Video Post Format. Add the Channel Name and Channel ID which can be found here [YouTube Advanced Settings](https://www.youtube.com/account_advanced)

### Instagram

> I get the last 10 images then show 6 randomly It will only be shown in the footer of the Post

First, you will need to get your account `userName` and `userId` and `accessToken` from the following URLs:

- userId: [codeofaninja.com/tools/find-instagram-user-id](https://codeofaninja.com/tools/find-instagram-user-id)
- accessToken: [instagram.pixelunion.net](http://instagram.pixelunion.net/)

### Comments

> Simply supports Disqus comments and Facebook comments as well as comment counting

**Disqus Comments** — First, you will need to get your account `disqusShortName`

**Facebook Comments** — Changing the Language (`en_US` - `es_ES` - `es_LA`) more information link below [language](https://developers.facebook.com/docs/plugins/comments/#language)

### Search

> The default search engine will only search the titles of the post

#### Setup a Custom integration

1. Go in your Ghost's dashboard -> Integrations -> Add custom integration
2. Set a name: GodoFredo Themes Search
3. Get the Content API Key and replace the demo key with this one
4. Get the admin domain. This will be different in some cases

```html
<script>
  var searchSettings = {
    key: 'ADD_YOUR_API_KEY',
    host: 'https://demo.ghost.io',
  };
</script>
```

The search engine that includes simply is very powerful, supports almost all languages and you can customize to your liking.

Read the following link to learn more about the search engine [Read More](https://github.com/HauntedThemes/ghost-search)

---

➡️ Copy the below script to `Settings -> Code Injection -> Blog Footer`

```html
<script>
/*====================================================
  SIMPLY SETTINGS & GLOBAL VARIABLES
====================================================*/

/* 01. Social Media Follow */
var followSocialMedia = {
  'youtube': 'https://...',
  'instagram': 'https://...',
  'snapchat': 'https://...',
  'dribbble': 'https://...',
  'github': 'https://...',
  'linkedin':'https://...',
  'spotify':'https://...',
  'codepen':'https://...',
  'behance':'https://...',
  'flickr':'https://...',
  'pinterest':'https://...',
  'telegram':'https://...',
  'rss':'https://...',
};

/* 02. YouTube Subscribe Button */
var youTube = {
  name: 'YOUR_CHANNEL_NAME',
  channelId: 'YOUR_CHANNEL_ID'
};

/* 03. Instagram */
var instagramFeed  = {
  token: 'Token_app_instagram',
  userId: 'User_ID',
  userName: 'User_Name',
};


/* 04. Comments */

/* Disqus Comments or Facebook Comments - choose only one*/
var disqusShortName = 'YOUR_DISQUS_SHORTCUT_HERE';
var facebookLocaleComments = 'en_US';

/* 05. Search Settings */
var searchSettings = {
  key: 'ADD_YOUR_API_KEY',
  host: 'https://demo.ghost.io',
  /* This is optional */
  options: {
    keys: [
        'title',
    ],
    limit: 10,
  },
  /* This is optional to perform filtering of the ghost api */
  api: {
    resource: 'posts',
    parameters: {
      limit: 'all',
      fields: ['title', 'slug'],
      filter: '',
      include: '',
      order: '',
      formats: '',
    },
  },
}
</script>
```

---

## Theme Translation

**Simply supports:**

- `en` — English default language
- `es` — Español
- `de` — German - By [dkbast](https://github.com/dkbast)
- `tr` — Turkish - By [Mertcan GÖKGÖZ](https://github.com/MertcanGokgoz)
- `fr-CA` — Canadian French - By [Pascal Andy](https://github.com/pascalandy)

![simply theme ghost Language](./documentation/language.png)

if you want to have in another language you just have to copy `locales>en.json` and rename the file then translate to your favorite language:

Just enter the [language/locale tag](https://www.w3schools.com/tags/ref_language_codes.asp) of the files to use (e.g.: `fr.json` for French, `zh.json` for Chinese, `ja.json` for Japanese)

## AMP

> Simply has a nice page for AMP

- Navigation
- links to followers in social media
- Tags
- Related Articles (6 articles)
- Buttons to share the article (Facebook - Twitter - Whatsapp)

To customize the AMP page [read here](https://github.com/godofredoninja/Hodor-AMP-Ghost)

## Home Page

> Simply - come with 3 Home page with different layout options

- First back up your routes in your ghost settings `Labs -> Routes -> Download current routes.yml`
- Re-download the Route and edit `routes.yml` line `collections -> template`
  - `index` — Masonry (Default)
  - `godo-template-sidebar` — Right Sidebar
  - `godo-template-grid` — Grid 3 Cols
- Once you have chosen save the file and upload again
- If do not observe changes restart ghost

```yaml
collections:
  /:
    permalink: /{slug}/
    template:
      # - godo-template-grid
      # - godo-template-sidebar
      - index
```

![Simply home page theme for ghost](./documentation/home-page.jpg)

## Post Format

![ghost post format](./documentation/post-format.png)

**Post Image** — The Featured image will become large size

**Post Not Image** — The featured image will not be displayed in the article (Post)

**Post Video** — The first video in the article will be large size. Supports formats

- vimeo
- Dailymotion
- Youtube
- Vid
- kickstarter

> Add video where convenient. When you change the theme you will not have problems and not have Problem in your AMP Template

## Tags Page

> A page will be displayed with all tags sorted from highest to lowest number of articles.

- To create the tags page you just have to create a new story
- Choose your favorite url and title
- Click the Turn this post into a static page checkbox
- Select the `Archive Tags` template from the Template dropdown
- Publish the page
- To add the page to the navigation

![Tag Archive](./documentation/tag-archive.jpg)

## Newsletter Page

- To create the Newsletter page you just have to create a new story
- Choose your favorite url and title
- Click the Turn this post into a static page checkbox
- Select the `Archive Newsletter` template from the Template dropdown
- Write the list as normal in your content
- To have the **Mailchimp** form copy the code and add an `HTML` section in Ghost then change the form action url.

Example: `<form action="https://ninja.us10.list-manage.com/subscribe/post?u=5c52d5a541f6ab2e8d6020e82&id=f5f6d462c4">`

```html
<!-- <godo-nesletter> Mailchimp -->
<div class="godo-ne">
  <!-- Replace => Action -->
  <form id="godo-form" class="godo-ne-form" action="YOUR_URL_OF_LIST_Mailchimp" method="get">
      <label for="fieldEmail">Email Address</label>
      <div class="godo-ne-form-group">
        <input class="godo-ne-input" name="EMAIL" type="email" placeholder="yourname@example.com" required="">
        <button class="godo-ne-button button" type="submit">Subscribe</button>
      </div>
      <small>No marketing campaigns. No jibber jabber. Unsubscribe anytime.</small>
  </form>
  <div class="godo-ne-success u-hide">
    <h3>✉️ Nice! Please check your email</h3>
    <p>Click on the link in your inbox to confirm your subscription</p>
  </div>
</div>
```

- **Testimonies** Copy the code and paste into an `HTML` section in Ghost

```html
<div class="godo-n-q">

  <div class="godo-n-q-i">
    <img src="https://blog.ghost.org/content/images/2018/04/tim.jpeg">
    <h3>Tim Cook</h3>
    <div class="godo-n-q-d">CEO, Apple</div>
    <blockquote>"This is a pretty fantastic newsletter tbh, I definitely recommend it"</blockquote>
  </div>

  <div class="godo-n-q-i u-hide-before-md">
    <img src="https://blog.ghost.org/content/images/2018/04/satya.jpg">
    <h3>Satya Nadella</h3>
    <div class="godo-n-q-d">CEO, Microsoft</div>
    <blockquote>"Finally, this newsletter is something we can really agree on"</blockquote>
  </div>

  <div class="godo-n-q-i u-hide-before-md">
    <img src="https://blog.ghost.org/content/images/2018/04/gravatar-j8.jpg">
    <h3>John O'Nolan</h3>
    <div class="godo-n-q-d">CEO, Ghost</div>
    <blockquote>"I should really get around to organising some quotes one of these days"</blockquote>
  </div>

</div>
```

- Publish the page
- To add the page to the navigation

![ghost nesletter](./documentation/newsletter.jpg)

## Podcast Page

- To create the Podcast Page you just have to create a new story
- Choose your favorite title
- Use the url `podcast`
- Click the Turn this post into a static page checkbox
- In your articles use the internal tags `#podcast`
- First back up your routes in your ghost settings `Labs -> Routes -> Download current routes.yml`
- Re-download the Route and edit `routes.yml` line `routes`

```yaml
routes:
  /podcast/:
    controller: channel
    filter: tag:[hash-podcast]
    data:
      post: page.podcast
    limit: 10
    template: godo-podcast
```

- In an `HTML` block in your ghost editor add this code for your content.

```html
<p class="spc-h-e">The Podcast</p>

<p class="spc-des">Updates and behind the scenes stories about the world of Ghost. Hosted by Ghost founders <em>John O'Nolan</em> &amp; <em>Hannah Wolfe</em>.</p>

<div class="spc-buttons">

    <a href="https://itunes.apple.com/">
    <img src="/assets/images/icon-itunes.png" alt="iTunes Logo" rel="presentation"/>
    <span>iTunes</span>
  </a>

  <a href="https://www.pocketcasts.com/">
    <img src="/assets/images/icon-pocketcasts.png" alt="Pocket Casts Logo" rel="presentation"/>
    <span>Pocket Casts</span>
  </a>

  <a href="https://anchor.fm/">
    <img src="/assets/images/icon-rss.png" style="height:15px" alt="RSS Icon" rel="presentation"/>
    <span>RSS</span>
  </a>

</div>
```

![Tag Archive](./documentation/podcast.jpg)

## Ads

Simply has sections to add your ads.

You have to enter the following directory `partials/ad` and add in each file your ad blocks.

```bash
./partials/ad
├── ad-article-footer.hbs
├── ad-article-header.hbs
├── ad-article-medium.hbs
├── ad-author-top.hbs
├── ad-home-footer.hbs
├── ad-home-medium.hbs
├── ad-home-top.hbs
├── ad-loop-footer.hbs
├── ad-loop-medium.hbs
├── ad-podcast-footer.hbs
├── ad-podcast-medium.hbs
├── ad-podcast-top.hbs
├── ad-sidebar.hbs
└── ad-tag-top.hbs
```

— It is important to add the following style in your ghost settings. in the section `Code injection -> Blog Header`

```html
<style>.godo-ad-article-top,.godo-ad-author-top,.godo-ad-home-top,.godo-ad-podcast-top,.godo-ad-tag-top{margin-top:30px}.godo-ad-article-medium,.godo-ad-footer,.godo-ad-home-medium,.godo-ad-medium,.godo-ad-podcast-footer,.godo-ad-podcast-medium{margin-bottom:30px}</style>
```

## Change Theme Color

> It is very easy to customize with your favorite colors.

![ghost themes colors](./documentation/colors.jpg)

To change the color of the Simply theme select one of the theme styles below and copy it into the:

`Setting -> Code Injection -> Blog Header`

```html
<!-- 1.- Theme Simply Deep Orange -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#ffc79e}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#fff}.menu-toggle span{background-color:#ffc79e}.link--accent,.u-accentColor--iconNormal{color:#b34e11;fill:#b34e11}.u-bgColor{background-color:#d25704}.button--primary{color:#b34e11;border-color:#b34e11}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#b34e11}.godo-ne-button:hover{background-color:#b34e11}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#d58b59}.listen-btn{color:#d25704;border-color:#d25704}.listen-btn:hover{background-color:#d25704}mark{background-image:linear-gradient(180deg,#ffe1c2,#ffe1c2)}</style>

<!-- 2.- Theme Simply Cyan -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#00787f}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#fff}.menu-toggle span{background-color:#00787f}.link--accent,.u-accentColor--iconNormal{color:#36aeb7;fill:#36aeb7}.u-bgColor{background-color:#6ac8cf}.button--primary{color:#36aeb7;border-color:#36aeb7}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#36aeb7}.godo-ne-button:hover{background-color:#36aeb7}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#6bc9d0}.listen-btn{color:#6ac8cf;border-color:#6ac8cf}.listen-btn:hover{background-color:#6ac8cf}mark{background-image:linear-gradient(180deg,#dff6f8,#dff6f8)}</style>

<!-- 3.- Theme Simply Blue Dark -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#c1cbdb}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#fff}.menu-toggle span{background-color:#c1cbdb}.link--accent,.u-accentColor--iconNormal{color:#1e3858;fill:#1e3858}.u-bgColor{background-color:#1e3757}.button--primary{color:#1e3858;border-color:#1e3858}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#1e3858}.godo-ne-button:hover{background-color:#1e3858}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(30,56,88,.54)}.listen-btn{color:#1e3757;border-color:#1e3757}.listen-btn:hover{background-color:#1e3757}mark{background-image:linear-gradient(180deg,#dff6f8,#dff6f8)}</style>

<!-- 4.- Theme Simply Red -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#ffbbb4}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#fff}.menu-toggle span{background-color:#ffbbb4}.link--accent,.u-accentColor--iconNormal{color:#c53236;fill:#c53236}.u-bgColor{background-color:#c43235}.button--primary{color:#c53236;border-color:#c53236}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#c53236}.godo-ne-button:hover{background-color:#c53236}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(197,50,54,.46)}.listen-btn{color:#c43235;border-color:#c43235}.listen-btn:hover{background-color:#c43235}mark{background-image:linear-gradient(180deg,#ffdcd6,#ffdcd6)}</style>

<!-- 5.- Theme Simply blue semi dark -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#c1cde6}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#fff}.menu-toggle span{background-color:#c1cde6}.link--accent,.u-accentColor--iconNormal{color:#3367d6;fill:#3367d6}.u-bgColor{background-color:#3367d6}.button--primary{color:#3367d6;border-color:#3367d6}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#3367d6}.godo-ne-button:hover{background-color:#3367d6}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(49,103,216,.43)}.listen-btn{color:#3367d6;border-color:#3367d6}.listen-btn:hover{background-color:#3367d6}mark{background-image:linear-gradient(180deg,rgba(49,103,216,.11),rgba(49,103,216,.13))}</style>

<!-- 6.- Theme Simply dark -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#b1aeae}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#ece9e9}.menu-toggle span{background-color:#b1aeae}.u-bgColor{background-color:#000}.button--primary{color:#000;border-color:#000}.godo-n-q-d,.godo-ne-form label,.ne-t{color:rgba(0,0,0,.84)}.godo-ne-button:hover{background-color:rgba(0,0,0,.84)}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#b1aeae}mark{background-image:linear-gradient(180deg,#f3f0ef,#f3f0ef)}</style>

<!-- 7.- Theme Simply Lavender -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#dce6fa}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#fcffff}.menu-toggle span{background-color:#dce6fa}.link--accent,.u-accentColor--iconNormal{color:#8da7d5;fill:#8da7d5}.u-bgColor{background-color:#8da7d5}.button--primary{color:#8da7d5;border-color:#8da7d5}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#8da7d5}.godo-ne-button:hover{background-color:#8da7d5}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#8da7d6}.listen-btn{color:#8da7d5;border-color:#8da7d5}.listen-btn:hover{background-color:#8da7d5}mark{background-image:linear-gradient(180deg,#ebf1ff,#ebf1ff)}</style>

<!-- 8.- Theme Simply Dark Green -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#b5dda8}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#f3ffea}.menu-toggle span{background-color:#b5dda8}.link--accent,.u-accentColor--iconNormal{color:#006400;fill:#006400}.u-bgColor{background-color:#006400}.button--primary{color:#006400;border-color:#006400}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#006400}.godo-ne-button:hover{background-color:#006400}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(3,101,0,.8)}.listen-btn{color:#006400;border-color:#006400}.listen-btn:hover{background-color:#006400}mark{background-image:linear-gradient(180deg,#defad3,#defad3)}</style>

<!-- 9.- Theme Simply Hot Pink   -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:#ffbfc6}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:#fff1f4}.menu-toggle span{background-color:#ffbfc6}.link--accent,.u-accentColor--iconNormal{color:#d43d5a;fill:#d43d5a}.u-bgColor{background-color:#d43d5a}.button--primary{color:#d43d5a;border-color:#d43d5a}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#d43d5a}.godo-ne-button:hover{background-color:#d43d5a}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(213,61,91,.6)}.listen-btn{color:#d43d5a;border-color:#d43d5a}.listen-btn:hover{background-color:#d43d5a}mark{background-image:linear-gradient(180deg,#ffdce1,#ffdce1)}</style>

<!-- 10.- Theme Simply White -->
<style>.nav-right a,.nav ul li a,.search-toggle{color:rgba(0,0,0,.54)}.nav-right a:hover,.nav ul li a.active,.nav ul li a:hover,.search-toggle:hover{color:rgba(0,0,0,.68)}.nav-wrap{box-shadow:0 2px 2px -2px rgba(0,0,0,.15)}.menu-toggle span{background-color:rgba(0,0,0,.54)}.u-bgColor{background-color:#fff}</style>
```

> If you don't like the colors above, then play with your favorite colors. Just change the colors in the following code

```html
<style>
    /* Nav */
    .nav-right a,
    .search-toggle,
    .nav ul li a { color: #FFBFC6 }

    .nav-right a:hover,
    .search-toggle:hover,
    .nav ul li a.active,
    .nav ul li a:hover { color: #FFF1F4  }

    .menu-toggle span {background-color: #FFBFC6 }

    /* links */
    .link--accent,
    .u-accentColor--iconNormal {
      color: rgba(212, 61, 90, 1);
      fill: rgba(212, 61, 90, 1);
    }

    /* Background Global */
    .u-bgColor { background-color:rgba(212, 61, 90, 1) }

    /* btn color  */
    .button--primary {
        color: rgba(212, 61, 90, 1);
        border-color: rgba(212, 61, 90, 1);
    }

    /* Newsletter */
    .godo-ne-form label,
    .godo-n-q-d,
    .ne-t { color: rgba(212, 61, 90, 1) }

    .godo-ne-button:hover { background-color: rgba(212, 61, 90, 1) }

    .ne-t::before,
    .ne-body::before,
    .ne-body::after { background-color: rgba(213, 61, 91, 0.6) }

    /* Podcast */
    .listen-btn {
        color: rgba(212, 61, 90, 1);
        border-color: rgba(212, 61, 90, 1)
    }
    .listen-btn:hover { background-color:rgba(212, 61, 90, 1) }

    /* mark */
    mark {background-image: linear-gradient(to bottom, rgba(255, 220, 225, 1), rgba(255, 220, 225, 1))}
</style>
```

## Tracking Google Tag Mananger

Simply keeps track of the user's actions on the page, for example:

- Header
  - Click Logo
  - Click Menu Name
  - Click Social Media
  - Click Search
- Sidebar
  - Click Sidebar post
  - Click Name of the sidebar Tag Cloud
- Article
  - Click Author Name
  - Click Author Avatar
  - Click Author Facebook
  - Click Author Twitter
  - Click Share
  - Click Next Post
  - Click Prev Post
  - Click Related Post
  - Click Name of Tag
  - Click Comments Button

### Settings Google Tag Mananger

With [Google Tag Manager](https://tagmanager.google.com), there are a million different ways to make your tagging setup leaner and more flexible.

> I'll use an easy way to reduce redundancy here. It's the generic event tag 😊 you guessed it!

— What are you waiting? 🖐 hands in action.

#### First we'll create triggers

1. Click Triggers
2. New
3. Name of the Trigger
4. Select Custom Event
5. Name of the Event

— If you do not understand. look at the image

![Google tag Mananger Trigger](./documentation/analytics01.jpg)

#### Second we'll create Tag

1. Click tags
2. New
3. Name of the Tag
4. Select Google Analytics
5. Track Type `Event`
6. `{{Event Category}}`
7. `{{Event Action}}`
8. `{{Event Label}}`
9. `{{Event Value}}`
10. Non-Interaction Hit `true`
11. Here you have to add your Google Analytics code. I have my Google Analytics code in a Global variable. I select my global variable
12. Triggering — Select the trigger we created first

— If you do not understand. look at the image

![Google tag Mananger tag](./documentation/analytics02.jpg)

#### Third Insert code

🤔 *You can improve the code. I'll leave that to your imagination.*

➡️ Copy the below script to `Settings -> Code Injection -> Blog Footer`

```html
<script>
  /* Tracking With Google Tag Mananger*/
   $('.godo-tracking').bind('click', function (e) {
    var $this = $(this);
    var godoCategory = $this.attr('data-event-category');
    var godoAction = $this.attr('data-event-action');
    var godoLabel = $this.attr('data-event-label');
    var godoValue = $this.attr('data-event-non-interaction');

    dataLayer.push({
      'event' : 'godoGhostEvent',
      'eventCategory' : godoCategory,
      'eventAction' : godoAction,
      'eventLabel' : godoLabel,
      'eventValue' : godoValue,
    });
  });
</script>
```

## Warning - Note - Success

> It is very important to add in the block of `Markdown` or `HTML`

Add some more styling options to your articles text with these three styles.

![simply warning note success](./documentation/note.png)

### PrismJS code syntax

> It is very important to add your code in the block of `Markdown`

Make your code stand out with the PrismJS code highlighter.
PrismJS allows you to select which languge you embeded and performs code highlighting according to the language. Neat!

Take a look at the [Prismjs Supported Language List](http://prismjs.com/#languages-list)

![ghost code syntax](./documentation/prism.png)

### Credits

- [Hodor AMP](https://github.com/godofredoninja/Hodor-AMP-Ghost)
- [Normalize](https://necolas.github.io/normalize.css/)
- [Ghost Search](https://github.com/HauntedThemes/ghost-search)
- [Fuzzysort](https://github.com/farzher/fuzzysort)
- [Prismjs](http://prismjs.com/)
- [Theia Sticky Sidebar](https://github.com/WeCodePixels/theia-sticky-sidebar)
- [zoom.js](https://github.com/fat/zoom.js/)
- [lazysizes](https://github.com/aFarkas/lazysizes)
- [Fonts](https://fonts.google.com/?selection.family=Merriweather:300,400,700|Source+Code+Pro|Source+Sans+Pro:300,400,600,700&query=Merriweather)

## Copyright & License

Copyright (c) 2018 GodoFredoNinja - Released under the [CC BY-NC 4.0](LICENSE).
