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
    const fassnApiUrl = 'https://api.fashn.ai/v1/tryon'; // 正しいエンドポイントに修正
    const apiKey = process.env.FASHN_API_KEY;

    console.log('FASHN_API_KEY:', apiKey);

    if (!apiKey) {
      throw new Error('FASHN_API_KEY is not set in environment variables');
    }

    let imageUrl: string;

    try {
      const response = await lastValueFrom(
        this.httpService.post<{ imageUrl: string }>(
          fassnApiUrl,
          {
            person: personUrl,
            garment: garmentUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        ),
      );
      imageUrl = response.data.imageUrl;
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      throw new Error(
        `Failed to fetch try-on image: status ${status}, response: ${JSON.stringify(data)}`,
      );
    }

    const existing = await this.prisma.tryOn.findMany({
      where: { userId },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });

    if (existing.length >= 10) {
      const oldest = existing[0];
      console.log(
        `Deleting oldest tryOn record with id: ${oldest.id} for userId: ${userId}`,
      );
      await this.prisma.tryOn.delete({ where: { id: oldest.id } });
    }

    console.log(
      `Creating new tryOn record for userId: ${userId} with imageUrl: ${imageUrl}`,
    );
    await this.prisma.tryOn.create({
      data: {
        userId,
        imageUrl,
      },
    });
    console.log(`Successfully created tryOn record for userId: ${userId}`);

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
