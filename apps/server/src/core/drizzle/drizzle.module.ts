import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DrizzleProvider } from './drizzle.provider'
import { DrizzleService } from './drizzle-service'

@Module({
   imports: [ConfigModule],
   providers: [
      DrizzleProvider,
      DrizzleService,
      // {
      //   provide: DRIZZLE,
      //   inject: [ConfigService],
      //   useFactory: async (configService: ConfigService) => {
      //     const databaseURL = configService.get<string>('DATABASE_URL');
      //     const pool = new Pool({
      //       connectionString: databaseURL,
      //       //   ssl: true,
      //     });
      //     return drizzle(pool) as NodePgDatabase<typeof schema>;
      //   },
      // },
   ],
   exports: [DrizzleService],
})
export class DrizzleModule {}
