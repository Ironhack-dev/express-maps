const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();
router.get('/restaurants', (req, res, next) => {
  Restaurant.find()
    .then((allRestaurants) => {
      res.json(allRestaurants);
    });
});

router.get('/new', (req, res, next) => {
  res.render('restaurantAdd');
});

router.post('/new', (req, res, next) => {
  const {
    name, lat, lng, type,
  } = req.body;

  const newRestaurant = new Restaurant({
    name,
    type,
    location: {
      coordinates: [lng, lat],
      type: 'Point',
    },
  });

  newRestaurant.save()
    .then((restaurant) => {
      console.log('Restaurant created');
      res.redirect('/');
    })
    .catch(error => next(error));
});

module.exports = router;
