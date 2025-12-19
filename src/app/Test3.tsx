import { Accordion, Collapsible } from '@ui';
import { DemoContainer } from './components/demo-container';

const code = `// Headless component
import { Disclosure } from '@ui';

export default () => (
  <Accordion multiple>
    <Accordion.Item value title />
  </Accordion>
);`;

export default () => (
  <DemoContainer title="Accordion" code={code}>
    <div className="flex flex-col gap-8">
      <Accordion className="w-80 text-white">
        <Accordion.Item value="1" title="Lorem ipsum" className="border-white">
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </p>
        </Accordion.Item>
        <Accordion.Item value="2" title="Dolor sit" className="border-white">
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </p>
        </Accordion.Item>
        <Accordion.Item value="3" title="Consectetur" className="border-white">
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </p>
        </Accordion.Item>
      </Accordion>

      <Collapsible title="Lorem collapsum" className="w-80">
        <p className="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
          molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
          repudiandae optio praesentium id provident dolore quis ipsa? Quidem
          minus saepe odit consequatur!
        </p>
      </Collapsible>
    </div>
  </DemoContainer>
);
