# oluup-node
Nodejs package for Oluup

## Install

    yarn add oluup
    
## Node And Get Contract

```JS
import Oluup from 'oluup';

// Get Node, Testnet or Mainnet
const OluupNode = new Oluup(wallet.ethereum); // eth provider.

// Collection Contract Address
const contract_address = "xxxxxx";

// Contract Object
const contract = await OluupNode.contract("Single", contract_address);
```

## Mint

```JS

// Example token uri
const tokenURI = "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2";

// Mint
contract.mint({
    tokenURI,
    from: wallet.account, // Minter Account
    buyAmount: "0.01", // Nft price
    // mintAmount: MINT_AMOUNT, // Optional
});
```

## İpfs 

```JS

const tokenURI = await OluupNode.ipfs({
  name: "dsdsds",
  description: "dsdsdss",
  image,

  attributes: [
    {
      trait_type: "Body",
      value: "Standard",
    },
  ],
});
```
