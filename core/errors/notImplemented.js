function NotImplementedError(message) {
    this.name = "Not Implemented";
    this.message = (message || "");
    this.status = 501;
}

NotImplementedError.prototype = Error.prototype;

module.exports = NotImplementedError;
