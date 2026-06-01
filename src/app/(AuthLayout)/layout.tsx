import AppShellStartup from '@/components/Layout/AuthLayout/AppShell.Startup';

export default function RootLayout({ children }: { children: any }) {
  return <AppShellStartup>{children}</AppShellStartup>;
}
