"use client";

import { Button } from "../components/ui/button/index";
import { Input } from "../components/ui/input/index";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog/index";
import { AbsoluteCenter } from "../components/ui/absolute-center/index";
import { AspectRatio } from "../components/ui/aspect-ratio/index";
import { Bleed } from "../components/ui/bleed/index";
import { Box } from "../components/ui/box/index";
import { Center, Circle, Square } from "../components/ui/center/index";
import { Container } from "../components/ui/container/index";
import { Flex, Spacer } from "../components/ui/flex/index";
import { Float } from "../components/ui/float/index";

export function ComponentsDemo() {
  return (
    <section aria-label="Installed components">
      <Button>Installed button</Button>
      <label>
        Installed input
        <Input defaultValue="Ready" />
      </label>
      <DialogRoot>
        <DialogTrigger>Installed dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Installed dialog title</DialogTitle>
          <DialogDescription>Rendered after hydration.</DialogDescription>
          <DialogClose>Close dialog</DialogClose>
        </DialogContent>
      </DialogRoot>
      <div
        style={{ position: "relative", width: 200, height: 100 }}
        data-testid="absolute-parent"
      >
        <AbsoluteCenter>Installed center</AbsoluteCenter>
      </div>
      <AspectRatio
        ratio={4 / 3}
        style={{ width: 120 }}
        data-testid="aspect-frame"
      >
        <div>Installed ratio</div>
      </AspectRatio>
      <div style={{ width: 200, padding: 16 }} data-testid="bleed-parent">
        <Bleed data-testid="bleed-content">Installed bleed</Bleed>
      </div>
      <Box padding={{ base: 8, md: 24 }} data-testid="installed-box">
        Installed box
      </Box>
      <Center style={{ width: 160, height: 80 }} data-testid="installed-center">
        <span>Centered</span>
      </Center>
      <Square size={48} data-testid="installed-square">
        1
      </Square>
      <Circle size={48} data-testid="installed-circle">
        2
      </Circle>
      <Container maxWidth={400} data-testid="installed-container">
        Installed container
      </Container>
      <Flex
        direction={{ base: "column", md: "row" }}
        data-testid="installed-flex"
      >
        <span>Flex start</span>
        <Spacer data-testid="installed-spacer" />
        <span>Flex end</span>
      </Flex>
      <div
        style={{ position: "relative", width: 200, height: 100 }}
        data-testid="float-parent"
      >
        <Float as="span" placement="bottom-start" data-testid="installed-float">
          Installed float
        </Float>
      </div>
    </section>
  );
}
