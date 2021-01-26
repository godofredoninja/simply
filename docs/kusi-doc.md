# Kusi Doc

> Simply is integrating  [Kusi Doc](https://github.com/godofredoninja/kusi-doc)  a beautiful and elegant template  for the documentation of your project.

To create the documentation page is very easy.

- Create an article
- Chose your favorite Title
- Add the internal Tag `#kusi-doc`
- Select the `Kusi Doc` from the template drop down.

![Theme for documentation for ghost](https://user-images.githubusercontent.com/10253167/105614431-776cdc80-5d97-11eb-961d-0a3bedc07581.jpg)

🤓 The secondary menu will be used on the documentation page.

If you don't want to use an internal tag, use a tag related to your project. For example I will use a tag  `simply-doc`.

So we need to make some changes to our routes.

➡️ **Doc Collection**

- Appears on: `site.com/docs/`
- Post URLs: `site.com/docs/my-documentation/`
- Contains posts with: a `primary_tag` of `simply-doc`

```yaml
collections:
  /docs/:
    permalink: /docs/{slug}/
    filter: primary_tag:simply-doc
```
