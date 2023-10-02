/*
  Warnings:

  - Added the required column `city` to the `org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `org` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BrazilState" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- AlterTable
ALTER TABLE "org" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" "BrazilState" NOT NULL;
