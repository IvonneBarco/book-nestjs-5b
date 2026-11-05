import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(body: CreatePostDto) {
    try {
      const newPost = await this.postRepository.save({
        ...body,
        user: { id: body.userId },
      });
      
      return {
        message: 'Post creado exitosamente',
        data: newPost,
      };
    } catch {
      throw new BadRequestException('Error al crear el post');
    }
  }

  async findAll() {
    const post = await this.postRepository.find({
      relations: { user: { profile: true } },
    });
    return {
      data: post,
      count: post.length,
    };
  }

  async findById(id: number) {
    const post = await this.findOne(id);
    if (post === undefined) {
      throw new NotFoundException(`Post con ID ${id} no existe`);
    }
    return post;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!post) {
      throw new BadRequestException('Post no encontrado');
    }
    return post;
  }

  async update(id: number, change: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      const updatedPost = this.postRepository.merge(post, change);
      const savedPost = await this.postRepository.save(updatedPost);
      return {
        data: savedPost,
        message: 'Post actualizado exitosamente',
      };
    } catch {
      throw new BadRequestException('Error al actualizar el post');
    }
  }

  delete(id: number) {
    try {
      this.postRepository.delete(id);
      return {
        message: 'Post eliminado exitosamente',
      };
    } catch {
      throw new BadRequestException('Error al eliminar el post');
    }
  }
}
