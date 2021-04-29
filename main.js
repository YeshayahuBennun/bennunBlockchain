const SHA256 = require('crypto-js/sha256')

class Block {

    constructor(index, timestamp, data, previosHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previosHash = ''
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(this.index + this.previosHash + this.timestamp + JSON.stringify(this.data)).toString()
    }

}

class Blockchain {


    constructor() {
        this.chain = [this.createGenesisBloc()]
    }

    createGenesisBloc() {
        return new Block(0, "27/04/2021", "Genesis block", "0")
    }

    getLatesBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previosHash = this.getLatesBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previosHash !== previousBlock.hash) {
                return false
            }
        }

        return true
    }

}

let bnunCoin = new Blockchain()
bnunCoin.addBlock(new Block(1, '28/04/2021', { amount: 4 }))
bnunCoin.addBlock(new Block(2, '30/04/2021', { amount: 10 }))

console.log(JSON.stringify(bnunCoin, null, 4))

