const PORT = 8000;

import axios from "axios";
import express from "express";
import { load } from "cheerio";
import cors from "cors"; // import the cors module

// define your routes here
const corsOptions = {
  origin: "http://127.0.0.1:5500",
};

const app = express();
app.use(cors(corsOptions)); // use cors middleware
const url = "https://www.theguardian.com/international";

app.get("/", function (req, res) {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = load(html);
      const articles = [];
      $(".fc-item__title", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
      console.log(articles);
    })
    .catch((err) => console.log("Error! Here it is:", err));
});

app.listen(PORT, () => console.log(`Servidor está rodando no PORT ${PORT}`));
