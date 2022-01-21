const Axios = require("axios").default;
const Web3 = require("web3");
const { NFTStorage, Blob } = require("nft.storage");

// srcs.
const {
  API_NAMES,
  NFT_STORAGE_API_URL,
  NFT_STORAGE_KEY,
  IPFS_ROOT_URL,
} = require("./src/shortcuts");

class Contract {
  constructor(web3, contract, address) {
    // defaulr royality
    this.ROYALITY = 10;

    this.contract = new web3.eth.Contract(contract.abi.abi, address);
  }

  mint({ tokenURI, from, price }) {
    const { mint } = this.contract.methods;
    const request = mint(tokenURI, Web3.utils.toWei(price), this.ROYALITY);

    return request.send({
      from,
    });
  }

  preSaleMint({ tokenURI, from, price }) {
    const { preSaleMint } = this.contract.methods;
    const value = Web3.utils.toWei(price);
    const request = preSaleMint(tokenURI, value, this.ROYALITY);

    return request.send({
      from,
      value,
    });
  }

  totalSupply() {
    const { totalSupply } = this.contract.methods;
    return totalSupply().call();
  }
}

class Oluup {
  constructor(eth) {
    this.web3 = new Web3(eth);

    this.fetch = Axios.create({
      baseURL: `${API_NAMES["Testnet"]}/api/v1`,
    });
  }

  async ipfs({ name, description, attributes, image }) {
    const storage = new NFTStorage({
      endpoint: NFT_STORAGE_API_URL,
      token: NFT_STORAGE_KEY,
    });

    const imageCid = await storage.storeBlob(new Blob([image]));

    const data = {
      name,
      description,
      image: `${IPFS_ROOT_URL}/${imageCid}`,
      attributes,
    };

    const metadata = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    const cid = await storage.storeBlob(metadata);

    return `${IPFS_ROOT_URL}/${cid}`;
  }

  fetchAbis() {
    return this.fetch.get("/abis/").then(({ data }) => data.data.results);
  }

  fetchAbi(id) {
    return this.fetch.get(`/abis/${id}/`).then(({ data }) => data.data);
  }

  async contract(name, address) {
    const abis = await this.fetchAbis();

    // get abi name to id
    const [{ id }] = abis.filter((a) => a.name == name);

    return new Contract(this.web3, await this.fetchAbi(id), address);
  }
}

module.exports = Oluup;
