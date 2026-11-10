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
import { Grid, GridItem } from "../components/ui/grid/index";
import { Group } from "../components/ui/group/index";
import { ScrollArea } from "../components/ui/scroll-area/index";
import { Separator } from "../components/ui/separator/index";
import { SimpleGrid } from "../components/ui/simple-grid/index";
import {
  SplitterRoot,
  SplitterPanel,
  SplitterHandle,
} from "../components/ui/splitter/index";
import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelPortal,
  FloatingPanelContent,
  FloatingPanelTitle,
  FloatingPanelClose,
} from "../components/ui/floating-panel/index";

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
      <FloatingPanelRoot>
        <FloatingPanelTrigger>Installed floating panel</FloatingPanelTrigger>
        <FloatingPanelPortal>
          <FloatingPanelContent>
            <FloatingPanelTitle>Installed panel title</FloatingPanelTitle>
            <FloatingPanelClose>Close installed panel</FloatingPanelClose>
          </FloatingPanelContent>
        </FloatingPanelPortal>
      </FloatingPanelRoot>
      <Grid
        templateColumns="repeat(2, minmax(0, 1fr))"
        gap={8}
        data-testid="installed-grid"
      >
        <GridItem>Grid first</GridItem>
        <GridItem>Grid second</GridItem>
      </Grid>
      <Group
        attached
        role="group"
        aria-label="Installed group"
        data-testid="installed-group"
      >
        <button type="button">First action</button>
        <button type="button">Second action</button>
      </Group>
      <ScrollArea aria-label="Installed scroll area" maxHeight={80}>
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} style={{ height: 32 }}>
            Row {index + 1}
          </div>
        ))}
      </ScrollArea>
      <Separator
        decorative={false}
        aria-label="Installed divider"
        data-testid="installed-separator"
      />
      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        gap={8}
        data-testid="installed-simple-grid"
      >
        <span>First card</span>
        <span>Second card</span>
      </SimpleGrid>
      <SplitterRoot
        panels={[
          { id: "left", minSize: 20 },
          { id: "right", minSize: 20 },
        ]}
        defaultSize={[40, 60]}
        style={{ width: 300, height: 80 }}
        data-testid="installed-splitter"
      >
        <SplitterPanel id="left">Installed left panel</SplitterPanel>
        <SplitterHandle
          between={["left", "right"]}
          aria-label="Resize installed panels"
        />
        <SplitterPanel id="right">Installed right panel</SplitterPanel>
      </SplitterRoot>
    </section>
  );
}
