import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from '../dtos/create-report.dto';
import { Report } from '../entity/report.entity';
import { GetEstimateDto } from '../dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>
  ) {}

  create(payload: CreateReportDto, user: User) {
    const report = this.repository.create(payload);
    report.user = user;
    return this.repository.save(report);
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repository
      .createQueryBuilder()
      .select('AVG(price)', 'price') //select('*') for list of objects
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawMany();
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repository.save(report);
  }
}
