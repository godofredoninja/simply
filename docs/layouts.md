# Layouts

Simply comes with different header and footer styles.

## Footer

Simply Comes with two page header styles

### Footer Default

![Footer Default Simply](https://user-images.githubusercontent.com/10253167/105600192-be8caa80-5d62-11eb-9491-47963a9d0f0f.jpg)

The default footer comes using the following style.

- Copyright is on the left side
- The secondary menu is in the center
- The icons of social networks is located on the right side

---

### Footer Dark

![Footer Dark Mode](https://user-images.githubusercontent.com/10253167/105542035-b2eba600-5cc6-11eb-9dee-327bfbeeb2e8.jpg)

- About the page on the left side
- Social media icons below about us
- A list of tags in the center
- A subscription form on the right side
- Copyright is on the left side
- Secondary menu on the right side

Edit the file `default.hbs` and uncomment `{{>"layout/footer-dark"}}`

```handlebars
{{!-- Footer Default ./partials/layout/footer.hbs --}}
{{!-- {{>"layout/footer"}} --}}

{{!-- Footer - dark ./partials/layout/footer-dark.hbs --}}
{{>"layout/footer-dark"}}

{{!-- Footer Not Menu ./partials/layout/footer-not-menu.hbs --}}
{{!-- {{>"layout/footer-not-menu"}} --}}
```

---

### Footer Not Menu

![Footer not menu simply theme for ghost](https://user-images.githubusercontent.com/10253167/105594255-1cb88e00-5d61-11eb-99b8-ce5306253d29.jpg)

- Title or Logo is on the left side
- Social media buttons are after the logo on the left side
- Copyright is on the right side

Edit the file `default.hbs` and uncomment `{{>"layout/footer-not-menu"}}`

```handlebars
{{!-- Footer Default ./partials/layout/footer.hbs --}}
{{!-- {{>"layout/footer"}} --}}

{{!-- Footer - dark ./partials/layout/footer-dark.hbs --}}
{{!-- {{>"layout/footer-dark"}} --}}

{{!-- Footer Not Menu ./partials/layout/footer-not-menu.hbs --}}
{{>"layout/footer-not-menu"}}
```
