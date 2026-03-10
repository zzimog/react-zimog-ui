import { Home } from 'lucide-react';
import { cn } from '@ui';
import { Nav } from './components';

export type MenuEntry = {
  [key: string]: MenuEntry | Function;
};

function Items(props: { data: MenuEntry; context?: string }) {
  const { data = {}, context = '' } = props;
  const entries = Object.entries(data);
  return (
    <>
      {entries.map(([label, data]) => {
        const href = `${context}/${label}`.toLowerCase();
        const isFunc = typeof data === 'function';

        return (
          <Nav.Item key={href}>
            {isFunc ? (
              <Nav.Link title={label} href={href}>
                {label}
              </Nav.Link>
            ) : (
              <>
                <span className="text-foreground block py-1 font-mono text-xl uppercase transition">
                  {label}
                </span>

                <Nav.List>
                  <Items data={data} context={href} />
                </Nav.List>
              </>
            )}
          </Nav.Item>
        );
      })}
    </>
  );
}

export const AppMenu = ({ data = {} }: { data?: MenuEntry }) => (
  <Nav
    className={cn(
      'absolute',
      'right-full',
      'mr-4',
      'pr-4',
      'border-r',
      'text-right',
      'capitalize',
    )}
  >
    <Nav.List>
      <Nav.Item>
        <Nav.Link title="Home" href="/">
          <span className="sr-only">Home</span>
          <Home className="inline" />
        </Nav.Link>
      </Nav.Item>

      <Items data={data} />

      <Nav.Item>
        <Nav.Link href="/test" className="mt-4 font-mono lowercase">
          [test]
        </Nav.Link>
      </Nav.Item>
    </Nav.List>
  </Nav>
);
