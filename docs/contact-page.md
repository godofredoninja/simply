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
    class="max-w-740 mx-auto mb-16"
    method="POST">

    <div class="row">
        <div class="col s12 m6 mb-8">
            <input name="name" type="text" placeholder="Your Name" required>
        </div>
        <div class="col s12 m6 mb-8">
            <input name="email" type="email" placeholder="Your Email" required>
        </div>

        <div class="col s12 mb-8"><textarea name="message" placeholder="Type Message" required></textarea></div>
        <div class="col s12 text-center mb-10"><button type="submit" class="button is-primary">Send Message</button></div>
    </div>
</form>
```

➡️ PHONE - ADDRESS - EMAIL

```html
<div class="pae row text-center mb-16">
    <div class="col s12 m6 l4 mb-8">
        <div class="pae-icon">
            <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>
        </div>
        <h4 class="pae-title">PHONE</h4>
        <div class="pae-des">
            <p>+51 987 659 249</p>
            <p>+51 01 424 0827</p>
        </div>
    </div>

    <div class="col s12 m6 l4 mb-8">
        <div class="pae-icon">
            <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <h4 class="pae-title">ADDRESS</h4>
        <div class="pae-des">
            <p>Parque de la Reserva, Jr. Madre de Dios, Cercado de Lima, Perú</p>
        </div>
    </div>

    <div class="col s12 m6 l4 mb-8">
        <div class="pae-icon">
            <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <h4 class="pae-title">EMAIL</h4>
        <div class="pae-des">
            <p>hello@godofredo.ninja</p>
            <p>test@godofredo.ninja</p>
        </div>
    </div>
</div>
```

➡️ Google Maps

```html
<div class="mx-auto" style="background:#ccc;height:50px;width:2px;margin-bottom:90px"></div>

<div class="archive-contact-maps text-center mb-16">
    <div class="video-responsive">
      <!--ADD_YOUR_IFRAME_GOOGLE_MAPS-->
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1950.3588531255732!2d-77.0306651062514!3d-12.131457197599458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1599169222776!5m2!1ses-419!2spe" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </div>
</div>
```

![Ghost - Simply Contact Page](https://user-images.githubusercontent.com/10253167/105212544-9bbc8500-5b1b-11eb-8d1d-883427b092e1.jpg)
