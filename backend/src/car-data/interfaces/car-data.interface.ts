import {CarType} from "../enums/car-data.enum";
import {ApiProperty} from "@nestjs/swagger";

export type Units = 'metric' | 'imperial';

export class Wind {
  @ApiProperty({
    type: Number,
  })
  speed: number;

  @ApiProperty({
    type: Number,
  })
  degree: number;
}

export class Weather {
  @ApiProperty({
    type: String,
  })
  units: Units;

  @ApiProperty({
    type: Number,
  })
  temperature: number;

  @ApiProperty({
    type: Number,
  })
  humidity: number;

  @ApiProperty({
    type: Wind,
  })
  wind: Wind;
}

export class Position {
  @ApiProperty({
    type: Number,
  })
  latitude: number;

  @ApiProperty({
    type: Number,
  })
  longitude: number;
}

export class IncomingCarData {
  @ApiProperty({
    type: String,
  })
  carBrand?: string;

  @ApiProperty({
    type: String,
  })
  carType?: CarType;

  @ApiProperty({
    type: Weather,
  })
  weather?: Weather;

  @ApiProperty({
    type: Number,
  })
  speed?: number;

  @ApiProperty({
    type: Position,
  })
  position?: Position;

  @ApiProperty({
    type: String,
  })
  timestamp?: string;
}


export class CarDataResponse extends IncomingCarData {

  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  senderAddress: string;
}
