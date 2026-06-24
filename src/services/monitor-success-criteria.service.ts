import { prisma } from "@/lib/prisma";
import { AppResponseWrapper, createErrorResponse, createSuccessResponse } from "@/types/common.type";
import { SuccessCriteria } from "../../generated/prisma/client";
import { Prisma } from "../../generated/prisma/client";

export async function assignCriteriaToMonitor(
  tx: Prisma.TransactionClient,
  userId: number,
  monitorId: number,
  successCriteriaIds: number[],
): Promise<void> {

  const monitor =
    await tx.monitor.findFirst({
      where: {
        id: monitorId,
        userId,
      },
    });

  if (!monitor) {
    throw new Error(
      "Monitor not found",
    );
  }

  const criteria =
    await tx.successCriteria.findMany({
      where: {
        id: {
          in: successCriteriaIds,
        },
        userId,
      },
    });

  if (
    criteria.length !==
    successCriteriaIds.length
  ) {
    throw new Error(
      "One or more criteria not found",
    );
  }

  const existingAssignments =
    await tx.monitorSuccessCriteria.findMany({
      where: {
        monitorId,
      },
    });

  const existingIds =
    existingAssignments.map(
      (item) =>
        item.successCriteriaId,
    );

  const toDelete =
    existingIds.filter(
      (id) =>
        !successCriteriaIds.includes(
          id,
        ),
    );

  const toInsert =
    successCriteriaIds.filter(
      (id) =>
        !existingIds.includes(id),
    );

  await tx.monitorSuccessCriteria.deleteMany(
    {
      where: {
        monitorId,
        successCriteriaId: {
          in: toDelete,
        },
      },
    },
  );

  await tx.monitorSuccessCriteria.createMany(
    {
      data: toInsert.map(
        (criteriaId) => ({
          monitorId,
          successCriteriaId:
            criteriaId,
        }),
      ),
      skipDuplicates: true,
    },
  );
}