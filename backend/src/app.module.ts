import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          cors: {
            origin: config.get('CLIENT_URL'),
          },
          autoSchemaFile: join(
            process.cwd(),
            config.get<string>('SCHEMA_PATH'),
          ),
          sortSchema: true,
          playground: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: AccessTokenGuard }, AuthService, JwtService,
  ],
})
export class AppModule { }
