var Client = require("./client.js");

var githubClient = new Client("api.github.com", "443", "https");

console.log(githubClient);

githubClient.basicAuth("luisrozo", "cai");

githubClient.get("/users/luisrozo", (response) => {
    console.log(response);
});

githubClient.post("/repos/luisrozo/nodejs_project/issues/1/comments", {
    "body": "Testing post method from client"
}, (response) => console.log(response));