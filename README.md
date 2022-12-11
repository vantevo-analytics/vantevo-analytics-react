# The analytics of your website, but simpler
 
** Vantevo Analytics ** is the alternative platform to Google Analytics that respects privacy, because it does not need cookies not compliant with the GDPR. Easy to use, light and can be integrated into any website and back-end.
 
For more information visit the website [vantevo.io](https://vantevo.io).

**This package can be integrated into any react framework: next.js, gatsby or other.**
 
## Installation
 
`npm install vantevo-analytics-react`

 
## Start
 
```ts
...
import VantevoProvider from "vantevo-analytics-react";
...
 
export default function App() {
 ...
 return (
   <VantevoProvider options={{}}>
     ...
  </VantevoProvider>
 );
}
```
 
These are the parameters available for the tracker settings, all fields are optional.
 
 
| Option                  | Type                        | Description                                                                                                                                                   | Default |
| ----------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| excludePath             | `array`                     | You can exclude one or more pages, see [settings](https://vantevo.io/docs) | `[]`    |
| dev                     | `boolean`                   | The tracker will not send the data, please check your browser console for more information.                                                             | `false` |
| manualPageview          | `boolean`                   | Allows you to track page views automatically, the script uses the `popstate` event to navigate the site. | `false` |
| outboundLinks           | `boolean`                   | Allows you to monitor all outbound links from your site automatically, the script uses the `click` and` auxclick` events.                           | `false` |
| hash                    | `bool`                      | Allows tracking based on URL hash changes. | `false` |
| domain                  | `boolean`                   | Use this option when the script is installed on a different domain than the one on Vantevo Analytics. To use this function remember to authorize the domain to be able to save the statistics, for more information [read more](https://vantevo.io/docs/domain-settings/information#authorized-domains). | `null`  |
| trackFiles              | `string`                    | Is a list of extensions, separated by commas, example: zip,mp4,avi,mp3. Whenever a user clicks on a link, the script checks if the file extension is in the list you entered in the parameter and sends a `File Download` event with the value `url`.| `null`  |
| saveExtesionFiles       | `boolean`                   | Allows you to save in the event detail together with the` url` also the name of the file extension as `meta_key` to get more information and statistics about your files to download. | `false`  |
| proxyServer             | `string` (Optional)         | If you want to use a proxy server for requests sent to Vantevo.  | `https://api.vantevo.io/event`  |
| proxyServerEcommerce    | `string` (Optional)         | If you want to use a proxy server for requests sent to Vantevo for ecommerce events. | `https://api.vantevo.io/event-ecommerce`  |
 
 
 
## Page view monitoring and event managemenent
 Submit a pageview using `location.href` as the request URL and` document.title` for the page title.
 
### Simple Pageview

```ts
...
import useVantevo from "vantevo-analytics-react";
...
 
export default function Page(){
   const { vantevo } = useVantevo();
 
   useEffect(() => {
       vantevo(); 
       /*** or ***/
       vantevo("pageview");
   },[]);
 
   return (...);
}
```
 
### Pageview change pathname of url
 
You can send a custom pageview where you can change the page `path`. In the example below, the page URL is https://example.com/blog?page=2 with the `pathname=/blog` and the `page=2` parameter (the page=2 parameter will be ignored, see the [guide](https://vantevo.io/docs), using the `pageview` event with the` meta` parameter of type `{path:"/blog/page/2"}`, the script will save as page path:`/blog/page/2`.
 
```ts
...
import useVantevo from "vantevo-analytics-react";
...
 
export default function Page(){
   const { vantevo } = useVantevo();
 
   useEffect(() => {
       vantevo("pageview", { path: "/blog/page/2" }, () => {});
   },[]);
 
   return (...);
}
```

### Pageview change title page

 Vantevo uses `document.title` to get the full title of the page, in this example you will see how you can change the page title.
 
 ```ts
...
import useVantevo from "vantevo-analytics-react";
...
 
export default function Page(){
   const { vantevo } = useVantevo();
 
   useEffect(() => {
       vantevo("pageview", { title: "New Title Page" }, () => {});
   },[]);
 
   return (...);
}
```

| Using "pageview" as the event name, the function will perform a pageview and not an event. |
| ---------------------------------------------------------------------------------------------------------------- |
 
## Event

A simple example of how to send an event with the name "Download" and with the information `meta_key=pdf` and` meta_value=Presentation`, the `meta` parameter is a simple json.
 
Vantevo Analytics manages the duration of an event (in seconds) using the `meta_key=duration`, the value of this field is of type `Number`. With the `duration` parameter it is possible to send a number (seconds) with the event that will be used to calculate the average duration of the event. 
```ts
...
import useVantevo from "vantevo-analytics-react";
...
 
export default function Page(){
   const { vantevo } = useVantevo();
 
   useEffect(() => {
       vantevo("Download", { pdf: "Presentation" }, () => {});
       /*** or ***/
       vantevo("video", { title: "Presentation", duration: 30 }, () => {});
   },[]);
 
   return (...);
}
```
 
#### Parametri
 
| Option | Type | Description | Default |
| -------------- | --------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| event | `string` (Optional) | Event name. | `null`|
| meta | `object` (Optional) | An object with custom properties for events. | `{}` |
| callback | `function` (Optional) | A function that is called once the event has been successfully logged. | `null` |
 

## Monitoring Ecommerce

In the ecommerce section of Vantevo you can monitor specific actions affecting your ecommerce website and the sources of traffic that lead to sales. 


### Parameters

| Option         | Type                  | Description                                                                              | Default                  |
| -------------- | --------------------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| event          | `string` (required)   | Event Name. See below the list of events you can use for monitoring your ecommerce.      | `pageview`               |
| values         | `object` (required)   | An object with custom properties for events.                                             | `{}`                     |
| callback       | `function` (optional) | A function that is called once the event has been successfully logged.                   | `null`                   |


### List events 

These are the events to use to monitor your ecommerce:

| Event              | Description                                          |
| :----------------- | :--------------------------------------------------- |
| `add_to_wishlist`  | a user adds a product to the favorites list          |
| `view_item`        | a user views a product                               |
| `remove_item_cart` | a user removes a product from the cart               |
| `add_item_cart`    | a user adds product to the cart                      |
| `start_checkout`   | a user has started the checkout process              |
| `checkout_info`    | a user submits personal data                         |
| `checkout_ship`    | a user submits shipments data                        |
| `checkout_payment` | a user initiated the payment process                 |
| `purchase`         | a user has completed a purchase                      |


### Example

An example for how to use the `trackEcommerce` function. 

```ts
import useVantevo from "vantevo-analytics-react";

export default function Page(){
   const { trackEcommerce } = useVantevo();
 
   useEffect(() => {
        trackEcommerce("view_item", { 
            "items": [
                {
                    'item_id': "SKU_123",
                    'item_name': "Samsung Galaxy",
                    'currency': "EUR",
                    'quantity': 0,
                    'price': 199.99,
                    'discount': 0,
                    'position': 1,
                    'brand': "Samsung",
                    'category_1': "Smartphone",
                    'category_2': "Samsung",
                    'category_3': "Galaxy",
                    'category_4': "",
                    'category_5': "",
                    'variant_1': "Black",
                    'variant_2': "5.5 inch",
                    'variant_3': ""
                }
            ]
        });
   },[]);
 
   return (...);
}

```


Read our [guide](https://vantevo.io/docs/ecommerce/index/?utm_source=npm&utm_medium=vantevo-analytics-tracker) for more information of how to use the ecommerce tracking function.


 
## Tracking Files Download

You can use `enableTrackFiles()` by monitoring file downloads on a specific page using `useVantevo()`.
 
```ts
...
import useVantevo from "vantevo-analytics-react";
...
export default function Page(){
   const { enableTrackFiles } = useVantevo();
 
   useEffect(() => {
       const clearTrackFiles = enableTrackFiles("pdf,zip,mp4,avi", true);
       return () => {
           clearTrackFiles();
       }
   },[]);
 
   return (....);
}
```

## Outbound links

You can use `outboundLinks()` by monitoring outbound links on a specific page using `useVantevo()`.
 
```ts
...
import useVantevo from "vantevo-analytics-react";
...
export default function Page(){
   const { enableOutboundLinks } = useVantevo();
 
   useEffect(() => {
       const cleanOutboundLinks = enableOutboundLinks();
       return () => {
           cleanOutboundLinks();
       }
   },[]);
 
   return (....);
}
```
 
## 404  - Page Not Found
For the management of the `404 - Page Not Found` page we have created a specific event. This function will automatically save a `404` event and the` pathname` of the page as a value.
 
You can find the information collected through this function on the `Events` page.
 
```ts
...
import useVantevo from "vantevo-analytics-react";
...
 
export default function Page(){
   const { vantevo } = useVantevo();
 
   useEffect(() => {
       vantevo("404");
   },[]);
 
   return (...);
}
```
 
 
## Vantevo Analytics Guide
 
To see all the features and settings of Vantevo Analytics we recommend that you read our complete guide [here](https://vantevo.io/docs).
 


