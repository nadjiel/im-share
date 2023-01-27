/*
  Warnings:

  - You are about to drop the column `post_profile` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "post_profile",
ADD COLUMN     "picture" TEXT NOT NULL DEFAULT 'img/profile_default.jpg';
