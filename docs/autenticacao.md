# Autenticação e login

Este documento descreve o fluxo de autenticação atualmente implementado no projeto LS Motos, as decisões arquiteturais adotadas e a responsabilidade de cada arquivo envolvido.

## Visão geral da autenticação

O projeto usa o **NextAuth v4** com `CredentialsProvider` para autenticar usuários por e-mail e senha. Os usuários são armazenados no banco de dados por meio do Prisma, e a senha é persistida somente como um hash gerado com `bcryptjs`.

Quando as credenciais são válidas, o NextAuth cria uma sessão com estratégia `jwt`. O identificador do usuário é incluído no token e depois disponibilizado em `session.user.id`.

A configuração central está em `app/_lib/auth.ts`. O endpoint do NextAuth é exposto por `app/api/auth/[...nextauth]/route.ts`, que reutiliza essa configuração nos métodos `GET` e `POST`.

## Fluxo completo do login

1. O usuário acessa `/login`. A página correspondente é `app/login/page.tsx`, um Client Component que mantém o e-mail, a senha e o estado de carregamento com `useState`.
2. Ao enviar o formulário, `handleSubmit` impede o comportamento padrão e chama `signIn("credentials", { email, password, redirect: false })`.
3. O NextAuth recebe as credenciais pelo endpoint `app/api/auth/[...nextauth]/route.ts` e as encaminha ao método `authorize(credentials)` do `CredentialsProvider`.
4. `authorize` verifica se o e-mail e a senha foram informados. Se algum deles estiver ausente, retorna `null`.
5. O usuário é procurado pelo e-mail com `db.usuario.findUnique`, usando o cliente Prisma.
6. Se o usuário não existir ou estiver com `ativo` igual a `false`, `authorize` retorna `null`.
7. A chamada `compare(credentials.password, usuario.senhaHash)` compara a senha digitada com o hash armazenado em `senhaHash`.
8. O bcrypt não descriptografa o hash. Ele aplica o algoritmo à senha informada considerando os parâmetros presentes no próprio hash e verifica se o resultado corresponde.
9. Se a senha estiver incorreta, `authorize` retorna `null`. Se estiver correta, retorna os dados básicos do usuário: `id`, `name` e `email`.
10. O NextAuth usa esses dados para criar o JWT e representar a sessão autenticada.
11. O callback `jwt` copia `user.id` para `token.id` no momento em que o usuário é recebido.
12. O callback `session` copia `token.id` para `session.user.id`, tornando o identificador acessível por meio da sessão.
13. Como o login usa `redirect: false`, a página recebe o resultado da tentativa. Quando `result?.ok` é verdadeiro, `router.push("/")` redireciona o usuário para o dashboard.

A opção `pages.signIn` também aponta para `/login`, definindo essa rota como a página de entrada personalizada do NextAuth.

## Usuário e senha

O model `Usuario`, definido em `prisma/schema.prisma`, contém os campos `id`, `nome`, `email`, `senhaHash`, `ativo`, `createdAt` e `updatedAt`. O e-mail é único, e `ativo` tem valor padrão `true`.

Em `prisma/seed.ts`, a senha inicial `12345678` é transformada em hash pela chamada `hash("12345678", 10)`. Em seguida, um `upsert` procura o e-mail `admin@lsmotos.com`: se o registro não existir, cria o usuário `Administrador` com o hash calculado; se já existir, o objeto `update` vazio não altera seus dados.

Assim, a senha em texto é usada como entrada apenas durante a geração do hash no seed. O campo persistido pelo Prisma é `senhaHash`.

## Proteção das rotas

As páginas internas estão agrupadas em `app/(dashboard)`. Esse diretório é um **route group** do App Router: os parênteses organizam páginas que devem compartilhar o mesmo layout, mas o nome `(dashboard)` não faz parte das URLs. Por exemplo, `app/(dashboard)/page.tsx` continua correspondendo a `/`.

O arquivo `app/(dashboard)/layout.tsx` centraliza a proteção desse grupo. Por ser um Server Component assíncrono, ele chama `getServerSession(authOptions)` no servidor antes de renderizar o conteúdo:

- se não houver sessão, executa `redirect("/login")`;
- se houver sessão, renderiza a `Sidebar` e o `children` da página solicitada.

Essa organização evita repetir a consulta da sessão e o redirecionamento em cada página interna que pertence ao grupo.

## Separação entre login e área autenticada

A rota `/login` está fora de `app/(dashboard)`. Por isso, ela não herda o layout autenticado, não depende de uma sessão existente e não exibe a sidebar.

O formulário de login possui seu próprio layout visual em `app/login/page.tsx`, usando `min-h-screen` para ocupar toda a altura da tela e centralizar o conteúdo. O layout global em `app/layout.tsx` continua envolvendo toda a aplicação, enquanto `app/(dashboard)/layout.tsx` acrescenta a estrutura e a proteção específicas da área autenticada.

## Logout

