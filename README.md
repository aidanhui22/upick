# uPick 🫵

A React app that helps groups decide where to eat by eliminating cuisine options down to two, then showing nearby restaurants.

**[Live Demo →](https://upick-eight.vercel.app)**

## Why I Built This

Groups struggle to decide on restaurants. uPick streamlines this by:
- Starting with 10 cuisine options
- Eliminating choices until 2 remain
- Fetching nearby restaurants for final options
- One-click navigation to Google Maps

## Features

- Interactive cuisine elimination
- Real-time Google Places API integration
- Filter by maximum price per person
- Restaurant details (name, address, rating)
- Direct Google Maps links
- Clean, responsive UI

## Tech Stack

**Frontend:** React, CSS  
**API:** Google Places API  
**Deployment:** Vercel

## Local Development

If using this yourself, please add your own API key to Google Places otherwise the app will not work locally!

```bash
git clone https://github.com/aidanhui22/upick.git
cd upick
npm install
# Create .env file including:
# REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here
npm start
```

## Future Plans

- Wheel spinner for final selection

---

Built by [Aidan Hui](https://github.com/aidanhui22) | [LinkedIn](https://www.linkedin.com/in/aidan-hui-87b7721b3/)
