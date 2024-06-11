var ethers = require('ethers');
var express = require('express');
var util = require('../config/util.js');
var router = express.Router();

// contract setup
const provider = new ethers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");
const llgContractABI = require("../config/llg-contract-abi.json");
const llgContractAddress = "0x0e04Ad5f9a40ddfe82ac533C9D5284Fb3C72BcAa";
const contract = new ethers.Contract(llgContractAddress, llgContractABI, provider);
//

router.get('/', async function(req, res) {
    console.log("waiting contract ..........");
    try {
        const result = await contract.isSwapEnabled();
        console.log("contract response: " + result);
        return
        // res.render('partials/play', {
        //     title: 'Chess Hub - Game',
        //     user: req.user,
        //     isPlayPage: true
        // });
    } catch (error) {
        res.status(500).send('Error calling smart contract: ' + error.message);
    }
});

router.post('/', function(req, res) {
    var side = req.body.side;
    //var opponent = req.body.opponent; // playing against the machine in not implemented
    var token = util.randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

module.exports = router;