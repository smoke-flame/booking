const marks = [{
        img: './assets/img/mark.svg',
        coordinates: {

            lat: 50.44787993094482,
            lng: 30.522167096729515
        }
    },
    {
        img: './assets/img/car-1.png',

        coordinates: {
            lat: 50.45151809496964,
            lng: 30.520768454640027
        }
    },
    {
        img: './assets/img/car-1.png',

        coordinates: {
            lat: 50.448914157511936,
            lng: 30.522774658107497
        }
    },
    {
        img: './assets/img/car-1.png',

        coordinates: {
            lat: 50.447540954336134,
            lng: 30.526272258378842
        }
    },
    {
        img: './assets/img/car-1.png',
        coordinates: {
            lat: 50.44890781934683,
            lng: 30.526416792120678
        }
    },
    {
        img: './assets/img/car-1.png',

        coordinates: {
            lat: 50.451039279967716,
            lng: 30.525343908635843
        }
    },
]

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 50.448759,
            lng: 30.521698
        },
        zoom: 15,
        styles: [{
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#dbe3ec"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": [{
                    "weight": "1",

                }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f5f7fa"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },

        ],
    });
    marks.forEach(mark => {
        let marker = new google.maps.Marker({
            map,
            position: {
                lat: mark.coordinates.lat,
                lng: mark.coordinates.lng
            },
            icon: mark.img
        })
    })

}