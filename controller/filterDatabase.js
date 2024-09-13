const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.filterDatabase = async (req, res) => {

    try {
        let search = [];
        
        if (req.query && (req.query.name || req.query.email || req.query.position)) {
            // Aplica o filtro apenas se houver algum dos parâmetros
            search = await prisma.user.findMany({
                where: {
                    name: req.query.name ? req.query.name : undefined,
                    email: req.query.email ? req.query.email : undefined,
                    position: req.query.position ? req.query.position : undefined,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    position: true,
                }
            });
        } else {
            // Se não houver filtros, retorna todos os usuários
            search = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    position: true,
                }
            });
        }

        console.log(req.query);  // Verificando o que está sendo passado via query string

        res.status(200).json({ message: "Usuários listados com sucesso", users: search });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente ou verifique seu login!" });
    }
};
