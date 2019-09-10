
class Client {

    constructor(host, port, protocol) {
        this.host = host;
        this.port = port;
        this.protocol = protocol;

        if(protocol !== "http" && protocol !== "https") {
            console.log("Protocol must be http or https");
        }
    }

    processHeaders() {

        return {
            "Accept": "*/*",
            "User-Agent": "Cliente Node.js",
        };

    }

    get(uri, callback) {

        var options = {
            hostname: this.host,
            port: this.port,
            method: "GET",
            path: this.protocol + "://" + this.host + uri,
            headers: this.processHeaders()
        };

        this.request(options, callback);

    }

    post(uri, data) {

    }

    request(options, callback) {

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
                callback(response);
            });
        });

        request.end();
    }

}

module.exports = Client;