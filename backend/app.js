const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const todoRoutes = require("./routes/to-doRoutes");

app.use(express.json());
app.use(cors());

app.use(todoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  mongoose
    .connect(
      "mongodb+srv://arkaguha:8Ks-5hm-ptq4Qa%40@aws.k0mdonf.mongodb.net/to-do-list",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
});

/* 

Ques.
A City Bus is a Ring Route Bus which runs in circular fashion. That is, Bus once starts at the Source Bus Stop, halts at each Bus Stop in its Route and at the end it reaches the Source Bus Stop again.
If there are n number of Stops and if the bus starts at Bus Stop 1, then after nth Bus Stop, the next stop in the Route will be Bus Stop number 1 always.
If there are n stops, there will be n paths. One path connects two stops. Distances (in meters) for all paths in Ring Route is given in array Path[] as given below:
Path = [800, 600, 750, 900, 1400, 1200, 1100, 1500]

Fare is determined based on the distance covered from source to destination stop as Distance between Input Source and Destination Stops can be measured by looking at values in array Path and fare can be calculated as per following criteria:
If d = 1000 meters, then fare=5 INR
(When calculating fare for others, the calculated fare containing any fraction value should be ceiled. For example, for distance 900n when fare initially calculated is 4.5 which must be ceiled to 5)

Path is circular in function. Value at each index indicates distance till current stop from the previous one. And each index position can be mapped with values at same index in Bus Stops [] array, which is a string array holding abbreviation of names for all stops as-
THANERAILWAYSTN = TH
NITINCOMPANYJUNCTION = NI
GAONDEVI = GA
CADBURRYJUNCTION = CA
ICEFACTROY = IC
LUISWADI = LU
HARINIWASCIRCLE = HA
TEENHATΗΝΑΚΑ = ΤΕ

Given, n = 8 where n is number of total Bus Stops.
BusStops = [ "TH", "GA", "ІС", "НА", "TE", "LU", "NI","CA"]
Write a code with function getFare(String Source, String Destination) which take Input as source and destination stops(in the format containing first two characters of the Name of the Bus Stop) and calculate and return travel fare.


Examples
1. Input Values: ca, Ca
2. Input Values: NI, HA
------------------------
1. Output Values:  INVALID OUTPUT
2. Output Values : 23.0

*/

// function getFare(source, destination) {
//   const fare = 5 / 1000;
//   const stops = ["TH", "GA", "IC", "HA", "TE", "LU", "NI", "CA"];
//   const distances = [800, 600, 750, 900, 1400, 1200, 1100, 1500];
//   let totalDistance = 0;
//   let i = 0;

//   function getIndex(arr, input) {
//     return arr.findIndex((stop) => stop === input);
//   }

//   if (source === destination) return "Invalid Input";

//   if (source.length !== 2 || destination.length !== 2) return "Invalid Input";
//   else {
//     source = source.toUpperCase();
//     destination = destination.toUpperCase();
//   }

//   const sourceIndex = getIndex(stops, source);

//   const destinationIndex = getIndex(stops, destination);

//   if (sourceIndex === -1 || destinationIndex === -1) return "Invalid Input";

//   if (sourceIndex > destinationIndex) {
//     for (i = sourceIndex; i >= destinationIndex; i--) {
//       totalDistance += distances[i];
//     }
//   } else {
//     for (i = sourceIndex; i <= destinationIndex; i++) {
//       totalDistance += distances[i];
//     }
//   }
//   console.log("Source Index:", sourceIndex);
//   console.log("Destination Index:", destinationIndex);

//   // const travelDistance = distances[sourceIndex] - distances[destinationIndex];
//   const finalFare = Math.ceil(Math.abs(totalDistance) * fare);
//   console.log("total distance", totalDistance);

//   console.log("Final Fare:", finalFare);
//   return finalFare;
// }

// console.log(getFare("ni", "ha"));
