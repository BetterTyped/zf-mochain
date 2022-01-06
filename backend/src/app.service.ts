import {Inject, Injectable} from "@nestjs/common";
import {OnWeb3Event} from "./web3/decorators/on-web3-event.decorator";


@Injectable()
export class AppService {

  constructor(
    @Inject('contract') private readonly contract,
  ) {
    // console.log(contract)
  }

  @OnWeb3Event('contract', 'CarDataAdded')
  eventHandler(err, data) {
    console.log(data.returnValues);
  }

  interact() {
    this.contract.methods.postData("mercedes").send({ from: '0x18908c013b069cCD0232578Bcff1ef9b3425e7a1'}).then(function(receipt) { return receipt})

  }





}