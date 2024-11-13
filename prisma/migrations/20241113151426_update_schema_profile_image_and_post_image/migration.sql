/*
  Warnings:

  - You are about to drop the column `path` on the `PostImage` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `ProfileImage` table. All the data in the column will be lost.
  - Added the required column `public_id` to the `PostImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `ProfileImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostImage" DROP COLUMN "path",
ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfileImage" DROP COLUMN "path",
ADD COLUMN     "public_id" TEXT NOT NULL;
