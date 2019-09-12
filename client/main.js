var Client = require("./client.js");

// HTTP Client

/* var githubClient = new Client("api.github.com", "443", "https"); */

/*githubClient.basicAuth("luisrozo", "cai");

githubClient.get("/users/luisrozo", (response) => {
    console.log(response);
});

githubClient.post("/repos/luisrozo/nodejs_project/issues/1/comments", {
    "body": "Testing post method from client"
}, (response) => console.log(response));*/

// Backend

var localClient = new Client("localhost", "3000", "http");

localClient.post("/animals/", {
    name: "Luna",
    type: "Dog"
}, (response) => console.log(response));