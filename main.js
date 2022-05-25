const SHA256=require('crypto-js/sha256');
class Block{
    constructor( index, timestamp,data,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}
class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock()]
    }
    createGenesisBlock(){
        return new Block(0,'01/05/2022', 'Genesis Block' ,'0')
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
        
    }
    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            this.currentBlock=this.chain[i];
            this.previousBlock=this.chain[i-1]

            if(this.currentBlock.hash !== this.currentBlock.calculateHash()){
                return false;
            }
            if(this.currentBlock.previousHash!== this.previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}
let chadCoin=new BlockChain()
chadCoin.addBlock(new Block(1, "02/05/2022" ,{amount:4}))
chadCoin.addBlock(new Block(2, "03/05/2022" ,{amount:3}))
console.log("Is blockchain Valid",chadCoin.isChainValid())
// console.log(JSON.stringify(chadCoin,null,4));