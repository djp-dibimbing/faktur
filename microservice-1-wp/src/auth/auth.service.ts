import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WpService } from 'src/wp/wp.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private wpService: WpService,
  ) {}

  async validateWp(npwp: string, password: string) {
    const wp = await this.wpService.findByNpwp(npwp);
    if (wp && (await bcrypt.compare(password, wp.password))) {
      return wp;
    } else {
      throw new BadRequestException('NPWP atau password salah');
    }
  }

  async login(wp: any) {
    const payload = { npwp: wp.npwp, sub: wp.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
