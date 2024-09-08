import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();
const loginDto: AuthDto = {
    login: 'a2@a.ru',
    password: '1'
};


describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

    });
    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();

            });
    });

    it('/auth/login (POST) - fail password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: '2' })
            .expect(401)
            .then((response: request.Response) => {

                expect(response.body).toEqual({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'Неправильный пароль',
                });
            });
    });

    it('/auth/login (POST) - fail email', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'aaa@a.ru' })
            .expect(401)
            .then((response: request.Response) => {

                expect(response.body).toEqual({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'Пользователь с таким email не найден',
                });
            })
    })


    afterAll(() => {
        disconnect();
    });
})