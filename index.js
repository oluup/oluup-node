const Axios = require("axios").default;
const Web3 = require("web3");

// srcs.
const { API_NAMES, PROVIDER_URLS } = require("./src/shortcuts");

class Contract {
  constructor(web3, contract, address) {
    this.contract = new web3.eth.Contract(contract.abi.abi, address);
  }

  mint() {}

  buy() {}

  changePrice() {}

  toggleIsSale() {}

  burn() {}
}

class Oluup {
  constructor(rpc, version = "v1") {
    this.web3 = new Web3(PROVIDER_URLS[rpc]);

    this.fetch = Axios.create({
      baseURL: `${API_NAMES[rpc]}/api/${version}`
    });
  }

  fetchAbis() {
    return this.fetch.get("/abis").then(({ data }) => data.data.results);
  }

  fetchAbi(id) {
    return this.fetch.get(`/abis/${id}`).then(({ data }) => data.data);
  }

  async contract(name, address) {
    const abis = await this.fetchAbis();

    // get abi name to id
    const [{ id }] = abis.filter((a) => a.name == name);

    return new Contract(this.web3, await this.fetchAbi(id), address);
  }
}

module.exports = Oluup;
