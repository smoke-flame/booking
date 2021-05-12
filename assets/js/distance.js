let marks = [{
        img: './assets/img/mark.svg',
        coordinates: {
            lat: 50.449937728532205,
            lng: 30.51878185216889
        }
    },

    {
        img: './assets/img/square.svg',
        coordinates: {
            lat: 50.44669943460846,
            lng: 30.525347900168473
        }
    },

]
let markers = [];
let mainDotes = [];


let map;

function initMap() {
    // create map
    map = new google.maps.Map(document.getElementById("distance"), {
        center: {
            lat: 50.448759,
            lng: 30.521698
        },
        zoom: 16,
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
        disableDefaultUI: true,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,

    });
    // drow direction & create markers
    drowDirection();
    marks.forEach(mark => {
        let marker = new google.maps.Marker({
            map,
            position: {
                lat: mark.coordinates.lat,
                lng: mark.coordinates.lng
            },
            icon: mark.img
        })
        markers.push(marker)
    });


    // create overlay with our marker
    class USGSOverlay extends google.maps.OverlayView {
        constructor(bounds, image, ) {
            super();
            this.bounds_ = bounds;
            this.image_ = image;
            this.div_ = document.createElement("div");
            this.div_.classList.add('car-item');
            this.div_.style.borderStyle = "none";
            this.div_.style.borderWidth = "0px";
            this.div_.style.position = "absolute";
            this.div_.style.zIndex = '9999999999';
            this.div_.style.display = 'flex';
            this.div_.style.justifyContent = 'center';
            this.div_.style.alignItems = 'center';

        }
        drive(lat, lng) {
            const overlayProjection = this.getProjection();
            let car = document.querySelector('.car-item');
            car.classList.contains('move') ? true : car.classList.add('move');

            const newLatLng = new google.maps.LatLng(lat, lng)
            let oldPosition = car.style.transform.replace(/[a-z]/g, '').split(' ')
            oldPosition[0] = oldPosition[0].substr(1)
            oldPosition = oldPosition.map(item => parseFloat(item))
            oldPosition = {
                x: oldPosition[0],
                y: oldPosition[1]
            }
            const newPosition = overlayProjection.fromLatLngToDivPixel(newLatLng)
            newPosition.x += -10;
            newPosition.y += -10;
            this.div_.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`

        }

        onAdd() {
            const img = document.createElement("img");
            img.src = this.image_;
            img.style.width = "100%";
            img.style.height = "auto";
            this.div_.appendChild(img);

            const panes = this.getPanes();
            panes.overlayLayer.appendChild(this.div_);
        }
        draw() {

            const overlayProjection = this.getProjection();
            const sw = overlayProjection.fromLatLngToDivPixel(
                this.bounds_.getSouthWest()
            );
            const ne = overlayProjection.fromLatLngToDivPixel(
                this.bounds_.getNorthEast()
            );

            if (this.div_) {
                this.div_.style.transform = `translate(${sw.x}px, ${ne.y}px)`
                this.div_.style.left = 0 + "px";
                this.div_.style.top = 0 + "px";
                this.div_.style.width = ne.x - sw.x + "px";
                this.div_.style.height = sw.y - ne.y + "px";
            }
        }

        onRemove() {
            if (this.div_) {
                this.div_.parentNode.removeChild(this.div_);
                this.div_ = null;
            }
        }
    }
    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(marks[0].coordinates.lat - 0.00020500010001, marks[0].coordinates.lng - 0.00065900010001),
        new google.maps.LatLng(marks[0].coordinates.lat + 0.00020500010001, marks[0].coordinates.lng + 0.00058900010001),
    );
    // const overlay = new USGSOverlay(bounds, 'assets/img/car-1.png');
    const overlay = new USGSOverlay(bounds, 'assets/img/mark.svg');
    overlay.setMap(map);


    // delete start marker before mooving
    markers[0].setMap(null)
    setTimeout(() => {

        let delay = 1000
        let counter = 0
        mainDotes.push({
            lat: marks[0].coordinates.lat,
            lng: marks[0].coordinates.lng
        })
        mainDotes.forEach((item, index, array) => {
            if (index > -1) {
                delay += 1000;
                counter++;
                if (counter >= array.length) {
                    return;
                } else {
                    setTimeout(() => {
                        overlay.drive(item.lat, item.lng)
                    }, delay)
                }
            }
        })
    }, 1000)
}




function drowDirection() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const body = {
        origin: `${marks[0].coordinates.lat},${marks[0].coordinates.lng}`,
        destination: `${marks[1].coordinates.lat},${marks[1].coordinates.lng}`,
        key: 'AIzaSyBLnv2hjU27ykmU1HrByJFkFrl7K-TVdeI'

    }
    var request = {
        origin: body.origin,
        destination: body.destination,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
            mainDotes = result.routes[0].overview_path;
            mainDotes = mainDotes.map(item => {
                item = {
                    lat: item.lat(),
                    lng: item.lng(),
                }
                return item
            })
        }
    });

}





////////
const cars = document.querySelectorAll('.footer__cars__item');
cars.forEach((item, index) => {
    index % 2 == 0 ? item.style.background = '#fff' : item.style.background = '#f2f4f8';
})