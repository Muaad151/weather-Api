class AjaxWeather {
    constructor() {
        this.urlkey = '3c62940892d747f7ba0152800222302'
        this.baseURL = 'http://api.weatherapi.com/v1'
    }
    async fetch(city) {
        const weatherData = await fetch(
            `${this.baseURL}/current.json?key=${this.urlkey}&q=${city}`,
        )
        const weather = await weatherData.json()
        return weather
    }
}

class displayWeather {
    constructor() {
        this.results = document.querySelector('.weather-report')
        this.temp = document.querySelector('.temp')
        this.humidity = document.querySelector('.humidity')
        this.wind = document.querySelector('.wind')
        this.pressure = document.querySelector('.pressure')
        this.country = document.querySelector('.country')
        this.climate = document.querySelector('.climate')
        this.img = document.querySelector('.img')
    }
    showWeather(data) {
        console.log(data)
        this.results.classList.add('show-Item')
        console.log(this.results)
        const {
            humidity,
            feelslike_c: temp,
            pressure_in,
            wind_mph,
            condition: { text, icon },
        } = data.current

        let place = data.location.country

        this.temp.innerText = temp
        this.humidity.innerText = humidity
        this.wind.innerText = wind_mph
        this.pressure.innerText = pressure_in
        this.country.innerText = place
        this.climate.innerText = text
        this.img.src = icon
    }
}

;
(function() {
    const form = document.querySelector('.form')
    const alert = document.querySelector('.alert')
    const cityInput = document.querySelector('.cityInput')

    const ajax = new AjaxWeather()
    const display = new displayWeather()
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        let city = cityInput.value

        if (city.length == 0) showAlert('Please enter City')
        else {
            ajax
                .fetch(city)
                .then((data) => {
                    display.showWeather(data)
                })
                .catch(() => showAlert('No matching location found.'))
        }
    })

    function showAlert(message) {
        alert.textContent = message
        document.querySelector('.weather-report').classList.remove('show-Item')
        alert.classList.add('showItem')
        setTimeout(() => {
            alert.classList.remove('showItem')
            alert.testContent = ''
        }, 1000)
    }
})()