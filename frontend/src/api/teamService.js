const SERVER_URL = "http://localhost:4000";


const addTeam = function (teamData) {
  console.log(teamData)
  return fetch(SERVER_URL+"/api/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({teamData: teamData}),  // Ensure teamData is not wrapped in another object
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    
    return res.json();
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
};

const joinTeam = function (teamName, userId) {
  
  return fetch(SERVER_URL+"/api/teams/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({teamName: teamName, userId:userId }),  // Ensure teamData is not wrapped in another object
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    
    return res.json();
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
};

const getTeams = function () {
  return fetch(SERVER_URL+"/api/teams")
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
};

const getTeam = function (teamId) {
  return fetch(SERVER_URL+`/api/teams/${teamId}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
};

const getTeamCaptain = function (teamId) {
  return fetch(SERVER_URL+`/api/teams/${teamId}/captain`)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
};

const getRoster = function (teamId) {
  return fetch(SERVER_URL+`/api/teams/${teamId}/roster`)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
};


export {
  addTeam,
  getTeams,
  joinTeam,
  getTeam,
  getTeamCaptain, 
  getRoster,

};
