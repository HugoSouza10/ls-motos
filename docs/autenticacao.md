# Autenticacao e login

Este documento descreve como o login esta implementado atualmente no projeto.

## Visao geral

O projeto usa NextAuth.js com o provedor `Credentials`. A pessoa informa e-mail e senha na pagina `/login`; o servidor procura o usuario no banco de dados, verifica se ele esta ativo e compara a senha informada com o hash salvo. Quando a validacao passa, o NextAuth cria uma sessao baseada em JWT.

## Fluxo de login

1. A pagina `app/login/page.tsx` coleta e-mail e senha.
2. No envio do formulario, chama `signIn("credentials", { email, password, redirect: true })`.
3. A requisicao e atendida pelo endpoint `app/api/auth/[...nextauth]/route.ts`, que configura os metodos GET e POST do NextAuth usando `authOptions`.
4. O provedor Credentials chama `authorize()`, definido em `app/_lib/auth.ts`.
5. `authorize()` rejeita credenciais ausentes, procura o usuario pelo e-mail usando Prisma e rejeita usuarios inexistentes ou inativos.
6. `bcryptjs.compare()` compara a senha informada com `Usuario.senhaHash`. A senha em texto nao e armazenada pelo fluxo de autenticacao.
7. Se a senha corresponder, `authorize()` retorna o ID, nome e e-mail do usuario. Caso contrario, retorna `null` e o login nao e autorizado.
8. O NextAuth mantem a sessao com estrategia JWT. O callback `jwt` coloca o ID do usuario no token e o callback `session` disponibiliza esse ID em `session.user.id`.

Como `pages.signIn` esta configurado como `/login`, essa e a pagina de entrada usada pelo NextAuth.

## Usuario e senha

O modelo `Usuario`, em `prisma/schema.prisma`, possui `id`, `nome`, `email`, `senhaHash` e `ativo`. O e-mail e unico e `ativo` assume `true` por padrao.

O seed em `prisma/seed.ts` cria ou atualiza o usuario administrador abaixo quando executado:

- E-mail: `admin@lsmotos.com`
- Senha inicial: `12345678`

Essas credenciais sao apenas para desenvolvimento local. Altere a senha ou remova esse usuario antes de usar um banco de dados em producao. A senha e convertida em hash com bcrypt antes de ser persistida.

## Autenticacao e protecao de paginas

Autenticar confirma a identidade e cria a sessao. Isso, por si so, nao bloqueia o acesso a paginas ou operacoes. Na implementacao consultada, a sessao e criada e exposta pelos callbacks do NextAuth, mas nao foi encontrada verificacao de sessao nas paginas ou nas operacoes da aplicacao. Portanto, nao se deve considerar as demais rotas protegidas sem uma verificacao explicita da sessao.

## Arquivos principais

- `app/login/page.tsx`: formulario e chamada de login no cliente.
- `app/_lib/auth.ts`: provedor, validacao das credenciais, JWT e callbacks da sessao.
- `app/api/auth/[...nextauth]/route.ts`: endpoint HTTP do NextAuth.
- `prisma/schema.prisma`: modelo de usuario.
- `prisma/seed.ts`: usuario administrador usado para desenvolvimento.