O componente `app/login/_components/logout-button.tsx` declara `"use client"` porque usa o evento interativo `onClick`. Ao clicar no botão, ele chama:

```ts
signOut({
  callbackUrl: "/login",
});
```

O `signOut` encerra a sessão gerenciada pelo NextAuth, e `callbackUrl` direciona o usuário para `/login` depois da saída.

O botão pode ser renderizado dentro de um Server Component, como ocorre em `app/(dashboard)/page.tsx`. Server Components podem compor Client Components; o limite de cliente fica restrito ao componente que precisa de interatividade, enquanto o restante da página continua sendo renderizado no servidor.

## Loading do login

A página de login controla a tentativa de autenticação com o estado `isLoading`:

- antes de chamar `signIn`, define `isLoading` como `true`;
- enquanto a chamada está em andamento, desabilita o botão por meio de `disabled={isLoading}`;
- substitui o texto `Login` pelo componente `Spinner`.

Desabilitar o botão evita múltiplos envios do formulário durante a mesma tentativa e o spinner informa visualmente que o login está sendo processado.

A chamada a `signIn` fica dentro de um bloco `try/finally`. O `finally` restaura `isLoading` para `false` independentemente de a operação terminar normalmente ou lançar um erro, garantindo que o botão não permaneça bloqueado.

## Decisões tomadas

### NextAuth v4

O projeto usa `next-auth` v4 e segue suas APIs: `NextAuthOptions`, `NextAuth(authOptions)`, `getServerSession`, `signIn` e `signOut`. A configuração é compatível com a estrutura atual do App Router e fica centralizada em `authOptions`, sem adotar as APIs e a organização do NextAuth v5.

### Credentials em vez de Google OAuth

A autenticação foi implementada com `CredentialsProvider`, de acordo com o fluxo atual de e-mail e senha mantido pelo próprio sistema. Não há provedor Google OAuth configurado. A validação permanece sob controle da aplicação, que consulta o model `Usuario` e verifica a senha armazenada como hash.

### JWT em vez de adapter de sessão no banco

`session.strategy` está definido como `"jwt"`, e nenhum adapter de sessão em banco está configurado. O NextAuth mantém a identidade autenticada no token e a expõe na sessão por meio dos callbacks `jwt` e `session`.

### Senha armazenada somente como hash

O model `Usuario` possui `senhaHash`, não um campo de senha em texto. O seed usa `hash` para gerar o valor persistido, e o login usa `compare` para validar a senha informada sem recuperar ou descriptografar a senha original.

### Separação dos layouts e da tela de login

O layout global, em `app/layout.tsx`, fornece a estrutura compartilhada por toda a aplicação. O layout de `app/(dashboard)` acrescenta a proteção e a sidebar às páginas internas. A página `/login` permanece fora desse grupo e usa a tela inteira, sem herdar a interface do dashboard.

### Proteção centralizada no grupo `(dashboard)`

A consulta da sessão e o redirecionamento estão concentrados em `app/(dashboard)/layout.tsx`. Todas as páginas renderizadas por esse layout recebem a mesma proteção, reduzindo duplicação e mantendo o comportamento de acesso em um único ponto.

### Client Components apenas onde há interatividade

A página de login é um Client Component porque usa estado, eventos, `signIn` e navegação pelo cliente. O botão de logout também é um Client Component porque depende de `onClick` e `signOut`. O layout autenticado permanece como Server Component e consulta a sessão diretamente no servidor.

## Arquivos envolvidos

| Arquivo | Responsabilidade |
| --- | --- |
| `app/_lib/auth.ts` | Define `authOptions`, configura o `CredentialsProvider`, implementa `authorize`, seleciona a estratégia JWT e expõe o ID pelos callbacks. |
| `app/api/auth/[...nextauth]/route.ts` | Cria o handler do NextAuth e o exporta para requisições `GET` e `POST`. |
| `app/login/page.tsx` | Renderiza o formulário, controla seus estados, chama `signIn` e redireciona para `/` após o sucesso. |
| `app/(dashboard)/layout.tsx` | Consulta a sessão no servidor, redireciona visitantes não autenticados e compõe sidebar e conteúdo autenticado. |
| `app/login/_components/logout-button.tsx` | Executa `signOut` no cliente e direciona o usuário para `/login`. |
| `app/(dashboard)/page.tsx` | Renderiza o botão de logout na página inicial autenticada e consulta a sessão para exibir o nome do usuário. |
| `app/layout.tsx` | Fornece o layout global compartilhado pela tela de login e pela área autenticada. |
| `prisma/schema.prisma` | Define o model `Usuario`, incluindo e-mail único, hash da senha e indicador de usuário ativo. |
| `prisma/seed.ts` | Gera o hash da senha inicial e cria o usuário administrador quando ele ainda não existe. |

## Fluxo resumido

`Login → signIn → authorize → Prisma → bcrypt.compare → JWT → session → redirect → dashboard`
