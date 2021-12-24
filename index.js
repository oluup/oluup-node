const axios = require('axios').default;

// srcs.
const { API_NAMES } = require("./src/shortcuts");

class Oluup {
    constructor(api) {

        // testnet or mainnet
        this.API_URL = API_NAMES[api];

        if (this.API_URL) {
            console.error("Api is testnet or mainnet");
        }
    }

    fetch() {

    }

    abis() {
        return {}
    }

    abi(id) {
        return {}
    }
}

module.exports = Oluup;