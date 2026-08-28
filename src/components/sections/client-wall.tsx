import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { LogoWall } from "@/components/composites/logo-wall";
import { clients } from "@/content/home";

const half = Math.ceil(clients.length / 2);

export function ClientWall() {
  return (
    <section className="border-t border-border/60 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-center font-mono text-eyebrow uppercase text-faint">
            Backed by hundreds of growing businesses worldwide
          </p>
        </Reveal>
      </Container>
      <Reveal delay={0.1} className="mt-10 flex flex-col gap-6">
        <LogoWall logos={clients.slice(0, half)} />
        <LogoWall logos={clients.slice(half)} reverse />
      </Reveal>
    </section>
  );
}
