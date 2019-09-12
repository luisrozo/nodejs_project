const fs = require("fs");


class Client {

    constructor(host, port, protocol) {
        this.host = host;
        this.port = port;
        this.protocol = protocol;

        if(protocol !== "http" && protocol !== "https") {
            console.log("Protocol must be http or https");
        }

        this.logDir = fs.mkdtempSync("/tmp/http-client-");
    }

    basicAuth(user, pass) {
        this.bAuth = new Buffer(user + ":" + pass).toString("base64");
    }

    processHeaders() {

        var headers = {
            "Accept": "*/*",
            "User-Agent": "Node.js Client",
        };

        if(this.bAuth !== undefined) {
            headers.Authorization = "Basic " + this.bAuth;
        }

        return headers;

    }

    get(uri, callback) {

        var options = {
            hostname: this.host,
            port: this.port,
            method: "GET",
            path: this.protocol + "://" + this.host + uri,
            headers: this.processHeaders(),
        };

        this.request(options, null, callback);

    }

    post(uri, data, callback) {

        var options = {
            hostname: this.host,
            port: this.port,
            method: "POST",
            path: this.protocol + "://" + this.host + uri,
            headers: this.processHeaders(),
        };

        this.request(options, data, callback);

    }

    request(options, data, callback) {

        var http = require(this.protocol);
        var response = {
          status: null,
          body: "",
          headers: null,
        };

        var request = http.request(options, (responseChannel) => {
            responseChannel.on("data", (chunk) => {
                response.body += chunk;
            });

            responseChannel.on("end", () => {
                response.status = responseChannel.statusCode;
                response.headers = responseChannel.headers;
                fs.appendFile(this.logDir + "/client.log", "logging ...");
                callback(response);
            });
        });

        if(data !== undefined && data !== null) {
            var body = JSON.stringify(data);
            request.setHeader("Content-Length", Buffer.byteLength(body));
            request.setHeader("Content-Type", "application/json");
            request.write(body);
        }

        request.end();

    }

}

module.exports = Client;