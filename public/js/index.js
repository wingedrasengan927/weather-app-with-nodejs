const inputElement = document.querySelector(".place");

const autoComplete = new google.maps.places.Autocomplete(inputElement)

autoComplete.addListener('place_changed', onPlaceChanged);

function onPlaceChanged() {
    let place = autoComplete.getPlace();
    if (place.geometry) {
        const placeInfo = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
        }
        requestOptions = {
            method: "POST",
            body: JSON.stringify(placeInfo),
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            }
        }
        fetch("/place", requestOptions)
        .then(response => response.json())
        .then(data => setWeatherData(data, place.formatted_address))
        .catch(err => console.log(err))
    }
}

// get elements
const place_head = document.querySelector("div.main-content h1")
const summary = document.querySelector("div.main-content h2")

const humidity = document.querySelector("p.humidity")
const temperature = document.querySelector("p.temperature")
const pressure = document.querySelector("p.pressure")
const precipitation = document.querySelector("p.humidity")
const windSpeed = document.querySelector("p.wind-speed")

function setWeatherData(data, place) {

    console.log(place)

    // set values
    place_head.textContent = place;
    summary.textContent = data.summary;

    humidity.textContent = data.humidity;
    temperature.textContent = data.temperature;
    pressure.textContent = data.pressure;
    precipitation.textContent = parseFloat(data.precipProbability) * 100;
    windSpeed.textContent = data.windSpeed
}