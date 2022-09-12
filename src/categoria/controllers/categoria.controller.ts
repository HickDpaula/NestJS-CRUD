import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller('/categoria')
export class CategoriaController{
    constructor(private readonly service: CategoriaService) {}


    @Get()
        @HttpCode(HttpStatus.OK)
        findall():Promise<Categoria[]>{
            return this.service.findALL()
        }

        @Get('/:id')
        @HttpCode(HttpStatus.OK)
        findById(@Param('id', ParseIntPipe)id: number): Promise<Categoria>{
           return this.service.findById(id)
        }

        @Get('/descricao/:descricao')
        @HttpCode(HttpStatus.OK)
        findByNome(@Param('descricao') descricao: string): Promise<Categoria[]>{
           return this.service.findBydescricao(descricao)
        
        }

        @Post()
        @HttpCode(HttpStatus.CREATED)
        create(@Body() categoria: Categoria ): Promise<Categoria>{
            return this.service.create(categoria)
        }
    
        @Put()
        @HttpCode(HttpStatus.OK)
        update(@Body() categoria: Categoria): Promise<Categoria>{
             return this.service.update(categoria)
        }
        
        @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        delete(@Param('id' , ParseIntPipe) id: number){
            return this.service.Delete(id)
        }

}