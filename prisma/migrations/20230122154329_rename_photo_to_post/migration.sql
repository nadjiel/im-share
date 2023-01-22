/*
  Warnings:

  - You are about to drop the column `photoId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `photoId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `photo_profile` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `photos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_photoId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_photoId_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_userId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "photoId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "photoId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "photo_profile",
ADD COLUMN     "post_profile" TEXT NOT NULL DEFAULT 'img/profile_default.jpg';

-- DropTable
DROP TABLE "photos";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
