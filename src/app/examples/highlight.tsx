import { Card, cn, Highlight } from '@ui';
import { DemoContainer } from '../components/demo-container';

const classes = {
  highlight: [
    'rounded-shape',
    'bg-highlight',
    'data-[visible=true]:animate-in',
    'data-[visible=false]:animate-out',
    'data-[visible=false]:animation-delay-200',
    'h-(--height)',
    'w-(--width)',
    'translate-x-(--x)',
    'translate-y-(--y)',
    'transition-all',
    '[@media(hover:none)]:hidden',
  ],
  viewport: 'relative z-2 flex flex-col gap-2',
  item: [
    'p-2',
    'transition',
    'cursor-default',
    'not-active:delay-100',
    '[@media(hover:none)]:active:bg-highlight',
  ],
};

const code = `// Example code
import { Highlight } from '@ui';

export default () => (
  <Highlight>
    <Highlight.Indicator />
    <Highlight.Item />
  </Highlight>
);`;

export const HighlightDemo = () => (
  <DemoContainer title="Highlight" code={code} headless>
    <Card asChild>
      <Card.Content className="w-80">
        <Highlight type="hover" leaveMode="parent">
          <Highlight.Indicator className={cn(classes.highlight)} />
          <div className={cn(classes.viewport)}>
            <Highlight.Item className={cn(classes.item, 'mr-auto')}>
              Lorem
            </Highlight.Item>
            <Highlight.Item className={cn(classes.item, 'ml-auto')} selected>
              Ipsum
            </Highlight.Item>
            <Highlight.Item className={cn(classes.item, 'mx-auto')}>
              Dolor
            </Highlight.Item>
          </div>
        </Highlight>
      </Card.Content>
    </Card>
  </DemoContainer>
);
