import {
  type ElementType,
  type HTMLAttributes,
  useId,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import { cn } from '../utils';
import { ChevronDown } from 'lucide-react';

export type AccordionItemProps = {
  as?: ElementType;
  title: string;
  value?: string | number;
  expanded?: boolean;
} & HTMLAttributes<HTMLElement>;

export const AccordionItem = (inProps: AccordionItemProps) => {
  const {
    as,
    title,
    /*value,*/
    expanded: initialExpanded,
    className,
    children,
    ...props
  } = inProps;

  const Tag = as || 'div';

  const triggerId = useId();
  const contentId = useId();

  const [height, setHeight] = useState(-1);
  const [expanded, setExpanded] = useState(initialExpanded || false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    setExpanded((prev) => !prev);
  }

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) {
      return;
    }

    setHeight(() => {
      const { height } = content.getBoundingClientRect();
      return height;
    });
  }, []);

  if (wrapperRef.current) {
    wrapperRef.current.style.setProperty('--height', `${height}px`);
  }

  return (
    <Tag
      className={cn(
        'group',
        'not-last:border-b',
        'border-gray-500/20',
        className
      )}
      {...props}
    >
      <button
        id={triggerId}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={handleClick}
        className={cn(
          'flex',
          'justify-between',
          'items-center',
          'w-full',
          'py-3',
          'text-left',
          'rounded-md',
          'transition-[outline]',
          'duration-100',
          'outline-0',
          'outline-primary/30',
          'focus-visible:outline-4',
          'hover:underline'
        )}
      >
        {title}
        <ChevronDown
          className={cn(
            'size-4',
            'pointer-events-none',
            'shrink-0',
            'transition-transform',
            'duration-200',
            expanded && 'rotate-180'
          )}
        />
      </button>
      <div
        ref={wrapperRef}
        id={contentId}
        role="region"
        aria-hidden={!expanded}
        aria-labelledby={triggerId}
        className={cn(
          expanded ? 'h-[var(--height)]' : 'h-0',
          'transition-[height]',
          'duration-200',
          'overflow-hidden'
        )}
      >
        <div ref={contentRef} className="pb-3">
          {children}
        </div>
      </div>
    </Tag>
  );
};
