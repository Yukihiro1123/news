import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
  CardActions,
  Link,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { WeatherType } from "./weather.type";

import { Line } from "react-chartjs-2";

//clear sky, few clouds, overcast clouds, drizzle, rain, shower rain, thunderstorm, snow, mist

const Weather: React.FC = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState<WeatherType | undefined>(undefined);
  const getWeatherData = useCallback(
    async (lat: number | undefined, lon: number | undefined) => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`
        )
        .then((res) => {
          setWeather(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const lat = 35.4122; // 取得したい地域の緯度と経度(今回は東京)
  const lon = 139.413;
  useEffect(() => {
    getWeatherData(lat, lon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [unit, setUnit] = useState("C");
  const calc_unit = (temp: number) => {
    switch (unit) {
      case "F":
        return Math.round((((temp - 273.15) * 9) / 5 + 32) * 10) / 10;
      case "C":
        return Math.round((temp - 273.15) * 10) / 10;
      case "K":
        return Math.round(temp * 10) / 10;
    }
  };
  //グラフ
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Temperature(feels like) unit: " + unit,
      },
    },
  };
  const labels = weather?.daily.map((w: any, index: number) =>
    moment.unix(w.dt).format("dddd")
  );
  const data = {
    labels,
    datasets: [
      {
        label: "day",
        data: weather?.daily.map((w: any, index: number) =>
          calc_unit(w.feels_like.day)
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "morn",
        data: weather?.daily.map((w: any, index: number) =>
          calc_unit(w.feels_like.morn)
        ),
        borderColor: "#66B3BA",
        backgroundColor: "#66B3BA",
      },
      {
        label: "eve",
        data: weather?.daily.map((w: any, index: number) =>
          calc_unit(w.feels_like.eve)
        ),
        borderColor: "#E6AA68",
        backgroundColor: "#E6AA68",
      },
      {
        label: "night",
        data: weather?.daily.map((w: any, index: number) =>
          calc_unit(w.feels_like.night)
        ),
        borderColor: "#27476E",
        backgroundColor: "#27476E",
      },
    ],
  };

  return !weather ? (
    <CircularProgress />
  ) : (
    <Card sx={{ minWidth: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {weather?.timezone}
        </Typography>
        <Divider />
        {/* 晴れ 292K */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="h6">
              {weather?.daily[0].weather[0].description}
            </Typography>
          </div>

          <img
            src={
              `http://openweathermap.org/img/wn/${weather?.daily[0].weather[0].icon}.png` ||
              "https://www.ikaho-kankou.com/wp/wp-content/uploads/2019/01/noimage.png"
            }
            alt="icon"
            height="80px"
          />
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {[0, 1, 2, 3, 4].map((num: number) => (
            <div key={num}>
              <Typography variant="body2">
                {String(
                  moment.unix(weather?.daily[num].dt).format("dddd")
                ).substr(0, 3)}
              </Typography>
              {/* 天気 */}
              <img
                src={
                  `http://openweathermap.org/img/wn/${weather?.daily[num].weather[0].icon}.png` ||
                  "https://www.ikaho-kankou.com/wp/wp-content/uploads/2019/01/noimage.png"
                }
                alt="icon"
                height="40px"
              />
              {/* 最高/最低気温 */}
              <Typography variant="body2">
                {calc_unit(weather?.daily[num].temp.day) + " " + unit}
              </Typography>
              <Typography variant="body2">
                {calc_unit(weather?.daily[num].temp.eve) + " " + unit}
              </Typography>
            </div>
          ))}
        </div>
        <Line options={options} data={data} />
      </CardContent>
      <Divider />
      <CardActions
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Button sx={{ height: "40px" }} onClick={() => setUnit("C")}>
            C
          </Button>
          <Button sx={{ height: "40px" }} onClick={() => setUnit("F")}>
            F
          </Button>
          <Button sx={{ height: "40px" }} onClick={() => setUnit("K")}>
            K
          </Button>
        </div>
        <Link href="https://weathernews.jp/onebox/">
          <Typography variant="body2">weathernews</Typography>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Weather;
