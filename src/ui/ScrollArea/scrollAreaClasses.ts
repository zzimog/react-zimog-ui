const scrollAreaClasses = {
  root: 'group/scrollarea relative! overflow-hidden!',
  viewport:
    'size-full overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden',
  scrollbar:
    'opacity-0 group-hover/scrollarea:opacity-100 absolute inset-[0_0_0_auto] transition hover:bg-border',
  thumb: 'w-2 rounded-full bg-foreground/50 dark:bg-background/50',
};

export default scrollAreaClasses;
