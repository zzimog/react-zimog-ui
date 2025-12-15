import { Card, Highlight } from '@ui';
import { Container } from './App';
import { DemoContainer } from './demo/DemoContainer';

export default () => (
  <Container>
    <DemoContainer title="Highlight" code="// Work in progress">
      <Card asChild>
        <Card.Content className="w-80">
          <Highlight>
            <Highlight.Indicator className="bg-highlight" />
            <div className="relative z-10 flex flex-col gap-2">
              <Highlight.Item className="p-2 border mr-auto">
                Lorem
              </Highlight.Item>
              <Highlight.Item className="p-2 border ml-auto" selected>
                Ipsum
              </Highlight.Item>
              <Highlight.Item className="p-2 border mx-auto">
                Dolor
              </Highlight.Item>
            </div>
          </Highlight>
        </Card.Content>
      </Card>
    </DemoContainer>
  </Container>
);
