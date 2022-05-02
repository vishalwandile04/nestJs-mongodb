import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';

describe('AppModule', () => {
    let appModule: AppModule

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [AppController],
            providers: [AppService, Logger],
        }).compile();

        appModule = app.get<AppModule>(AppModule);
    });

    it('should be defined appModule', () => {
        expect(appModule).toBeDefined();
    });
});
