/*
  Warnings:

  - You are about to drop the `amizades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comentarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `curtidas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fotos` table. If the table is not empty, all the data it contains will be lost.

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

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "photo_profile" SET DEFAULT 'img/profile_default.jpg';

-- DropTable
DROP TABLE "amizades";

-- DropTable
DROP TABLE "comentarios";

-- DropTable
DROP TABLE "curtidas";

-- DropTable
DROP TABLE "fotos";

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
