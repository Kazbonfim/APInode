const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.filterDatabase = async (req, res) => {
    try {
        
        console.log(req.query);

        let search = [];

        if (req.query) {
            search = await prisma.user.findMany({
                where: {
                    name: req.query.name || undefined,
                    email: req.query.email || undefined,
                    id: req.query.id || undefined,
                    position: req.query.position || undefined,
                }
            });

        } else {
            search = await prisma.user.findMany()
        };

        console.log('Resultado de sua busca', search);

        res.status(200).json({ message: "Usuários listados com sucesso", users: search });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente ou verifique seu login!" });
    }
};
