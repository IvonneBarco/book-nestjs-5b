import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    // logica de negocio
    const users = await this.userRepository.find();
    return {
      data: users,
      count: users.length,
    };
  }

  async findById(id: number) {
    const user = await this.findOne(id);
    if (user === undefined) {
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }

    if (user.id === 1) {
      throw new ForbiddenException(
        `No tienes permisos para acceder al usuario con ID ${id}`,
      );
    }
    return user;
  }

  // search(name: string): any | undefined {
  //   const data = this.users.find((user) => user.name === name);
  //   if (!data) {
  //     throw new NotFoundException(`Usuario con nombre ${name} no existe`);
  //   }
  //   return { result: data.email };
  // }

  async create(userPayload: CreateUserDto) {
    try {
      const newUser = this.userRepository.save(userPayload);
      return newUser;
    } catch {
      throw new BadRequestException('Error al crear el usuario');
    }
  }
  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }
    const result = await this.userRepository.delete(user.id);
    return {
      message: 'Usuario eliminado correctamente',
      data: result,
    };
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no existe`);
      }
      const updatedUser = this.userRepository.merge(user, changes);
      const savedUser = await this.userRepository.save(updatedUser);
      return savedUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al actualizar el usuario');
    }
  }

  nicknameGenerator(name: string): string {
    return name.substring(0, 3) + '123';
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {id},
      relations: {profile: true}
    })
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async getPostByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { posts: true },
    });

    if(!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    return user.posts;
  }
}
