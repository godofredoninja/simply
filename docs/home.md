# Home Page

>Simply - come with 7 Home page with different layout options

1. [Default](#default) `index.hbs`
2. [Featured](#featured) `godo-template-featured.hbs`
3. [Medium](#medium) `godo-template-medium.hbs`
4. [Sidebar](#sidebar) `godo-template-sidebar.hbs`
5. [Grid](#grid) `godo-template-grid.hbs`
6. [Personal](#personal) `godo-template-personal.hbs`
7. [Archive Page](#archive-page) `godo-template-archive.hbs`
8. [Featured with Slider](#featured-with-slider) `godo-template-featured-slider.hbs`
9. [Medium with Sidebar](#medium-with-sidebar) `godo-template-medium-sidebar.hbs`
10. [Photographer](#photographer) `godo-template-photographer.hbs`

---

- First back up your `routes.yml` in your ghost settings ​ `Dashboard -> Labs -> Routes -> Download current routes.yml`
- Re-download the Route and edit `routes.yml` line `collections -> template`
- After doing the changes, save the file and upload again.
- If do not observe changes restart ghost

![route](https://user-images.githubusercontent.com/10253167/104209353-9b2b3c80-53ff-11eb-8028-42254c65839c.jpg)

> The filter option is optional. If you have activated the portfolio and documentation. I think if it is necessary to add the filter.

## Default

Default uses the `index.hbs` template, the stories are arranged in a grid pattern. If you want to use this template you don't need to make any changes.

![home default](https://user-images.githubusercontent.com/10253167/104484804-b3ce5a80-5597-11eb-89fa-cd1b700097b1.jpg)

## Featured

The last featured article will be called up and displayed throughout the length of the screen.

![home featured](https://user-images.githubusercontent.com/10253167/104489713-f2ffaa00-559d-11eb-9e29-a029e6a50be0.jpg)

Here if it is necessary to change our `routes.yaml` in the following way.

```yaml
## routes.yaml

routes:

collections:
  /:
    permalink: /{slug}/
    ## filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    limit: 12
    template: godo-template-featured

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Medium

The template `godo-template-medium.hbs` has a similarity to [Medium](https://medium.com/)

![home medium](https://user-images.githubusercontent.com/10253167/104489770-03178980-559e-11eb-986d-cb2fecef170a.jpg)

Our route will need to change

```yaml
## routes.yaml

routes:

collections:
  /:
    permalink: /{slug}/
    ## filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    template: godo-template-medium
    limit: 14

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Sidebar

This template comes with a sidebar with 3 featured articles

![home sidebar](https://user-images.githubusercontent.com/10253167/104489163-50dfc200-559d-11eb-9e33-23aba5a776e8.jpg)

```yaml
## routes.yaml

routes:

collections:
  /:
    permalink: /{slug}/
    ## filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    limit: 12
    template: godo-template-sidebar

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Grid

One large featured article will be shown, the rest of the articles will be shown in columns of 3.

![home grid](https://user-images.githubusercontent.com/10253167/104489627-d8c5cc00-559d-11eb-8885-75c027b95033.jpg)

```yaml
## routes.yaml

routes:

collections:
  /:
    permalink: /{slug}/
    ## filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    limit: 12
    template: godo-template-grid

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Personal

The personal page has a big title and is centered. It has a small content using the [typewriter](https://github.com/tameemsafi/typewriterjs) style.

![Simply Home Personal](https://user-images.githubusercontent.com/10253167/104755167-1e160500-5728-11eb-91e3-21898f341bfc.jpg)

- Create a new page
- Choose your favorite title
- Use the `URL` -> `home-personal`

In an `HTML` block in your ghost editor add this code to display the **typewriter**.

```html
<div class="">
    I’m a
    <span id="typewriter" class="font-medium"></span>
</div>
````

In this block of `HTML` add the icons, the icons will be displayed on the right side of the page.

```html
<div class="absolute right-0 bottom-0 mr-8 mb-8 text-white leading-none z-2 flex-col hidden md:flex">
    <a
        class="p-2 inline-block hover:text-facebook"
        title="Facebook ghost"
        aria-label="Facebook ghost"
        href="https://www.facebook.com/ghost"
        target="_blank"
        rel="noopener noreferrer">
        <svg class="icon icon--facebook">
            <use xlink:href="#icon-facebook"></use>
        </svg>
    </a>

    <a
        class="p-2 inline-block hover:text-twitter"
        title="Twitter @ghost"
        aria-label="Twitter @ghost"
        href="https://twitter.com/ghost"
        target="_blank"
        rel="noopener noreferrer">
        <svg class="icon icon--twitter">
            <use xlink:href="#icon-twitter"></use>
        </svg>
    </a>

    <a
        href="https://youtube.com"
        title="Youtube"
        class="hover:text-youtube p-2 inline-block"
        target="_blank"
        rel="noopener noreferrer">
        <svg class="icon icon--youtube">
            <use xlink:href="#icon-youtube"></use>
        </svg>
    </a>

    <a
        href="https://instagram.com"
        title="Instagram"
        class="hover:text-instagram p-2 inline-block"
        target="_blank"
        rel="noopener noreferrer">
        <svg class="icon icon--instagram">
            <use xlink:href="#icon-instagram"></use>
        </svg>
    </a>

    <a
        href="https://github.com/godofredoninja/simply"
        title="GitHub"
        class="hover:text-github p-2 inline-block"
        target="_blank"
        rel="noopener noreferrer">
        <svg class="icon icon--github">
            <use xlink:href="#icon-github"></use>
        </svg>
    </a>

    <a
        href="https://linkeding.com"
        title="Linkedin"
        class="hover:text-linkedin p-2 inline-block"
        target="_blank"
        rel="noopener noreferrer">
        <svg class="icon icon--linkedin">
            <use xlink:href="#icon-linkedin"></use>
        </svg>
    </a>
</div>
```

To finish, add the typewriter script

```html
<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
<script>
    var app = document.getElementById('typewriter');

    var typewriter = new Typewriter(app, {
        strings: ['Designer', 'Freelancer', 'Developer'],
        loop: true,
        delay: 90,
        autoStart: true,
    });
</script>
```

Our route will be like this.

```yaml
## routes.yaml

routes:
  /:
    template: godo-home-personal
    data: page.home-personal

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Archive Page

Simply has a beautiful template for listing articles in a single file.

![Ghost - Simply archive page](https://user-images.githubusercontent.com/10253167/105381375-ee11aa80-5bdc-11eb-9ee8-c94de192934c.jpg)

If you want to change the title that says. **The full archive**, just edit the file `godo-archive.hbs` inside the theme.

👉 **Archive  Route**

```yaml
## routes.yaml

routes:
  /archive/:
    controller: channel
    # filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    limit: 50
    template: godo-archive

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Featured with Slider

![home featured](https://user-images.githubusercontent.com/10253167/113336280-c8470700-92eb-11eb-867b-c22a4c09c554.jpg)

Here if it is necessary to change our `routes.yaml` in the following way.

```yaml
## routes.yaml

routes:

collections:
  /:
    permalink: /{slug}/
    ## filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    limit: 12
    template: godo-template-featured-slider

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Medium with Sidebar

The template is inspired by the medium home page, you will have the facility to add a title, description and a featured image on the right side.

![Simply Medium with sidebar](https://user-images.githubusercontent.com/10253167/113358306-2d5e2500-930b-11eb-92ee-d71717660777.jpg)

- Create a new page
- Choose your favorite title
- Use the `URL` -> `medium-with-sidebar`

```yaml
## routes.yaml

routes:

collections:
  /:
    permalink: /{slug}/
    ## filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    template: godo-template-medium-sidebar
    data:
      post: page.medium-with-sidebar
    limit: 14

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

## Photographer

If you are a photographer this template is exclusively for you. It has a slider of the last 3 featured articles, the articles will be ordered in columns of 3.

![Home photographer](https://user-images.githubusercontent.com/10253167/113359817-2edd1c80-930e-11eb-8983-6269210c3d65.jpg)

```yaml
## routes.yaml

routes:

collections:
  /:
    permalink: /{slug}/
    ## filter: 'tag:-[hash-portfolio,hash-kusi-doc]'
    limit: 12
    template: godo-template-photographer

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```
