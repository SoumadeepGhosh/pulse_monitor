import { NotificationType } from "../../generated/prisma/client";

export interface NotificationItem {
  id: number;
  message: string;
  type: NotificationType;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
  redirectPath: string | null;
}

export interface NotificationPaginationResponse {
  items: NotificationItem[];
  nextCursor: number | null;
  hasMore: boolean;
}
export interface NotificationSocketPayload {
  notificationId: string;
  userId: string;
  message: string;
  type: NotificationType;
  redirectPath?: string | null;
} 
export interface MonitorUpdatedPayload {
  monitorId: string;
}
