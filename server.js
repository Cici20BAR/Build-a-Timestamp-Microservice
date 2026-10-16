
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api{/:date}", (req, res) => {
  let date_param = req.params.date;
  let date;

  if (date_param === undefined) {
    date = new Date();
  } else {
     const timestamp = Number(date_param);

  if (date_param !== "" && Number.isFinite(timestamp)) {
    date = new Date(timestamp);
    
  } else{
    date = new Date(date_param);
    }

    if (isNaN(date.getTime())) {
      return res.json({
        error: "Invalid Date"
      });
    }
  }

  let unix = date.getTime();
  let utc = date.toUTCString();

  res.json({
    unix,
    utc
  });
});

         
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
