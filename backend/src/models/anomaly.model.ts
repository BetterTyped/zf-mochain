import { Model } from 'objection';
import {CarType} from "../car-data/enums/car-data.enum";
import {Position} from "../car-data/interfaces/car-data.interface";

export class AnomalyModel extends Model {
  static tableName = 'anomaly';

  id!: number;
  senderAddress!: string;
  carBrand!: string;
  carType!: CarType;
  position!: Position;
  anomaly!: string;
  timestamp!: string;
}
