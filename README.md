
## NodeAPI 🎯 Sobre o projeto 👨‍💻
***
Esta é uma API desenvolvida em **Node.js** utilizando **Express** como framework. A API usa **Prisma** para se comunicar com um banco de dados **MongoDB**. Ela aceita requisições dos tipos **POST** e **GET**.

### Funcionalidades Principais

- **Comunicação com MongoDB**: Utiliza Prisma para interagir com o banco de dados MongoDB.
- **Roteamento**: Configurado para aceitar requisições **GET** e **POST** em rotas definidas.
- **Middleware**: Inclui middleware para autenticação e processamento de requisições.
- **Visualização de Dados**: Integra-se com Prisma Studio para gerenciamento e visualização dos dados.

### Estrutura do Projeto

- **`app.js`**: Arquivo principal onde a aplicação é configurada e iniciada.
- **`routes`**: Diretório contendo as definições de rotas.
- **`middleware`**: Diretório para código de middleware.
- **`prisma`**: Contém arquivos de configuração e schema do Prisma.
- **`public`**: Pasta para arquivos estáticos.
***
## Guia de Instalação

### Requisitos

- **Node.js**: Certifique-se de que o Node.js está instalado. [Download Node.js](https://nodejs.org/)
- **MongoDB**: Instale o MongoDB e configure o servidor. [Documentação do MongoDB](https://docs.mongodb.com/manual/installation/)

### Passos para Instalação

1. **Clone o Repositório**

   Clone o repositório para o seu ambiente local:

   ```bash
   git clone https://github.com/Kazbonfim/APInode
   cd APInode
   ```

2. **Inclua as dependências**

   No diretório do projeto, execute o seguinte comando para instalar as dependências:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```bash
   echo 'DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/Database?retryWrites=true&w=majority&appName=AppName"
JWT_SECRET=chave_secreta_aqui' > .env
   ```

4. **Configure seu banco de dados MongoDB**

   Inicialize o Prisma e aplique as alterações no banco de dados com os comandos:

   ```bash
   npx prisma init
   npx prisma db push
   ```

   Isso vai atualizar o schema atual no banco de dados.

4.1 **Extras: acessando o Prisma Studio**

   Para acessar o Prisma Studio e gerenciar os dados diretamente:

   ```bash
   npx prisma studio
   ```

5. **Inicialize a aplicação no diretório raiz**

   Inicie a aplicação com o comando:

   ```bash
   npm start
   ```

   Isso iniciará a aplicação localmente usando **nodemon**, monitorando as mudanças no código e reiniciando automaticamente o servidor sempre que necessário. Lembre-se que é necessário gerar um Token, e aplicar o mesmo em um arquivo '.env' na raíz do projeto, além disso, neste mesmo arquivo você deve definir o link de conexão com o MongoDB.

**Dúvidas? Só entrar em contato através do seguinte e-mail: zcry.games@gmail.com, e ajudarei como for possível. Façam bom uso! 🥰👨‍💻**
