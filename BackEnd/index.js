const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors')

const sessionController = require("./controller/session-controller");
const roleController = require("./controller/role-controller");
const userController = require("./controller/user-controller");
const vehicleController = require("./controller/vehicle-controller");
const cityController = require("./controller/city-controller");
const interCityController = require("./controller/intercity-controller");
const baseFairTypeController = require("./controller/baseFairType-controller");
const tripController = require("./controller/trip-controller");
const tripPassengerController = require("./controller/tripPassengers-controller");
const conversationController = require('./controller/conversation-controller');
const messageController = require("./controller/message-controller")
const previousSearcheController = require("./controller/PreviousSearches-controller")
const vehicleCategoryController = require("./controller/vehicle-category-controller")

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors())

//database
mongoose.connect('mongodb://localhost/travel-buddy', function (err) {
    if (err) {
        console.log("DB Connection failed");
        console.log(err);
    }
    else {
        console.log("DB connnected");
    }
})

//profile pic
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "D:/Internship Ahmedabad/Projects/travel-buddy-react/public/images")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

//urls
app.get("/", function (req, res) {
    res.write("hello");
    res.end();
})
app.get("/login", sessionController.login)
app.get("/signup", sessionController.signup)
app.post("/saveuser", sessionController.saveuser);

//role controller

app.post("/roles", roleController.addRole);
app.get("/roles", roleController.getAllRole);
app.delete("/roles/:roleId", roleController.deleteRole);
app.put("/roles", roleController.updateRole);

//user controller 

app.post("/users", upload.single("profilephoto"), userController.addUser);
app.get("/users", userController.getAllUser);
app.delete("/users/:userId", userController.deleteUser);
app.options('/profilephotoupdate', cors())
app.put("/profilephotoupdate", upload.single("profilephoto"), userController.updateProfile);
app.put("/users", userController.updateUser);
app.get("/users/:userId", userController.getRequestedUser);
app.post("/login", userController.login);

//vehicle controller

app.post("/vehicles", vehicleController.addVehicle);
app.get("/vehicles", vehicleController.getAllVehicle);
app.get("/vehicles/:userId", vehicleController.getRequestedVehicle);
app.delete("/vehicles/:vehicleId", vehicleController.deleteVehicle);
app.put("/vehicles", vehicleController.updateVehicle);

//city controller

app.post("/cities", cityController.addCity);
app.get("/cities", cityController.getAllCity);
app.delete("/cities/:cityId", cityController.deleteCity);
app.put("/cities", cityController.updateCity);

//inter city controller

app.post("/interCities", interCityController.addInterCity);
app.get("/interCities", interCityController.getAllInterCity);
app.delete("/interCities/:interCityId", interCityController.deleteInterCity);
app.put("/interCities", interCityController.updateInterCity);

//base Fair Types

app.post("/baseFairtypes", baseFairTypeController.addbaseFairTypes);
app.get("/baseFairtypes", baseFairTypeController.getAllbaseFairTypes);
app.delete("/baseFairtypes/:baseFairTypeId", baseFairTypeController.deletebaseFairTypes);
app.put("/baseFairtypes", baseFairTypeController.updatebaseFairTypes);

//trip 

app.post("/trips", tripController.addTrips);
app.get("/trips/:user", tripController.getRequestedTrips);
app.get("/trips/:startLocation/:endLocation", tripController.getTripsForPatron);
app.delete("/trips/:tripId", tripController.deleteTrips);
app.put("/trips", tripController.updateTrips);

//trip passenger

app.post("/tripPassengers", tripPassengerController.addTripPassengers);
app.get("/tripPassengers/:userId", tripPassengerController.getAllTripPassengers);
app.get("/tripPassengerStatus/:tripId/:userId", tripPassengerController.getStatusTripPassengers);
app.delete("/tripPassengers/:tripPassengerId", tripPassengerController.deleteTripPassengers);
app.put("/tripPassengers", tripPassengerController.updateTripPassengers);

//category

app.post("/category", vehicleCategoryController.addCategory);
app.get("/category", vehicleCategoryController.getCategory);

//conversations

app.post("/conversations", conversationController.addConversation)
app.get("/conversations/:userId", conversationController.getRequestedConversation)

//messages

app.post("/messages", messageController.addMessage)
app.get("/messages/:conversationId", messageController.getRequestedMessage)

//searches

app.post("/addsearch", previousSearcheController.addSearch)
app.get("/addsearch/:userId", previousSearcheController.getRequiredSearch)

//upload profile pic

//server
app.listen(8080, function () {
    console.log("server started");
})