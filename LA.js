let weather = {
    apiKey: "2a2518fc522bb734071b0b58e3ca1500",
    fetchWeather: function (location) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            location +
            "&units=imperial&appid=" +
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
      },
      displayWeather: function (data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        document.querySelector(".location").innerText = name;
        document.querySelector(".weather-icon").src = 
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".degrees").innerText = `${Math.round(temp)}` + "°f";
        document.querySelector(".humid").innerText = humidity + "%";
        document.querySelector(".feels_like").innerText = `${Math.round(feels_like)}` +"°f";
        document.querySelector(".windstat").innerText = `${Math.round(speed)}`+ "km/h";
      },
      search: function () {
        this.fetchWeather(document.querySelector(".search-box").value);
      },
    };
    
    document.querySelector(".submit").addEventListener("click", function () {
      weather.search();
    });

    const searchbox = document.querySelector('.search-box');
    searchbox.addEventListener('keypress', setQuery);

    function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}
    
    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

      function dateBuilder (d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`;

    //     let weather = data['weather'][0]['main'];
    // //valid status = sunny, rainy, clear, snow, haze, cloudy
    // switch (weather) {
    //   case "Sunny":
    //     status.src = img[0];
    //     break;
    //   case "Rain":
    //     status.src = img[1];
    //     break;
    //   case "Clear":
    //     status.src = img[2];
    //     break;
    //   case "Snow":
    //     status.src = img[3];
    //     break;
    //   case "Haze":
    //     status.src = img[4];
    //     break;
    //   case "Clouds":
    //     status.src = img[5];
    //     break;
    //   default:
    //     status.src = img[6];
    // }
      }

    weather.fetchWeather("Los Angeles");