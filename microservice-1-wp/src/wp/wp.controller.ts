import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { WpService } from './wp.service';
import { Wp } from './wp.entity';

@Controller('wp')
export class WpController {
  constructor(private readonly wpService: WpService) {}

  @Post('register')
  async register(@Body() wp: Wp) {
    if (wp.npwp.length !== 15) {
      return { message: 'NPWP harus 15 digit' };
    } else if (wp.nama.length < 3) {
      return { message: 'Nama Wajib Pajak minimal 3 karakter' };
    } else if (await this.wpService.findByNpwp(wp.npwp)) {
      return { message: 'NPWP sudah terdaftar' };
    } else {
      const createdWp = await this.wpService.createWp(wp);
      return {
        message: 'Data Wp berhasil disimpan',
        nama: createdWp.nama,
        npwp: createdWp.npwp,
      };
    }
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const createdWp = await this.wpService.findByNpwp(req.npwp);
    if (!createdWp) {
      return { message: 'Data Wp tidak ditemukan' };
    }
    return {
      message: 'Data Wp ditemukan',
      nama: createdWp.nama,
      npwp: createdWp.npwp,
    };
  }
}
