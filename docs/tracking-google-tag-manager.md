# Tracking Google Tag Manager

> Simply keeps track of the user's actions on the page, for example:

- Header
  - Click Logo
  - Click Menu Name
  - Click Social Media
  - Click Search
- Sidebar
  - Click Sidebar post
- Article
  - Click Share
  - Click Next Post
  - Click Prev Post
  - Click Related Post
  - Click Name of Tag

## Settings Google Tag Manager

With [Google Tag Manager](https://tagmanager.google.com/), there are a million different ways to make your tagging setup leaner and more flexible.

> I'll use an easy way to reduce redundancy here. It's the generic event tag 😊 you guessed it!

— What are you waiting? 🖐 hands in action.

### First we'll create triggers

1. Click Triggers
2. New
3. Name of the Trigger
4. Select Custom Event
5. Name of the Event

— If you do not understand. look at the image

![Google Tag Manager triggers](https://user-images.githubusercontent.com/10253167/105801075-53abc100-5f66-11eb-96f6-555b6d875e72.jpg)

### Second we'll create Tag

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

![Google Tag Manager Tag](https://user-images.githubusercontent.com/10253167/105801192-9d94a700-5f66-11eb-9bac-4d7a6def28be.jpg)

### Third Insert code

🤔 *You can improve the code. I'll leave that to your imagination.*

➡️ Copy the below script to `Settings -> Code Injection -> Blog Footer`

```html
<script>
  /* Tracking With Google Tag Manager */
  var godoTracking = document.querySelectorAll(".godo-tracking");
  godoTracking.forEach(function (item) {
    item.addEventListener("click", function () {
      var godoCategory = this.getAttribute("data-event-category");
      var godoAction = this.getAttribute("data-event-action");
      var godoLabel = this.getAttribute("data-event-label");
      var godoValue = this.getAttribute("data-event-non-interaction");

      dataLayer.push({
        event: "godoGhostEvent",
        eventCategory: godoCategory,
        eventAction: godoAction,
        eventLabel: godoLabel,
        eventValue: godoValue,
      });
    });
  });
</script>
```
