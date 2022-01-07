export default {
  provider: process.env.CONTRACT_PROVIDER || 'ws://127.0.0.1:7545',
  contract:
    process.env.CONTRACT_JSON_ADDRESS ||
    '/Users/jakubkosior/Development/better-typed/zf-hackaton/contract/build/contracts/CarContract.json',
  callerAddress:
    process.env.CALLER_ADDRESS || '0x18908c013b069cCD0232578Bcff1ef9b3425e7a1',
  contractAddress:
    process.env.CONTRACT_ADDRESS ||
    '0xF6C60a7D912da237138Ed6F14a2184ac9B25569A',
};
