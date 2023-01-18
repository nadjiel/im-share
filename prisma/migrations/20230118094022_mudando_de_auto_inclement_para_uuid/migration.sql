/*
  Warnings:

  - The primary key for the `amizades` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `comentarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `curtidas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `fotos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "amizades" DROP CONSTRAINT "amizades_FriendId_fkey";

-- DropForeignKey
ALTER TABLE "amizades" DROP CONSTRAINT "amizades_userId_fkey";

-- DropForeignKey
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_fotoId_fkey";

-- DropForeignKey
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_responseId_fkey";

-- DropForeignKey
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_userId_fkey";

-- DropForeignKey
ALTER TABLE "curtidas" DROP CONSTRAINT "curtidas_fotoId_fkey";

-- DropForeignKey
ALTER TABLE "curtidas" DROP CONSTRAINT "curtidas_userId_fkey";

-- DropForeignKey
ALTER TABLE "fotos" DROP CONSTRAINT "fotos_userId_fkey";

-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_userId_fkey";

-- AlterTable
ALTER TABLE "amizades" DROP CONSTRAINT "amizades_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "FriendId" SET DATA TYPE TEXT,
ADD CONSTRAINT "amizades_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "amizades_id_seq";

-- AlterTable
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fotoId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "responseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "comentarios_id_seq";

-- AlterTable
ALTER TABLE "curtidas" DROP CONSTRAINT "curtidas_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "fotoId" SET DATA TYPE TEXT,
ADD CONSTRAINT "curtidas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "curtidas_id_seq";

-- AlterTable
ALTER TABLE "fotos" DROP CONSTRAINT "fotos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "fotos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "fotos_id_seq";

-- AlterTable
ALTER TABLE "refresh_token" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_fotoId_fkey" FOREIGN KEY ("fotoId") REFERENCES "fotos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amizades" ADD CONSTRAINT "amizades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amizades" ADD CONSTRAINT "amizades_FriendId_fkey" FOREIGN KEY ("FriendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curtidas" ADD CONSTRAINT "curtidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curtidas" ADD CONSTRAINT "curtidas_fotoId_fkey" FOREIGN KEY ("fotoId") REFERENCES "fotos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
