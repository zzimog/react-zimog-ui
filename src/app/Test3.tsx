import { Disclosure } from '@ui';
import { DemoContainer } from './components/demo-container';
import { ChevronDown } from 'lucide-react';

const code = `// Headless component
import { Disclosure } from '@ui';

export default () => (
  <Disclosure>
    <Disclosure.Item>
      <Disclosure.Trigger />
      <Disclosure.Content />
    </Disclosure.Item>
  </Disclosure>
);`;

export default () => (
  <DemoContainer title="Disclosure" code={code} headless>
    <Disclosure
      as="div"
      className="w-80 h-50 text-sm text-white"
      defaultValue="0"
    >
      <Disclosure.Item value="0">
        <Disclosure.Trigger
          className={[
            'w-full',
            'flex',
            'justify-between',
            'items-center',
            'py-4',
            'font-semibold',
            'hover:underline',
            'data-[open=true]:[&_svg]:-rotate-180',
          ].join(' ')}
        >
          Toggle
          <ChevronDown className="size-4 transition-transform" />
        </Disclosure.Trigger>
        <Disclosure.Content
          className={[
            'overflow-hidden',
            'data-[visible=true]:animate-height-grow',
            'data-[visible=false]:animate-height-shrink',
          ].join(' ')}
        >
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </p>
        </Disclosure.Content>
      </Disclosure.Item>
    </Disclosure>
  </DemoContainer>
);
