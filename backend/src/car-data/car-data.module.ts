import { Module } from '@nestjs/common';
import { CarDataService } from './car-data.service';
import { CarDataController } from './car-data.controller';
import {ObjectionModule} from "@willsoto/nestjs-objection";
import {CarDataModel} from "../models/car-data.model";

@Module({
  imports: [ObjectionModule.forFeature([CarDataModel])],
  providers: [CarDataService],
  controllers: [CarDataController]
})
export class CarDataModule {}
