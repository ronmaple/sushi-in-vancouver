# sushi-in-vancouver

demo: <https://sushi-in-vancouver.netlify.app/>

To set up:

```
yarn install
touch .env
```

Environmental variables; you will need: 

REACT_APP_MAPBOX_API_KEY
REACT_APP_ZOMATO_API_KEY
REACT_APP_API_BASE
REACT_APP_API_END

Note: hiding the api is just my preference (or flexibility for future additions)

Get your keys by registering from: 
- Mapbox: <https://www.mapbox.com/>
- Zomato: <https://developers.zomato.com/api>

You can definitely use a different API, but I just found found Zomate convenient to use. 

Future considerations:

- Backend with a database that'll store restaurant location to reduce API Calls
- More interaction (ie more restaurant data, etc.) although Mapbox/Web GL makes React component rendering difficult
- Usage of established React Mapbox GL Libraries
- Development vs Production variable flow

