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

router.get('/restaurants/:id', (req, res, next) => {
  const { id } = req.params;
  Restaurant.findById({ _id: id })
    .then((restaurant) => {
      res.render('restaurant', { restaurant });
    });
});

router.post('/restaurants/:id', (req, res, next) => {
  const { id } = req.params;
  const {
    name, type, lat, lng,
  } = req.body;

  Restaurant.findById({ _id: id })
    .then((restaurant) => {
      // res.render('restaurant', { restaurant });
      restaurant.name = name;
      restaurant.type = type;
      restaurant.location = {
        coordinates: [lng, lat],
        type: 'Point',
      };

      restaurant.save()
        .then(() => {
          res.redirect('/');
        });
    });
});

module.exports = router;
