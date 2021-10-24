# Air Quality Monitoring App

This app shows live AQI(Air Quality Index) of 12 different cities with comparison, historic and magnified charts.
[SITE_LINK](https://air-quality-monitoring-app.netlify.app/)

# Stack/Libraries
- Create React App (Boilerplate)
- React
- React Router
- TailwindCss
- Victory (Graph Library)
- Lodash


# Features:
### Homepage
- City card component
- Comparison chart of 12 cities
- Comparison table

### City Page
- Card component with dummy details expect Live AQI
- Historical chart with dummy data (Can be requested from API)
- Magnified chart with dummy data (Can be requested from API)


## Deployment
- The app is deployed to `netlify`. Any changes push to master branch will reflect on the site([SITE_LINK](https://air-quality-monitoring-app.netlify.app/)).

## Time Taken
- Around 18 - 20 hours. Most of the time went in deciding the charting library and it's implementation
- The reason to go with Victory charting library is that it had almost all the feature that I wanted with flexibility and modifications. Also, the library is maintained by one of the best company that I know in react open source community(this is the same company behind jquery `slick-slider` and many other open source projects)
- README file time - 1 hour

