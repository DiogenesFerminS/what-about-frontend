"use client"

import { ThemeProvider } from "@/components/common/theme-provider"
import { ModalProvider } from "./modal/modal-context-provider"
import { AuthProvider } from "./auth/auth-context-provider"

interface Props {
  children: React.ReactNode
};

const Providers = ({children}: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      forcedTheme="dark"
      disableTransitionOnChange
    >
      <AuthProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default Providers