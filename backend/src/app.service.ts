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





}