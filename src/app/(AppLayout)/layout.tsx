import AppShellStartup from '@/components/Layout/AppLayout/AppShell.Startup';

export default function RootLayout({ children }: { children: any }) {
  return <AppShellStartup>{children}</AppShellStartup>;
}
