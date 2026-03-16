import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

export const Table = ({ className, ...props }: NativeProps<'table'>) => (
  <Native.table
    {...props}
    className={cn('w-full border-collapse text-sm', className)}
  />
);

Table.displayName = 'Table';

/*---------------------------------------------------------------------------*/
// TableHeader
/*---------------------------------------------------------------------------*/

const TableHeader = ({ className, ...props }: NativeProps<'thead'>) => (
  <Native.thead
    {...props}
    className={cn('border-b [&_tr]:hover:bg-transparent', className)}
  />
);

TableHeader.displayName = 'TableHeader';
Table.Header = TableHeader;

/*---------------------------------------------------------------------------*/
// TableBody
/*---------------------------------------------------------------------------*/

const TableBody = ({ className, ...props }: NativeProps<'tbody'>) => (
  <Native.tbody {...props} className={cn('', className)} />
);

TableBody.displayName = 'TableBody';
Table.Body = TableBody;

/*---------------------------------------------------------------------------*/
// TableFooter
/*---------------------------------------------------------------------------*/

const TableFooter = ({ className, ...props }: NativeProps<'tfoot'>) => (
  <Native.tfoot
    {...props}
    className={cn(
      'border-t',
      'bg-muted-contrast/25',
      'transition',
      '[&_tr]:hover:bg-transparent',
      className
    )}
  />
);

TableFooter.displayName = 'TableFooter';
Table.Footer = TableFooter;

/*---------------------------------------------------------------------------*/
// TableRow
/*---------------------------------------------------------------------------*/

const TableRow = ({ className, ...props }: NativeProps<'tr'>) => (
  <Native.tr
    {...props}
    className={cn(
      'hover:bg-highlight/25 border-border/25 transition not-last:border-b',
      className
    )}
  />
);

TableRow.displayName = 'TableRow';
Table.Row = TableRow;

/*---------------------------------------------------------------------------*/
// TableHead
/*---------------------------------------------------------------------------*/

const TableHead = ({ className, ...props }: NativeProps<'th'>) => (
  <Native.th
    {...props}
    className={cn('p-3 text-left font-semibold', className)}
  />
);

TableHead.displayName = 'TableHead';
Table.Head = TableHead;

/*---------------------------------------------------------------------------*/
// TableCell
/*---------------------------------------------------------------------------*/

const TableCell = ({ className, ...props }: NativeProps<'td'>) => (
  <Native.td {...props} className={cn('p-3 transition', className)} />
);

TableCell.displayName = 'TableCell';
Table.Cell = TableCell;
