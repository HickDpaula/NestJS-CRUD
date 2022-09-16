import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';



describe('AppController (e2e)', () => {
  let app: INestApplication;
   
  let tarefaId: number


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Y4mk3zu8',
          database: 'db_todolist_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /*
  it
  */

  //Teste para inserir uma Tarefa no banco
  it('01 - Deve inserir uma Tarefa no Banco', async () => {
    let response = await request(app.getHttpServer())
      .post('/tarefa')
      .send({
        nome: 'First Task',
        descricao: 'tarefa da manhã',
        responsavel: 'Eu mesmo >:^)',
        data: '2022-09-15',
        status: true
      })
      .expect(201)

      tarefaId = response.body.id

  })

  //Teste para verificar se conseguimos recuperar uma tarefa em específico
  it('02 - Deve recuperar uma tarefa específica', async () => {
    return request(app.getHttpServer())
      .get(`/tarefa/${tarefaId}`)
      .expect(200)
  })

  //Teste para verificar se conseguimos atualizar uma tarefa
  it('03 - Deve atualizar uma tarefa', async () => {
    return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id: 1,
        nome: 'Primeira Tarefa - Atualizada',
        descricao: 'Minha primeira tarefa do dia',
        responsavel: 'Eu mesmo >:^)',
        data: '2022-09-15',
        status: false
      })
      .expect(200)
      .then(response => {
        expect('Primeira Tarefa - Atualizada').toEqual(response.body.nome)
      })
  })

  //Teste para ver se ele valida uma atualização de uma tarefa que não existe
  it('04 - Não deverá atualizar uma tarefa que não existe', async () => {
    return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id: 10000,
        nome: 'Primeira Tarefa - Atualizada',
        descricao: 'Minha primeira tarefa do dia',
        responsavel: 'Chapolin colorado',
        data: '2022-09-15',
        status: false
      })
      .expect(404)
  })

  //Teste para verificar se conseguimos deletar uma tarefa
  it('05 - Deve deletar uma tarefa do banco', async () => {
    return request(app.getHttpServer())
      .delete('/tarefa/' + tarefaId)
      .expect(204)
  })

  //Parar a execução dos testes
  afterAll(async () => {
    await app.close()
  })

});
