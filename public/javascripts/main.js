window.onload = () => {
  const ironhackBCN = {
    lat: 41.386230,
    lng: 2.174980,
  };

  const markers = [];

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN,
  });

  axios.get('/restaurants')
    .then(({ data }) => {
      data.forEach((restaurant) => {
        new google.maps.Marker({
          position: {
            lat: restaurant.location.coordinates[1],
            lng: restaurant.location.coordinates[0],
          },
          title: restaurant.name,
          map,
        });
      });
    });
};
