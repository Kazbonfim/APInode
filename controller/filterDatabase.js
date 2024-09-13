const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.filterDatabase = async (req, res) => {

    console.log(req.params);

    const search = [];  // Filtro

    if (req.query) {

        search = await prisma.user.findMany({
            // Lógica do filtro
            where: {

                name: req.query.name,
                email: req.query.email,
                position: req.query.position,

            },

        })

    } else { // Se o filtro não achar nada, retornar tudo
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    position: true,
                }
            });

            console.log(users);
            res.status(200).json({ message: "Usuários listados com sucesso: ", users });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro no servidor, tente novamente ou verifique seu login!" });
        }
    }

};