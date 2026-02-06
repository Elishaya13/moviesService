/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

interface AuthResponse {
  id: string;
  username: string;
  role: string;
}

@Injectable()
export class RemoteAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Missing token');

    // On demande au service d'authentification de valider ce token
    try {
      const authUrl = this.configService.get('AUTH_SERVICE_URL');

      const { data } = await firstValueFrom(
        this.httpService.post<AuthResponse>(
          `${authUrl}/validate`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      );

      // --- LA VÉRIFICATION ADMIN ---
      // On vérifie que le service auth confirme le rôle 'admin'
      if (data.role !== 'admin')
        throw new ForbiddenException('Admin role required');

      request.user = data;
      return true;
    } catch (error) {
      // On renvoie une 401 si le token est invalide ou une 403 si pas admin
      throw error instanceof ForbiddenException
        ? error
        : new UnauthorizedException('Invalid token');
    }
  }
}
