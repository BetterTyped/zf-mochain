import {Inject, Injectable} from '@nestjs/common';
import {CarDataModel} from "../models/car-data.model";
import {OnWeb3Event} from "../web3/decorators/on-web3-event.decorator";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {IncomingCarData} from "./interfaces/car-data.interface";

@Injectable()
export class CarDataService {

  constructor(
    @Inject(CarDataModel) private readonly carData: typeof CarDataModel,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
  }

  @OnWeb3Event('contract', 'CarDataAdded')
  async createCarData(err, data) {
    if (err) {
      this.logger.error(err);
    }

    try {
      const { senderAddress, carData } = data.returnValue;
      this.logger.info(`Car data from ${senderAddress} received`);
      const carDataJson: IncomingCarData = JSON.parse(carData);

      await this.carData.query()
        .insert({
          senderAddress,
          ...carDataJson,
        });

      this.logger.info(`Car data from ${senderAddress} saved`);
    } catch(err) {
      this.logger.error(err);
    }

  }

  getAll() {
    return this.carData.query().select();
  }

  getOne(id: number) {
    return this.carData.query().findById(id);
  }
}
