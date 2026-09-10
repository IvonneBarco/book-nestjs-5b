import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

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
            email: 'juanita@correo.com'
        },
        {
            id: '2',
            name: 'Carlos',
            email: 'carlos@correo.com'
        },
        {
            id: '3',
            name: 'Ana',
            email: 'ana.gomez@correo.com'
        },
        {
            id: '4',
            name: 'Mateo',
            email: 'mateo.perez@correo.com'
        },
        {
            id: '5',
            name: 'Sofía',
            email: 'sofia.ruiz@correo.com'
        },
        {
            id: '6',
            name: 'David',
            email: 'david.lopez@correo.com'
        },
        {
            id: '7',
            name: 'Lucía',
            email: 'lucia.torres@correo.com'
        },
        {
            id: '8',
            name: 'Andrés',
            email: 'andres.castro@correo.com'
        },
        {
            id: '9',
            name: 'Valentina',
            email: 'valentina.morales@correo.com'
        },
        {
            id: '10',
            name: 'Alejandro',
            email: 'alejandro.ortiz@correo.com'
        }
    ];

    @Get('')
    getAllUsers() {
        return this.users;
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        console.log('.:: User ID: ', id)
        const user = this.users.find((user) => user.id === id);
        console.log('.:: usuario buscado: ', user)
        if (user === undefined) {
            return {
                result: "Usuario no existe"
            }
        }
        return user;
    }

    @Get('search/:name')
    getUserUserByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name === name);
        if (!data) return { result: "El correo del nombre ingresado no existe" }
        return { result: data?.email };
    }

    @Post()
    createUser(@Body() user: User) {
        console.log('.:: user: ', user)
        this.users.push(user);
        return {
            msg: "Usuario creado correctamente",
            data: user
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const position = this.users.findIndex((user) => user.id === id);
        this.users.splice(position, 1);
        return {
            msg: "Usuario eliminado correctamente"
        }
    }
}
