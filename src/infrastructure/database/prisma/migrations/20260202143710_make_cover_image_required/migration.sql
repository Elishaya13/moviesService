/*
  Warnings:

  - Made the column `coverImage` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "coverImage" SET NOT NULL;
