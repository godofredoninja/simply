# Simply free theme for [Ghost](https://github.com/tryghost/ghost/)

[![Ghost version](https://img.shields.io/badge/Ghost-2.x-brightgreen.svg)](https://github.com/TryGhost/Ghost)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/godofredoninja)

> *Simple and Elegant Theme.*

Hello, I created this theme for Ghost with inspiration from [Medium](https://medium.com/).
It is available for free so you can use on your site. It is strictly forbidden to use it for commercial use. If you have any suggestions to improve the theme,  you can send me a tweet [@GodoFredoNinja](https://goo.gl/y3aivK)

## If you have a ❤ heart and value my work. 🙏 Please, help me with a small donation on [Paypal](https://www.paypal.me/godofredoninja) or [Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Y7UB5Q8GVN3HN&source=url). It'll help motivate me to update the theme with many improvements

[![donate](./donate.gif)](https://www.paypal.me/godofredoninja)

![Simply free theme for ghost](./screenshot.jpg)

## Demo

You can see Simply in action on my Page [Demo](https://goo.gl/V7moIY)

## Featured

- Support for different languages
- [AMP](https://github.com/godofredoninja/Hodor-AMP-Ghost) Template
- Includes 4 templates for Home Page
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
- 4 latest posts in the Sidebar
- Tags Cloud in the Sidebar
- Instagram random in (Post)
- Page 404 (Multiple faces emoticons)
- Pagination Infinite Scroll
- Support for comments (Facebook or Disqus)
- Comment Counter (Facebook or Disqus)
- Buttons to share the article (Facebook - Twitter - Whatsapp)
- YouTube, Vimeo, kickstarter, dailymotion => Responsive
- Varied colors to change the look of the theme
- Lazy load Image for better performance only in backgrounds
- Code syntax [Prismjs](http://prismjs.com/index.html#languages-list) Supported all syntax.

## Table of Contents

- [Web Browser Support for Simply](#web-browser-support-for-simply)
- [Ghost Settings](#ghost-settings)
- [Simply Settings](#simply-settings)
  - [Social Media Links](#1-social-media-links)
  - [YouTube Subscribe Button](#2-youtube-subscribe-button)
  - [Instagram](#3-instagram)
  - [Comments](#4-comments)
  - [Search](#5-search)
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
- [PrismJS code syntax](#prismjs-code-syntax)

## Web Browser Support for Simply

Simply supports the following web [browsers](http://caniuse.com/#search=flexbox)

## Ghost Settings

> Enable Subscribers checkbox on the labs page in your Ghost admin panel.

![ghost labs](./documentation/ghost-settings.jpg)

## Simply Settings

> You don't have to add all the Simply configurations. only the ones you need

### 1. Social Media Links

> Facebook and Twitter is not necessary because I use them from the ghost settings

Add the Social Links only for the services you want to appear in the header section of your website. Pay attention as enabling too many services will cause menu problems.

➡️ `Dashboard -> Code injection -> Site Footer`

```html
<script>
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
</script>
```

### 2. YouTube Subscribe Button

Subscription Button of YouTube in Video Post Format. Add the Channel Name and Channel ID which can be found here [YouTube Advanced Settings](https://www.youtube.com/account_advanced)

➡️ `Dashboard -> Code injection -> Site Footer`

```html
<script>
  var youTube = {
    name: 'YOUR_CHANNEL_NAME',
    channelId: 'YOUR_CHANNEL_ID'
  };
</script>
```

### 3. Instagram

> I get the last 10 images then show 6 randomly It will only be shown in the footer of the Post

First, you will need to get your account `userName` and `userId` and `accessToken` from the following URLs:

- userId: [codeofaninja.com/tools/find-instagram-user-id](https://codeofaninja.com/tools/find-instagram-user-id)
- accessToken: [instagram.pixelunion.net](http://instagram.pixelunion.net/)

➡️ `Dashboard -> Code injection -> Site Footer`

```html
<script>
  var instagramFeed  = {
    token: 'Token_app_instagram',
    userId: 'User_ID',
    userName: 'User_Name',
  };
</script>
```

### 4. Comments

> Simply supports Disqus comments and Facebook comments as well as comment counting

**Disqus Comments** — First, you will need to get your account `disqusShortName`

➡️ `Dashboard -> Code injection -> Site Footer`

```html
<script>
  var disqusShortName = 'YOUR_DISQUS_SHORTCUT_HERE';
</script>
```

**OR**

**Facebook Comments** — Changing the Language (`en_US` - `es_ES` - `es_LA`) more information link below [language](https://developers.facebook.com/docs/plugins/comments/#language)

➡️ `Dashboard -> Code injection -> Site Footer`

```html
<script>
  var facebookLocaleComments = 'en_US';
</script>
```

### 5. Search

> The default search engine will only search the titles of the post

**Setup a Custom integration**

1. Go in your Ghost's `dashboard -> Integrations -> Add custom integration`
2. Set a name: `GodoFredo Themes Search`
3. Get the Content API Key and replace the demo key with this one
4. Get the admin domain. This will be different in some cases

➡️ `Dashboard -> Code injection -> Site Footer`

```html
<script>
  var searchSettings = {
    key: 'ADD_YOUR_API_KEY',
    host: 'https://demo.ghost.io',
  };
</script>
```

OR - Adding parameters to the search

```html
<script>
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

The search engine that includes simply is very powerful, supports almost all languages and you can customize to your liking.

Read the following link to learn more about the search engine [Read More](https://github.com/HauntedThemes/ghost-search)

---

## Theme Translation

**Simply supports:**

- `en` — English default language
- `es` — Español
- `de` — German - By [dkbast](https://github.com/dkbast)
- `tr` — Turkish - By [Mertcan GÖKGÖZ](https://github.com/MertcanGokgoz)
- `fr-CA` — Canadian French - By [Pascal Andy](https://github.com/pascalandy)

![simply theme ghost Language](./documentation/language.jpg)

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

- **Medium** - Rename the file `home-medium.hbs` to `home.hbs`

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

![Simply home page theme for ghost styles](./documentation/home-page-2.jpg)

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
<style>.u-bgheader{background-color:#d25704}.u-menu-color,.u-menu-color a{color:#ffc79e}.nav-logo,.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fff}.menu-toggle span{background-color:#ffc79e}.link--accent,.u-primary-color{color:#b34e11}.button--primary{color:#b34e11;border-color:#b34e11}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#b34e11}.godo-ne-button:hover{background-color:#b34e11}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#d58b59}.listen-btn{color:#d25704;border-color:#d25704}.listen-btn:hover,.subscribe-btn{background-color:#d25704}mark{background-image:linear-gradient(180deg,#ffe1c2,#ffe1c2)}</style>

<!-- 2.- Theme Simply Cyan -->
<style>.u-bgheader{background-color:#6ac8cf}.u-menu-color,.u-menu-color a{color:#116468}.nav-logo,.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fff}.menu-toggle span{background-color:#116468}.link--accent,.u-primary-color{color:#277d83;fill:#277d83}.button--primary{color:#277d83;border-color:#277d83}.subscribe-btn{background-color:#277d83}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#36aeb7}.godo-ne-button:hover{background-color:#36aeb7}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#6bc9d0}.listen-btn{color:#277d83;border-color:#277d83}.listen-btn:hover{background-color:#277d83}mark{background-image:linear-gradient(180deg,#dff6f8,#dff6f8)}</style>

<!-- 3.- Theme Simply Blue Dark -->
<style>.u-bgheader{background-color:#1e3757}.u-menu-color,.u-menu-color a{color:#c1cbdb}.nav-logo,.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fff}.menu-toggle span{background-color:#c1cbdb}.link--accent,.u-primary-color{color:#1e3858;fill:#1e3858}.button--primary{color:#1e3858;border-color:#1e3858}.subscribe-btn{background-color:#1e3757}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#1e3858}.godo-ne-button:hover{background-color:#1e3858}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(30,56,88,.54)}.listen-btn{color:#1e3757;border-color:#1e3757}.listen-btn:hover{background-color:#1e3757}mark{background-image:linear-gradient(180deg,#dff6f8,#dff6f8)}</style>

<!-- 4.- Theme Simply Red -->
<style>.u-bgheader{background-color:#c43235}.u-menu-color,.u-menu-color a{color:#ffbbb4}.nav-logo,.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fff}.menu-toggle span{background-color:#ffbbb4}.link--accent,.u-primary-color{color:#c53236;fill:#c53236}.button--primary{color:#c53236;border-color:#c53236}.subscribe-btn{background-color:#c43235}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#c53236}.godo-ne-button:hover{background-color:#c53236}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(197,50,54,.46)}.listen-btn{color:#c43235;border-color:#c43235}.listen-btn:hover{background-color:#c43235}mark{background-image:linear-gradient(180deg,#ffdcd6,#ffdcd6)}</style>

<!-- 5.- Theme Simply blue semi dark -->
<style>.u-bgheader{background-color:#3367d6}.u-menu-color,.u-menu-color a{color:#c1cde6}.nav-logo,.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fff}.menu-toggle span{background-color:#c1cde6}.link--accent,.u-primary-color{color:#2b53a8;fill:#2b53a8}.button--primary{color:#3367d6;border-color:#3367d6}.subscribe-btn{background-color:#3367d6}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#3367d6}.godo-ne-button:hover{background-color:#3367d6}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(49,103,216,.43)}.listen-btn{color:#3367d6;border-color:#3367d6}.listen-btn:hover{background-color:#3367d6}mark{background-image:linear-gradient(180deg,rgba(49,103,216,.11),rgba(49,103,216,.13))}</style>

<!-- 6.- Theme Simply dark -->
<style>.u-bgheader{background-color:#000}.u-menu-color,.u-menu-color a{color:#b1aeae}.nav-logo,.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#ece9e9}.menu-toggle span{background-color:#b1aeae}.button--primary{color:#000;border-color:#000}.subscribe-btn{background-color:#000}.godo-n-q-d,.godo-ne-form label,.ne-t{color:rgba(0,0,0,.84)}.godo-ne-button:hover{background-color:rgba(0,0,0,.84)}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#b1aeae}mark{background-image:linear-gradient(180deg,#f3f0ef,#f3f0ef)}</style>

<!-- 7.- Theme Simply Lavender -->
<style>.u-bgheader{background-color:#8da7d5}.u-menu-color,.u-menu-color a{color:#dce6fa}.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fcffff}.nav-logo{color:#fff}.menu-toggle span{background-color:#dce6fa}.link--accent,.u-primary-color{color:#748ab0;fill:#748ab0}.button--primary{color:#8da7d5;border-color:#8da7d5}.subscribe-btn{background-color:#8da7d5}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#8da7d5}.godo-ne-button:hover{background-color:#8da7d5}.ne-body:after,.ne-body:before,.ne-t:before{background-color:#8da7d6}.listen-btn{color:#8da7d5;border-color:#8da7d5}.listen-btn:hover{background-color:#8da7d5}mark{background-image:linear-gradient(180deg,#ebf1ff,#ebf1ff)}</style>

<!-- 8.- Theme Simply Dark Green -->
<style>.u-bgheader{background-color:#006400}.u-menu-color,.u-menu-color a{color:#b5dda8}.nav-logo,.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fff}.menu-toggle span{background-color:#b5dda8}.link--accent,.u-primary-color{color:#006400;fill:#006400}.button--primary{color:#006400;border-color:#006400}.subscribe-btn{background-color:#006400}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#006400}.godo-ne-button:hover{background-color:#006400}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(3,101,0,.8)}.listen-btn{color:#006400;border-color:#006400}.listen-btn:hover{background-color:#006400}mark{background-image:linear-gradient(180deg,#defad3,#defad3)}</style>

<!-- 9.- Theme Simply Hot Pink   -->
<style>.u-bgheader{background-color:#d43d5a}.u-menu-color,.u-menu-color a{color:#ffbfc6}.search-toggle:hover,.u-menu-color a.active,.u-menu-color a:hover{color:#fff1f4}.nav-logo{color:#fff}.menu-toggle span{background-color:#ffbfc6}.link--accent,.u-primary-color{color:#aa3a50;fill:#aa3a50}.button--primary{color:#aa3a50;border-color:#aa3a50}.subscribe-btn{background-color:#d43d5a}.godo-n-q-d,.godo-ne-form label,.ne-t{color:#d43d5a}.godo-ne-button:hover{background-color:#d43d5a}.ne-body:after,.ne-body:before,.ne-t:before{background-color:rgba(213,61,91,.6)}.listen-btn{color:#d43d5a;border-color:#d43d5a}.listen-btn:hover{background-color:#d43d5a}mark{background-image:linear-gradient(180deg,#ffdce1,#ffdce1)}</style>
```

> If you don't like the colors above, then play with your favorite colors. Just change the colors in the following code

```html
<style>
  /* Header - Menu */
  .u-bgheader { background-color: #d25704 }
  .u-menu-color, .u-menu-color a { color: #ffc79e }
  .u-menu-color a:hover, .search-toggle:hover, .nav-logo, .u-menu-color a.active { color: #fff }
  .menu-toggle span { background-color: #ffc79e }
  /* Color links */
  .u-primary-color, .link--accent { color: #b34e11 }
  /* Primary Color button*/
  .button--primary {
    color:#b34e11;
    border-color:#b34e11
  }
  /* Newsletter */
  .godo-n-q-d,.godo-ne-form label,.ne-t { color:#b34e11 }
  .godo-ne-button:hover { background-color:#b34e11 }
  .ne-body:after,.ne-body:before,.ne-t:before { background-color:#d58b59 }
  /* Podcast */
  .listen-btn {
    color:#d25704;
    border-color:#d25704
  }
  .listen-btn:hover { background-color:#d25704 }
  /* subscribe BTN in the post */
  .subscribe-btn { background-color: #d25704}
  /* Mark in Post */
  mark { background-image:linear-gradient(180deg,#ffe1c2,#ffe1c2) }
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

### PrismJS code syntax

Make your code stand out with the PrismJS code highlighter.
PrismJS allows you to select which languge you embeded and performs code highlighting according to the language. Neat!

Take a look at the [Prismjs Supported Language List](http://prismjs.com/#languages-list)

![Simply Prismjs](./documentation/prismjs.jpg)

### Credits

- [Hodor AMP](https://github.com/godofredoninja/Hodor-AMP-Ghost)
- [Normalize](https://necolas.github.io/normalize.css/)
- [Ghost Search](https://github.com/HauntedThemes/ghost-search)
- [Fuzzysort](https://github.com/farzher/fuzzysort)
- [Prismjs](http://prismjs.com/)
- [Lightense Images](https://github.com/sparanoid/lightense-images)
- [Vanilla Lazyload](https://github.com/verlok/lazyload)
- [Fonts](https://fonts.google.com/?query=pt&selection.family=PT+Serif|Source+Sans+Pro)

## Copyright & License

Copyright (c) 2019 GodoFredoNinja - Released under the [CC BY-NC 4.0](LICENSE).
