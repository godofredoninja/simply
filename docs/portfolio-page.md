# Portfolio

> It's time to create and inspire with Simply, a stunning modern portfolio theme that I have designed for you to showcase your work. Meet the perfect portfolio partner for your creative production, be it design, illustration or anything else: it's Simply!

👉 To set the portfolio Page follow the steps below.

- Create a new page
- Choose your favorite title
- Use the URL `portfolio`
- Choose your favorite description in excerpt
- Use all tags to filter all portfolios

👉 **Portfolio collection**

- Appears on: `site.com/portfolio/`
- Post URLs: `site.com/porfolio/my-portfolio/`
- In your posts use the internal tag of `#portfolio`
- Contains posts with: a `primary_tag` of `Add_your_favorite_tag`

```yaml
routes:

collections:
  # PortFolio
  /portfolio/:
    permalink: /portfolio/{slug}/
    filter: 'tag:[hash-portfolio]'
    data: page.portfolio
    template: godo-template-portfolio
    limit: all

  # Default
  /:
    permalink: /{slug}/
    filter: 'tag:-[hash-portfolio,hash-kusi-doc,hash-podcast]'
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

![Ghost - Simply theme Portfolio](https://user-images.githubusercontent.com/10253167/105199716-116d2480-5b0d-11eb-9565-894d43348c3a.jpg)
