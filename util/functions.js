const axios = require('axios');

module.exports.externalApi = (user)=>{

    axios
    .get("https://jsonplaceholder.typicode.com/posts/1")
    .then(result => {
      console.log("recovery success - ", result.data);
      user.isFinished = 1;
      user
        .save()
        .then(() => console.log("recovery update success"))
        .catch(err => console.log("recovery update failed"));
    })
    .catch(err => console.log("axios failed - ", err));
  }


/**
 * this function iterate throw users and make an external api call 
 * for each one of them
 * @param {all the users who didn't finish their external api call} users 
 */
module.exports.recovery = (users) => {
    userWhoFailedApi = [];
    users.forEach(user => {
      if (!user.isFinished) {

        externalApi(user);
        
      }
    });
  }
  
  