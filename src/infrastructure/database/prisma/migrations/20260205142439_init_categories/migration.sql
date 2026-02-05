/*
  Warnings:

  - Changed the type of `category` on the `Movie` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'COMEDY', 'CRIME', 'DOCUMENTARY', 'DRAMA', 'FANTASY', 'HORROR', 'ROMANCE', 'SCI_FI', 'THRILLER');

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
