export default {
  item: 'transition-colors not-last:border-b',
  trigger: [
    'w-full',
    'flex',
    'justify-between',
    'items-center',
    'gap-2',
    'py-4',
    'font-semibold',
    'hover:underline',
    '[&[data-open=true]>svg]:-rotate-180',
  ].join(' '),
  arrow: 'size-4 transition-transform shrink-0',
  collapsible: [
    'overflow-hidden',
    'data-[open=true]:animate-height-grow',
    'data-[open=false]:animate-height-shrink',
  ].join(' '),
  content: 'pt-0 pb-4',
};
