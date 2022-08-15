import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { User } from '../../users/entity/user.entity';
import { CreateReportDto } from '../dtos/create-report.dto';
import { ReportDto } from '../dtos/report.dto';
import { ReportsService } from '../services/reports.service';
import { ApproveReportDto } from '../dtos/approve-report.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { GetEstimateDto } from '../dtos/get-estimate.dto';

@Serialize(ReportDto)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  approveReport(
    @Param('id') id: string,
    @Body() { approved }: ApproveReportDto
  ) {
    return this.reportsService.changeApproval(parseInt(id), approved);
  }
}
