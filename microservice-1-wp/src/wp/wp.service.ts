import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wp } from './wp.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class WpService {
  constructor(@InjectRepository(Wp) private wpRepo: Repository<Wp>) {}

  async createWp(wp: Wp): Promise<Wp> {
    const hashedPassword = await bcrypt.hash(wp.password, 10);
    const wpExists = await this.findByNpwp(wp.npwp);
    if (wpExists) {
      throw new BadRequestException(`WP dengan NPWP ${wp.npwp} sudah ada`);
    } else {
      wp.password = hashedPassword;
      const newWp = this.wpRepo.create(wp);
      return this.wpRepo.save(newWp);
    }
  }

  async findByNpwp(npwp: string) {
    const wp = await this.wpRepo.findOne({ where: { npwp } });
    return wp;
  }
}
