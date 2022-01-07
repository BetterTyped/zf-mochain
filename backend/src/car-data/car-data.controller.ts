import {Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import {CarDataService} from "./car-data.service";
import {ApiTags} from "@nestjs/swagger";
import {ApiGetResponse} from "@epcnetwork/nestjs-swagger";
import {CarDataResponse} from "./interfaces/car-data.interface";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";


@ApiTags('car data')
@UseGuards(JwtAuthGuard)
@Controller('car-data')
export class CarDataController {

  constructor(
    private readonly carDataService: CarDataService,
  ) {
  }


  @ApiGetResponse({
    type: [CarDataResponse],
    summary: 'Returns car data',
    isAuthGuard: true,
  })
  @Get()
  getAll() {
    return this.carDataService.getAll();
  }

  @ApiGetResponse({
    type: CarDataResponse,
    summary: 'Returns car data',
    params: ['id'],
    isAuthGuard: true,
  })
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.carDataService.getOne(id);
  }

}
