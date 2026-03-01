const classes = {
  trigger: [
    'flex',
    'justify-between',
    'items-center',
    'gap-2',
    'w-full',
    'h-8',
    'px-2',
    'text-sm',
    'border',
    'bg-input',
    'rounded-shape',
    'transition-colors',
    '[&_svg]:size-4',
    '[&_svg]:transition-transform',
    // hover
    'not-disabled:hover:border-primary',
    // focus
    'focusable',
    'focus:border-primary',
    'focus:outline-outline',
    // disabled
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    // expanded
    'aria-expanded:[&_svg]:rotate-180',
    // invalid
    'aria-invalid:border-danger',
    'aria-invalid:focus:outline-danger/25',
  ],
  dialog: [
    'w-(--anchor-width)',
    'h-50',
    'border',
    'text-foreground',
    'bg-input',
    'rounded-shape',
    'overflow-hidden',
    'transition-colors',
  ],
  content: ['h-full', 'outline-0', 'overflow-auto'],
  group: ['group', 'mt-2', 'pt-1', 'border-t'],
  legend: [
    'px-2 mb-2',
    'text-muted',
    'text-xs',
    'font-semibold',
    'group-aria-disabled:opacity-25',
    'cursor-default',
  ],
  option: [
    'relative',
    'px-2 py-1 pl-6',
    'mx-1 first:mt-1 last:mb-1',
    'outline-0',
    'rounded-shape',
    'text-sm',
    'select-none',
    'aria-disabled:opacity-25',
    'group-aria-disabled:opacity-25',
    'data-highlighted:bg-highlight',
    'data-highlighted:text-highlight-contrast',
  ],
  check: ['absolute', 'top-1/2', 'left-2', 'size-3', '-translate-y-1/2'],
};

export default classes;
