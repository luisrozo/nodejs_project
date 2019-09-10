var Client = require("./client.js");

var githubClient = new Client("api.github.com", "443", "https");

console.log(githubClient);

githubClient.get("/users/luisrozo", (response) => {
    console.log(response);
});