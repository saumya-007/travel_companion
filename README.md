# travel_companion
It is a carpooling application which connects travelers with and without vehicles for sharing rides. User with vehicles can schedule a ride and people looking for a ride can search those trips, request for a ride, and pay a nominal fee to the service. The Project is developed using MERN technology. 

Functionality includes encrypted Login and Signup using JSON Web Tokens, updating user profile, adding, and editing vehicle details, scheduling trips, and displaying trips on maps, finding trips, requesting for trips for booking a seat, and real time chatting facility.

# IMPORTANT INSTRUCTIONS

- This Project is made using MERN technology and as of now it is suitable for working properly on local systems only. The profile photos will be saved on your local machine and hence you must change FOLDER-LOCATION on line 43 of of BackEnd/index.js with the location of the folder in your local system.
- The profile photo is saved in a local folder and the database must be connected prior to runnning the application. Go to MongoDB compass and create a new collection, make changes to line 28 of BackEnd/index.js and replace travel-buddy with your collection name. Run the index.js file using nodemon index.js.
- Moreover the mapbox API used requires an API key without which the directions feature will not work. You must create a mapbox account and get a free API key which you may substitute YOUR-ACCESS_TOEKN at line 16 FrontEnd/src/components/CountryState.js with you token.
