import {Inject, Injectable} from "@nestjs/common";


@Injectable()
export class AppSevice {

  constructor(
    @Inject('contract') private readonly contract,
  ) {
  }

  async handleContractData({ ethAccount, ...data }) {
    try {
      console.log(data);
      await this.contract.methods.postData(JSON.stringify(data)).send({ from: ethAccount });
      console.log('data sent', ethAccount);
      return {'send': true}
    } catch(err) {
      console.log(err)
    }
  }

}
