-- CreateEnum
CREATE TYPE "CriteriaType" AS ENUM ('STATUS_CODE', 'RESPONSE_TIME', 'RESPONSE_BODY');

-- CreateEnum
CREATE TYPE "Operator" AS ENUM ('EQUALS', 'NOT_EQUALS', 'GREATER_THAN', 'GREATER_THAN_EQUAL', 'LESS_THAN', 'LESS_THAN_EQUAL', 'CONTAINS');

-- AlterTable
ALTER TABLE "CheckResult" ADD COLUMN     "status" "MonitorStatus" NOT NULL DEFAULT 'UNKNOWN';

-- CreateTable
CREATE TABLE "SuccessCriteria" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CriteriaType" NOT NULL,
    "jsonPath" TEXT,
    "operator" "Operator" NOT NULL,
    "expectedValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuccessCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitorSuccessCriteria" (
    "monitorId" INTEGER NOT NULL,
    "successCriteriaId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonitorSuccessCriteria_pkey" PRIMARY KEY ("monitorId","successCriteriaId")
);

-- CreateTable
CREATE TABLE "EmailRecipient" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "consecutiveThreshold" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitorEmailRecipient" (
    "monitorId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "previousStatus" "MonitorStatus" NOT NULL DEFAULT 'UNKNOWN',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonitorEmailRecipient_pkey" PRIMARY KEY ("monitorId","recipientId")
);

-- CreateIndex
CREATE INDEX "EmailRecipient_userId_idx" ON "EmailRecipient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailRecipient_userId_email_key" ON "EmailRecipient"("userId", "email");

-- CreateIndex
CREATE INDEX "MonitorEmailRecipient_monitorId_idx" ON "MonitorEmailRecipient"("monitorId");

-- CreateIndex
CREATE INDEX "MonitorEmailRecipient_recipientId_idx" ON "MonitorEmailRecipient"("recipientId");

-- AddForeignKey
ALTER TABLE "SuccessCriteria" ADD CONSTRAINT "SuccessCriteria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorSuccessCriteria" ADD CONSTRAINT "MonitorSuccessCriteria_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorSuccessCriteria" ADD CONSTRAINT "MonitorSuccessCriteria_successCriteriaId_fkey" FOREIGN KEY ("successCriteriaId") REFERENCES "SuccessCriteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailRecipient" ADD CONSTRAINT "EmailRecipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorEmailRecipient" ADD CONSTRAINT "MonitorEmailRecipient_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorEmailRecipient" ADD CONSTRAINT "MonitorEmailRecipient_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "EmailRecipient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
