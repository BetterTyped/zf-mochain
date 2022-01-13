import {Body, Controller, Post} from "@nestjs/common";
import {AppSevice} from "./app.sevice";


@Controller('/eth-data')
export class AppController {

  constructor(private readonly appService: AppSevice) {
  }

  @Post('/')
  sendData(@Body() requestBody) {
    return this.appService.handleContractData(requestBody);
  }

}
