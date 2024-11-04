/*
  Warnings:

  - Added the required column `file_url` to the `ProductFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductFiles" ADD COLUMN     "file_url" TEXT NOT NULL;
