/*
  Warnings:

  - You are about to drop the `Amizade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `responseId` to the `comentarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Amizade" DROP CONSTRAINT "Amizade_FriendId_fkey";

-- DropForeignKey
ALTER TABLE "Amizade" DROP CONSTRAINT "Amizade_userId_fkey";

-- AlterTable
ALTER TABLE "comentarios" ADD COLUMN     "responseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Amizade";

-- CreateTable
CREATE TABLE "amizades" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "FriendId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "amizades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curtidas" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fotoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curtidas_pkey" PRIMARY KEY ("id")
);

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
