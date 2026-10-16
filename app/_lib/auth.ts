import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { db } from "@/app/_lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    // Configuração do provedor de autenticação usando credenciais (email e senha)
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "E-mail",
          type: "email",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("faltou email ou senha");
          return null;
        }

        const usuario = await db.usuario.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("usuario:", usuario);
        if (!usuario || !usuario.ativo) {
            console.log("usuario inexistente ou inativo");
          return null;
        }

        const senhaCorreta = await compare(
          credentials.password,
          usuario.senhaHash,
        );
         console.log("senhaCorreta:", senhaCorreta);

        if (!senhaCorreta) {
          return null;
        }
        console.log("login autorizado");
        return {
          id: usuario.id,
          name: usuario.nome,
          email: usuario.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

/* Lógica do arquivo

usuário informa email/senha
        ↓
CredentialsProvider
        ↓
authorize()
        ↓
procura Usuario no Prisma
        ↓
verifica se está ativo
        ↓
bcrypt compara senha digitada com senhaHash
        ↓
se estiver correto, retorna o usuário
        ↓
NextAuth cria a sessão JWT

*/
