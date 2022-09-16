import { IsNotEmpty, isNotEmpty, MaxLength } from "class-validator";
import { Tarefa } from "../../tarefa/entities/tarefa.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_categoria')
export class Categoria{
     
     @PrimaryGeneratedColumn()
     @ApiProperty()
     id: number
      
     @IsNotEmpty()
     @MaxLength(255)
     @Column({nullable: false, length: 255})
     @ApiProperty()
     descricao: string
     
     @OneToMany(()=> Tarefa, (tarefa) => tarefa.categoria)
     @ApiProperty({ type: ()  => Tarefa })
     tarefas: Tarefa[]

}