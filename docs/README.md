# Introduction

**[Simply](https://github.com/godofredoninja/simply)** is a very beautiful and elegant open source theme for [Ghost](https://github.com/TryGhost/Ghost), it is inspired on [Medium](https://medium.com/), for Personal or professional, Portfolio Page, Photography Blog, Lifestyle Blog, Culinary Blog, News Page, Design Blog, and in many other things. **Simply** is very fast 🚀.

## General features

- [Membership](https://github.com/godofredoninja/simply/blob/master/docs/members.md) Support using the new portal feature
- Support for [different Languages](https://github.com/godofredoninja/simply/blob/master/docs/languages.md)
- Light Mode / Dark Mode
- [Drop Down Menu](https://github.com/godofredoninja/simply/blob/master/docs/settings.md#dropdownmenu)
- [Social accounts link](https://github.com/godofredoninja/simply/blob/master/docs/settings.md#socialmedia)
- [Fast search](https://github.com/godofredoninja/simply/blob/master/docs/settings.md#search/) functionality
- [Layouts Footer](https://github.com/godofredoninja/simply/blob/master/docs/layouts.md#footer)
  - Footer Default
  - Footer Dark
  - Footer Not Menu Secondary
- Comments
  - [Disqus Comments](https://github.com/godofredoninja/simply/blob/master/docs/settings.md#disquscomments)
  - [Facebook Comments](https://github.com/godofredoninja/simply/blob/master/docs/settings.md#facebookcomments)
  - [Hyvor Talk Comments](https://github.com/godofredoninja/simply/blob/master/docs/settings.md#hyvortalk)
- Home Page
  - [Default](https://github.com/godofredoninja/simply/blob/master/docs/home.md#default)
  - [Featured](https://github.com/godofredoninja/simply/blob/master/docs/home.md#featured)
  - [Medium](https://github.com/godofredoninja/simply/blob/master/docs/home.md#medium)
  - [Sidebar](https://github.com/godofredoninja/simply/blob/master/docs/home.md#sidebar)
  - [Grid](https://github.com/godofredoninja/simply/blob/master/docs/home.md#grid)
  - [Personal](https://github.com/godofredoninja/simply/blob/master/docs/home.md#personal)
  - [Archive](https://github.com/godofredoninja/simply/blob/master/docs/home.md#archivepage)
- Post Format
  - [Post Default](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-default)
  - [Post Full](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-full)
  - [Post Wide](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-wide)
  - [Post Header Image](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-header-image)
  - [Post Image](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-image)
  - [Post Image Right](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-image-right)
  - [Post Sidebar](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-sidebar)
  - [Post not Image](https://github.com/godofredoninja/simply/blob/master/docs/post-format.md#post-not-image)
- Page
  - [Contact](https://github.com/godofredoninja/simply/blob/master/docs/contact-page.md)
  - 404
- Archive
  - [Authors Page](https://github.com/godofredoninja/simply/blob/master/docs/authors-and-tags-page.md#authors-page)
  - [Tags Page](https://github.com/godofredoninja/simply/blob/master/docs/authors-and-tags-page.md#tags-page)
- [Podcasts Page](https://github.com/godofredoninja/simply/blob/master/docs/podcasts-page.md)
- [Portfolio Page](https://github.com/godofredoninja/simply/blob/master/docs/portfolio-page.md)
- [Kusi Doc](https://github.com/godofredoninja/simply/blob/master/docs/kusi-doc.md) for the documentation of your project
- [AMP](https://github.com/godofredoninja/Hodor-AMP-Ghost) Template
- Related Articles
- Social share buttons support for posts
- Previous and next Post
- Tracking [Google Tag Manager](https://github.com/godofredoninja/simply/blob/master/docs/tracking-google-tag-manager.md)
- Pagination Infinite Scroll
- Video Responsive
  - YouTube
  - Vimeo
  - kickstarter
  - Dailymotion
- Lazy Loading for images
- Medium style image zoom
- [Prism supported all syntax](https://prismjs.com/index.html#supported-languages)

## How to install

Installing the Simply theme for Ghost is very easy, first [download](https://github.com/godofredoninja/simply/archive/master.zip) the theme.

But if you made changes to the theme files, you need to create a **zip** file.

Follow these steps to upload the theme.

- Log in to your Ghost website.
- Click **Design** in the left side menu.
- Scroll down to the **INSTALLED THEMES** section.
- Click **Upload a theme** button.
- Select the theme file `simply.zip`.
- Once uploaded, click **Activate now** to activate the theme immediately.

## Development

Simply uses [Gulp](https://gulpjs.com/) as a build tool and [Yarn](https://yarnpkg.com/) to manage front-end packages.

```bash
# clone this repo
$ git clone https://github.com/godofredoninja/simply.git

# Use branch Dev
$ git checkout dev

# install the dependencies
$ cd simply/src && yarn

# run build & livereload task
$ yarn dev

# link to ghost themes dir
$ ln -s $PWD path/to/ghost/content/themes/simply

# restart ghost server
$ cd path/to/ghost && ghost restart --development
```

### Font Icons

Icons generated by [Icomoon](https://icomoon.io/app/#/select) and import  `src/svg-icons/selection.json`

### Build commands

- `yarn dev` — Compile assets when file changes are made, start [livereload](http://livereload.com/)
- `yarn build` — Compile and optimize the files in your assets directory
- `yarn prod` — Compile assets for production and generate a `dist/simply.zip`

### Additional commands

- `yarn lint:js` — [Standard](https://standardjs.com/), Check for errors in the script.
- `yarn lint:sass` — [Stylelint](https://stylelint.io/), Check for errors in the styles.
- `yarn lint` — Check error in script and styles.
- `yarn scan` — [Ghost Scan](https://github.com/TryGhost/gscan) check for errors, deprecation and other compatibility issues.
- `yarn test` — Check the script errors and styles then check the theme if it is compatible with the latest version of Ghost.
