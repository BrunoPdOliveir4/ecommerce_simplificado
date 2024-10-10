
# E-Commerce Simplificado

Este projeto simula uma API de e-commerce utilizando as seguintes tecnologias:

- **Node.js**: Motor backend
- **TypeScript**: Superset do JavaScript
- **Prisma**: ORM (Object Relational Mapping)
- **PostgreSQL**: Sistema de gerenciamento de banco de dados (DBMS)

## Como Usar

### Configuração do Ambiente

1. **Criação do arquivo `.env`**: Crie um arquivo chamado `.env` na raiz do seu projeto e insira as informações de conexão com o banco de dados.

   Para usar o Docker, execute o seguinte comando para iniciar um container do PostgreSQL:

   ```bash
   $ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
   ```

   **Exemplo de URL de Conexão**:
   ```plaintext
   DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/ecommerceproj?schema=public"
   ```
   > Se estiver usando Docker, substitua `localhost` pelo IP do container.

2. **Inserção de Roles**: Para utilizar as tabelas de roles, você precisará inserir um cliente e um administrador manualmente. Sugestão de SQL:

   ```sql
   INSERT INTO tb_roles VALUES
   ('9500a3ed-dbab-42b3-99ec-754afca513d5', 'client'), 
   ('8ae5479e-49ab-4fd4-847e-a81e1fbf6d45', 'administrator');
   ```

3. **Instalação de Dependências**: Clone o repositório e instale as dependências necessárias com o comando:

   ```bash
   npm install
   ```

4. **Variáveis de Ambiente Necessárias**: No arquivo `.env`, adicione as seguintes constantes:
   - `PORT`: A porta em que a aplicação irá rodar.
   - `JWT_SECRET`: O segredo para a geração de tokens JWT.
   - `DATABASE_URL`: A URL de conexão com o banco de dados.

## Design do Banco de Dados

### Estruturas das Tabelas

- **Users**: Tabela que armazena informações básicas do usuário, incluindo `nome`, `email`, `senha` e `role` (cliente ou administrador). A tabela de roles permite a expansão sem conflitos, facilitando a gestão de permissões.
  
- **Roles**: Tabela que armazena as categorias de usuários. Poderá ser ampliada para incluir informações sobre permissões específicas.

- **Products**: Armazena os produtos com `nome`, `descrição`, `preço`, `quantidade em estoque` e `data de criação`. Futuras atualizações podem incluir um campo de `data de atualização`.

- **Sells**: Registra as vendas feitas por usuários, incluindo total gasto, data da compra, possíveis descontos e os produtos comprados. Os produtos não ocupam um único campo; em vez disso, uma tabela intermediária (Product_sell) é utilizada para armazenar a relação entre compras e produtos.

- **Product_sell**: Tabela intermediária que conecta compras e produtos, permitindo uma organização mais eficiente dos dados.

![ERD - Diagrama](<readme_imgs/ERD Ecommerce simplificado.png>)

## Rotas da API

### /api/auth

1. **POST - /signup**: Acesso geral. Recebe um objeto conforme o exemplo abaixo. Se um campo `secret` for incluído com qualquer valor, o usuário será criado como administrador.
   ![ex json](readme_imgs/post-auth.png)

2. **POST - /login**: Acesso geral. Recebe um objeto com `email` e `password`.

3. **GET - /user**: Valida se o token do usuário está funcionando.

4. **GET - /admin**: Valida se o token do administrador está funcionando.

### /api/products

1. **GET - /**: Acesso para usuários visualizarem todos os produtos.

2. **POST - /**: Acesso para administradores registrarem novos produtos.
   ![ex json](readme_imgs/post-products.png)

3. **PUT - /:id**: Acesso para administradores atualizarem produtos.

4. **DELETE - /:id**: Acesso para administradores deletarem produtos.

### /api/sell

1. **POST - /**: Acesso para usuários realizarem compras de produtos.
   ![ex json](readme_imgs/post-sell.png)

2. **GET - /**: Acesso para usuários visualizarem suas compras realizadas.

3. **GET - /All**: Acesso para administradores visualizarem todas as compras realizadas.

## Contribuições

Sinta-se à vontade para contribuir com melhorias ou sugestões. Se encontrar algum problema ou bug, por favor, abra uma issue no repositório.

---
