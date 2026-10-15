import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor() {}

  private users: User[] = [
    {
      id: '1',
      name: 'Juanita',
      email: 'juanita@correo.com',
      isActive: true,
    },
    {
      id: '2',
      name: 'Carlos',
      email: 'carlos@correo.com',
      isActive: false,
    },
    {
      id: '3',
      name: 'Ana',
      email: 'ana.gomez@correo.com',
      isActive: true,
    },
    {
      id: '4',
      name: 'Mateo',
      email: 'mateo.perez@correo.com',
      isActive: true,
    },
    {
      id: '5',
      name: 'Sofía',
      email: 'sofia.ruiz@correo.com',
      isActive: true,
    },
    {
      id: '6',
      name: 'David',
      email: 'david.lopez@correo.com',
      isActive: false,
    },
    {
      id: '7',
      name: 'Lucía',
      email: 'lucia.torres@correo.com',
      isActive: true,
    },
    {
      id: '8',
      name: 'Andrés',
      email: 'andres.castro@correo.com',
      isActive: false,
    },
    {
      id: '9',
      name: 'Valentina',
      email: 'valentina.morales@correo.com',
      isActive: true,
    },
    {
      id: '10',
      name: 'Alejandro',
      email: 'alejandro.ortiz@correo.com',
      isActive: true,
    },
  ];

  findAll(): User[] {
    // logica de negocio
    return this.users.filter((user) => user.isActive);
  }

  findById(id: string): User | undefined {
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

  search(name: string): any | undefined {
    const data = this.users.find((user) => user.name === name);
    if (!data) {
      throw new NotFoundException(`Usuario con nombre ${name} no existe`);
    }
    return { result: data.email };
  }

  create(userPayload: CreateUserDto) {
    const newUser = {
      ...userPayload,
      id: `${new Date().getTime()}`,
      nickname: this.nicknameGenerator(userPayload.name),
      isActive: true,
    };
    this.users.push(newUser);

    return {
      message: 'Usuario creado correctamente',
      data: userPayload,
    };
  }

  delete(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }
    this.users.splice(position, 1);
    return {
      msg: 'Usuario eliminado correctamente',
    };
  }

  update(id: string, changes: UpdateUserDto) {
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

  nicknameGenerator(name: string): string {
    return name.substring(0, 3) + '123';
  }
}
