# E-Commerce simplificado
## Tecnologias
Este programa deve compreender a ideia de simular uma API de ecommerce, utilizando nodejs(motor backend), typescript(superset javascript), prisma(ORM) e postgres(DBMS).

## Para usar
- Primeiramente, deve ser criado um arquivo .env com informações de conexão com banco de dados.
Eu utilizei o docker, então apenas usei o comando
```
$ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
``` 
Assim utilizando a latest version, o que não é aconselhável, porém, não houve realmente um critério marcante para definir esta versão em específico.

Confira a sua URL de conexão no .env, deve ficar semelhante a esta:
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/ecommerceproj?schema=public"
caso esteja usando docker, o localhost deverá ser substituído pelo IP do container.

## Design

- Users: Conforme o pedido, uma tabela de usuários, a qual tem algumas informações base(nome, email, senha...), porém, há uma role que pode ser cliente ou administrador, então para que fosse expansível foi feita uma tabela de roles, onde poderiamos registrar mais roles e mudar apenas o id de referência na tabela de usuários, assim evitando conflitos e facilitando a expansibilidade do projeto.
- Roles: Tabela de armazenamento de categoria, que caso fosse necessário poderia salvar as informações de permissão da "role"
- Products: A tabela de produtos armazena os produtos com seu nome, descrição, preço e quantidade em estoque, além da data de criação. Pode ser atribuído uma data de update futuramente como feature para controle de sistema, em uma situação onde hajam vários usuários trabalhando com organização do banco de produtos.
- Sells: As vendas são feitas para usuário, cada usuário com um total gasto, uma data feita a compra, possível disconto e, claro, produtos comprados. Só que produtos comprados não devem ocupar um campo, serem divididos por ponto e vírgula(;) ou algo assim, seguindo regras de normalização, fiz uma tabela intermediária entre a compra e os produtos, onde será armazenado cada produto e sua quantidade juntos.
- Product_sell: Esta é a tabela intermediária que ligará as compras com seus produtos, e então os armazenará de forma mais organica e organizada.

![ERD - Diagram](<readme_imgs/ERD Ecommerce simplificado.png>)