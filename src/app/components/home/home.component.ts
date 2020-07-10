import { Component, OnInit } from "@angular/core";
import { WeatherUpdateService } from "../../services/weather-update.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  /**
   * Add switch case to toggle between different icons and backgrounds for the weather conditions
   */
  
  cityWeather: any = {
    city: {
      name: "",
    },
    list: {
      main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
      },
      weather: {
        description: "",
        icon: "",
      },
    },
  };

  tempFormat = {
    celcius: "\u00B0C",
    farenheit: "\u00B0F",
  };

  currentTemp: any;
  minTemp: any;
  maxTemp: any;
  weather: string;
  weatherIcon: string;
  weatherIconSrc: any;

  checked: boolean = false;

  date: any = new Date();

  day: any = this.date.getDay();
  dayList: any = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
  today: any = this.dayList[this.day];

  constructor(private weatherUpdate: WeatherUpdateService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  // Getting weather
  getWeather() {
    this.weatherUpdate.getWeather().subscribe((data) => {
      this.cityWeather = data;
      // Converting temperature from Kelvin to Celcius
      this.maxTemp =
        Math.round(this.cityWeather.list[0].main.temp_max - 273.15) +
        this.tempFormat.celcius;
      this.minTemp =
        Math.round(this.cityWeather.list[0].main.temp_min - 273.15) +
        this.tempFormat.celcius;
      this.currentTemp = this.minTemp;

      // Weather description
      this.weather = this.cityWeather.list[0].weather[0].description;
      this.weatherIcon = this.cityWeather.list[0].weather[0].icon;
      this.weatherIconSrc = `http://openweathermap.org/img/wn/${this.weatherIcon}@2x.png`;
    });
  }

  //Slider toggling between Celcius and Farenheit
  changeTemp() {
    if (this.checked === false) {
      // Farenheit toggle
      this.checked = true;
      this.maxTemp =
        Math.round(
          ((this.cityWeather.list[0].main.temp_max - 273.15) * 9) / 5 + 32
        ) + this.tempFormat.farenheit;
      this.minTemp =
        Math.round(
          ((this.cityWeather.list[0].main.temp_min - 273.15) * 9) / 5 + 32
        ) + this.tempFormat.farenheit;
      this.currentTemp = this.minTemp;
    } else {
      // Celcius toggle
      this.checked = false;
      this.maxTemp =
        Math.round(this.cityWeather.list[0].main.temp_max - 273.15) +
        this.tempFormat.celcius;
      this.minTemp =
        Math.round(this.cityWeather.list[0].main.temp_min - 273.15) +
        this.tempFormat.celcius;
      this.currentTemp = this.minTemp;
    }
  }
}
