# Contact Page

- Create a new page
- Choose your favorite URL and title
- Select the `Archive Contact` template from the Template drop down
- Publish the page
- To add the page to the navigation

➡️ Add your content and the contact form code using [FORMSPREE](https://formspree.io/) as a service. Please check the code example below.

```html
<form
  action="https://formspree.io/your@email.com"
  class="mt-10 grid md:grid-cols-2 gap-6"
  method="POST">

  <input name="name" class="col-span-1" type="text" placeholder="Your Name" required>
  <input name="email" class="col-span-1" type="email" placeholder="Your Email" required>
  <textarea name="message" class="col-span-full" placeholder="Type Message" required></textarea>
  <div class="col-span-full text-center"><button type="submit" class="button is-primary">Send Message</button></div>
</form>
```

![Ghost - Simply Contact Page](https://user-images.githubusercontent.com/10253167/162016633-7d328cc5-d5de-407a-bf03-57439985c024.jpg)
