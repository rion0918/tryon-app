import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TryOnService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async tryOnClothes(
    userId: number,
    personUrl: string,
    garmentUrl: string,
  ): Promise<string> {
    const fassnApiUrl = 'https://api.fashn.me/tryon'; // 仮のURL、実際のエンドポイントに置き換えてください

    const response = await lastValueFrom(
      this.httpService.post<{ imageUrl: string }>(fassnApiUrl, {
        person: personUrl,
        garment: garmentUrl,
      }),
    );
    const imageUrl = response.data.imageUrl;

    const existing = await this.prisma.tryOn.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    if (existing.length >= 10) {
      const oldest = existing[0];
      await this.prisma.tryOn.delete({ where: { id: oldest.id } });
    }

    // DB に保存
    await this.prisma.tryOn.create({
      data: {
        userId,
        imageUrl,
      },
    });

    return imageUrl;
  }

  async getTryOns(
    userId: number,
  ): Promise<{ id: number; imageUrl: string; createdAt: Date }[]> {
    return this.prisma.tryOn.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}
