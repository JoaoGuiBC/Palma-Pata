## 📋 Configurando

Primeiramente crie um arquivo .env e preencha os valores com base no arquivo .env.example
>Se certifique do valor de JWT_SECRET ser o mesmo do frontend

&nbsp;

Após isso, dentro da pasta server rode os comandos:

`npm install`

`npx prisma migrate dev`

E finalmente rode a aplicação com o comando:

`npm run dev`
