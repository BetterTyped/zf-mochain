import { Model } from 'objection';
import {CarType} from "../car-data/enums/car-data.enum";
import {Position, Weather} from "../car-data/interfaces/car-data.interface";

export class CarDataModel extends Model {
  static tableName = 'car_data';

  id!: number;
  senderAddress!: string;
  carBrand!: string;
  carType!: CarType;
  weather!: Weather;
  speed!: number;
  position!: Position;
  timestamp!: string;
}
