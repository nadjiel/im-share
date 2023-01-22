-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "text" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
