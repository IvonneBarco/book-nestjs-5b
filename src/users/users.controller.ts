import {
  Body,
  Controller,
  Delete,
  BadRequestException,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface User {
  id: string;
  name: string;
  email: string;
}
@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'Juanita',
      email: 'juanita@correo.com',
    },
    {
      id: '2',
      name: 'Carlos',
      email: 'carlos@correo.com',
    },
    {
      id: '3',
      name: 'Ana',
      email: 'ana.gomez@correo.com',
    },
    {
      id: '4',
      name: 'Mateo',
      email: 'mateo.perez@correo.com',
    },
    {
      id: '5',
      name: 'Sofía',
      email: 'sofia.ruiz@correo.com',
    },
    {
      id: '6',
      name: 'David',
      email: 'david.lopez@correo.com',
    },
    {
      id: '7',
      name: 'Lucía',
      email: 'lucia.torres@correo.com',
    },
    {
      id: '8',
      name: 'Andrés',
      email: 'andres.castro@correo.com',
    },
    {
      id: '9',
      name: 'Valentina',
      email: 'valentina.morales@correo.com',
    },
    {
      id: '10',
      name: 'Alejandro',
      email: 'alejandro.ortiz@correo.com',
    },
  ];

  @Get('')
  getAllUsers() {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('.:: User ID: ', id);
    const user = this.users.find((user) => user.id === id);
    console.log('.:: usuario buscado: ', user);
    if (user === undefined) {
      // Simulación de usuario no encontrado, error 404
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }

    // Simulación para error de permisos
    if (user.id === '1') {
      throw new ForbiddenException(
        `No tienes permisos para acceder al usuario con ID ${id}`,
      );
    }
    return user;
  }

  @Get('search/:name')
  getUserUserByName(@Param('name') name: string) {
    const data = this.users.find((user) => user.name === name);
    if (!data) {
      throw new NotFoundException(`Usuario con nombre ${name} no existe`);
    }
    return { result: data?.email };
  }

  @Post()
  createUser(@Body() userPayload: CreateUserDto) {
    console.log('.:: user: ', userPayload);

    const newUser = {
      ...userPayload,
      id: `${new Date().getTime()}`,
      nickname: userPayload.name.substring(0, 3) + '123'
    };
    this.users.push(newUser);

    return {
      message: 'Usuario creado correctamente',
      data: userPayload,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }
    this.users.splice(position, 1);
    return {
      msg: 'Usuario eliminado correctamente',
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }
    const currentData = this.users[position];
    const updateUser = {
      ...currentData,
      ...changes,
    };
    this.users[position] = updateUser;

    return {
      msg: 'Usuario actualizado',
      data: updateUser,
    };
  }
}
