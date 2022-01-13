import { Module } from '@nestjs/common';
import { AnomalyService } from './anomaly.service';
import { AnomalyController } from './anomaly.controller';

@Module({
  providers: [AnomalyService],
  controllers: [AnomalyController]
})
export class AnomalyModule {}
