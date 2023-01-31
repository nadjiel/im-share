/*
  Warnings:

  - You are about to drop the column `responseId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_responseId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "responseId";
