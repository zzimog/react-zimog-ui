import { useCallback, useEffect, useState } from 'react';
import { Hamburger, Home, X } from 'lucide-react';
import { Button, cn, Presence } from '@ui';
import { Nav } from './components';

export type MenuEntry = {
  [key: string]: MenuEntry | Function;
};

export const AppMenu = (props: { data?: MenuEntry }) => {
  const { data = {} } = props;
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    /**
     * @todo Temp fix, wait "page load"
     */
    setTimeout(() => {
      setOpen(false);
    }, 100);
  }, []);

  const getItems = useCallback(
    (data: MenuEntry = {}, context = '') =>
      Object.entries(data).map(([label, data]) => {
        const href = `${context}/${label}`.toLowerCase();
        const isFunc = typeof data === 'function';

        return (
          <Nav.Item key={href}>
            {isFunc ? (
              <Nav.Link title={label} href={href} onClick={handleClose}>
                {label}
              </Nav.Link>
            ) : (
              <>
                <span className="text-foreground block py-1 font-mono text-xl uppercase transition">
                  {label}
                </span>

                <Nav.List>{getItems(data, href)}</Nav.List>
              </>
            )}
          </Nav.Item>
        );
      }),
    [data]
  );

  useEffect(() => {
    const overflow: any = open ? 'hidden' : null;
    document.body.style.overflow = overflow;
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        <Hamburger className="size-4" />
      </Button>

      <Presence
        data-open={open}
        present={open}
        className={cn(
          'fixed',
          'inset-0',
          'flex',
          'flex-col',
          'justify-start',
          'items-center',
          'gap-16',
          'p-8',
          'bg-background',
          'overflow-auto',
          'z-999',
          'data-[open=false]:animate-out',
          'not-md:**:text-2xl/11'
        )}
      >
        <Button onClick={handleClose}>
          <X />
        </Button>

        <Nav className="mx-auto text-center">
          <Nav.List className="capitalize">
            <Nav.Item className="mb-4">
              <Nav.Link title="Home" href="/">
                <span className="sr-only">Home</span>
                <Home className="inline not-md:size-11" />
              </Nav.Link>
            </Nav.Item>

            {getItems(data)}

            <Nav.Item>
              <Nav.Link
                href="/test"
                className="mt-4 font-mono lowercase"
                onClick={handleClose}
              >
                [test]
              </Nav.Link>
            </Nav.Item>
          </Nav.List>
        </Nav>
      </Presence>
    </>
  );
};
