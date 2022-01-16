# oluup-node
Nodejs package for Oluup

## Install

    yarn add oluup
    
## Use

```JS
import Oluup from 'oluup';

// Get Node, Testnet or Mainnet
const OluupNode = new Oluup(wallet.ethereum); // eth provider.

// Collection Contract Address
const contract_address = "xxxxxx";

// Contract Object
const contract = await OluupNode.contract("Single", contract_address);

// Example token uri
const tokenURI = "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2";

// Mint
contract.mint({
    tokenURI,
    from: wallet.account, // Minter Account
    buyAmount: MINT_AMOUNT, // Nft price
    // mintAmount: MINT_AMOUNT, // Optional
});


// Example Token Id
const tokenID = 1;


// Buy
contract.buy(tokenID);

// Change Price
contract.changePrice(tokenID);

// Toggle Is Sale
contract.toggleIsSale(tokenID);

// Burn
contract.burn(tokenID);
```
