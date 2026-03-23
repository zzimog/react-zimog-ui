import { useEffect, useState } from 'react';
import { Hamburger, Home, X } from 'lucide-react';
import type { MDXContent } from 'mdx/types';
import { Button, cn, Presence } from '@ui';
import { Nav } from './components';

type AppMenuProps = {
  data: Record<string, MDXContent>;
};

export const AppMenu = (props: AppMenuProps) => {
  const { data } = props;

  const [open, setOpen] = useState(false);
  const entries = Object.keys(data).sort();

  function close() {
    setTimeout(() => {
      setOpen?.(false);
    }, 100);
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [open]);

  return (
    <>
      <Button size="lg" onClick={() => setOpen(!open)}>
        <span className="sr-only">Main menu</span>
        <Hamburger className="size-4" />
      </Button>

      <Presence
        present={open}
        data-open={open}
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
        <Button size="lg" className="shrink-0" onClick={close}>
          <span className="sr-only">Close main menu</span>
          <X />
        </Button>

        <Nav className="mx-auto text-center">
          <Nav.List className="capitalize">
            <Nav.Item className="mb-4" onClick={close}>
              <Nav.Link title="Home" href="/">
                <span className="sr-only">Home</span>
                <Home className="inline not-md:size-11" />
              </Nav.Link>
            </Nav.Item>

            {entries.map((entry) => (
              <Nav.Item key={entry} onClick={close}>
                <Nav.Link href={entry}>{entry}</Nav.Link>
              </Nav.Item>
            ))}

            <Nav.Item onClick={close}>
              <Nav.Link href="/test" className="mt-4 font-mono lowercase">
                [test]
              </Nav.Link>
            </Nav.Item>
          </Nav.List>
        </Nav>
      </Presence>
    </>
  );
};
