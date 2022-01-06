import { Inject, Injectable } from '@nestjs/common';
import { OnWeb3Event } from './web3/decorators/on-web3-event.decorator';

@Injectable()
export class AppService {
  constructor(@Inject('contract') private readonly contract) {
    // console.log(contract)
  }

  @OnWeb3Event('contract', 'CarDataAdded')
  eventHandler(err, data) {
    console.log(data.returnValues);
  }

  interact() {
    this.contract.methods
      .postData('mercedes')
      .send({ from: '0xcE74C2f59Db35b6b0A169190E801378153309672' })
      .then(function (receipt) {
        return receipt;
      });
  }
}
