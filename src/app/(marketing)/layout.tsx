import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { FloatingAssistant } from "@/components/sections/floating-assistant";
import { MotionProvider } from "@/components/providers/motion-provider";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <FloatingAssistant />
    </MotionProvider>
  );
}
