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
  createUser(@Body() user: User) {
    console.log('.:: user: ', user);
    // Valide que el correo no este vacio
    if (user.email.trim() === '') {
      throw new BadRequestException(`El correo no puede estar vacio`);
    }

    //Valide que el correo tenga el formato correcto
    if (user.email.includes('@') === false) {
      throw new UnprocessableEntityException(
        `El correo ${user.email} no tiene el formato correcto`,
      );
    }

    this.users.push(user);
    return {
      msg: 'Usuario creado correctamente',
      data: user,
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
  updateUser(@Param('id') id: string, @Body() changes: User) {
    console.log('.:: ID usuario: ', id);
    console.log('.:: Cambios: ', changes);

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
