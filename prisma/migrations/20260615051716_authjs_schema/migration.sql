/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Monitor` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `method` on the `Monitor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH');

-- CreateEnum
CREATE TYPE "MonitorStatus" AS ENUM ('UP', 'DOWN', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Monitor" ADD COLUMN     "status" "MonitorStatus" NOT NULL DEFAULT 'UNKNOWN',
DROP COLUMN "method",
ADD COLUMN     "method" "HttpMethod" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Monitor_url_key" ON "Monitor"("url");
