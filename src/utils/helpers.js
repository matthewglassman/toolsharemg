var axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {
  // Returns a promise object we can .then() off inside our Parent component
  getMyToolsUser() {
    return axios.get("/mytools");
  }

  }
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  // saveClicks: function(clickData) {
  //   return axios.post("/api", clickData);
  // }
};
