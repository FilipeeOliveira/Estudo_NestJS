import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { GlobalConfigModule } from './global-config/global-config.module';
import globalConfig from './global-config/global.config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 10000, // time to live em ms
        limit: 10, // máximo de requests durante o ttl
        blockDuration: 5000, // tempo de bloqueio
      },
    ]),
    ConfigModule.forFeature(globalConfig),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule.forFeature(globalConfig)],
        inject: [globalConfig.KEY],
        useFactory: async (globalConfiguration: ConfigType<typeof globalConfig>) => {
          return {
            type: globalConfiguration.database.type,
            host: globalConfiguration.database.host,
            port: globalConfiguration.database.port,
            username: globalConfiguration.database.username,
            database: globalConfiguration.database.database,
            password: globalConfiguration.database.password,
            autoLoadEntities: globalConfiguration.database.autoLoadEntities,
            synchronize: globalConfiguration.database.synchronize,
          }
        }
      }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'pictures'),
      serveRoot: '/pictures'
    }),
    RecadosModule,
    PessoasModule,
    GlobalConfigModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
