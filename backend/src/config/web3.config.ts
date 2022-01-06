export default {
  provider: process.env.CONTRACT_PROVIDER || 'ws://127.0.0.1:8545',
  contract:
    process.env.CONTRACT_JSON_ADDRESS ||
    '/home/kacper/hackaton/zf-mochain/contract/build/contracts/CarContract.json',
  callerAddress:
    process.env.CALLER_ADDRESS || '0xA1ff1d4b0BFbA8A3F745492E232b9025a4Dfb0FA',
  contractAddress:
    process.env.CONTRACT_ADDRESS ||
    '0x79a783ecdE9E70A4B57AA46219AC9830e042A2b7',
};
