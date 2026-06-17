import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "./_partials/AppSidebar";
import { AppHeader } from "./_partials/AppHeader";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex h-screen flex-col">
        <AppHeader />

        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}