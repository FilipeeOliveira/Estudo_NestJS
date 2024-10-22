import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { GlobalConfigModule } from './global-config/global-config.module';
import globalConfig from './global-config/global.config';


@Module({
  imports: [
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
      },
    ),
    RecadosModule,
    PessoasModule,
    GlobalConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
