/*
  Warnings:

  - You are about to drop the column `rotten_tomatoes` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `user_rating` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `worldwide_gross` on the `Movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "rotten_tomatoes",
DROP COLUMN "user_rating",
DROP COLUMN "worldwide_gross",
ADD COLUMN     "rottenTomatoes" INTEGER,
ADD COLUMN     "userRating" INTEGER,
ADD COLUMN     "worldwideGross" DOUBLE PRECISION;
