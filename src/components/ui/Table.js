import React from "react";
import { cn } from "../../lib/utils";

/**@param {React.HTMLAttributes<HTMLTableElement>} param0 */
const Table = ({ className, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);
Table.displayName = "Table";

/**@param {React.HTMLAttributes<HTMLTableSectionElement>} param0 */
const TableHeader = ({ className, ...props }) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);
TableHeader.displayName = "TableHeader";

/**@param {React.HTMLAttributes<HTMLTableSectionElement>} param0 */
const TableBody = ({ className, ...props }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);
TableBody.displayName = "TableBody";

/**@param {React.HTMLAttributes<HTMLTableSectionElement>} param0 */ 
const TableFooter = ({ className, ...props }) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
);
TableFooter.displayName = "TableFooter";

/**@param {React.HTMLAttributes<HTMLTableRowElement>} param0 */
const TableRow = ({ className, ...props }) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";

/**@param {React.HTMLAttributes<HTMLTableCellElement>} param0 */
const TableHead = ({ className, ...props }) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";

/**@param {React.HTMLAttributes<HTMLTableCellElement>} param0 */
const TableCell = ({ className, ...props }) => (
  <td
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);
TableCell.displayName = "TableCell";

/**@param {React.HTMLAttributes<HTMLTableCaptionElement>} param0 */
const TableCaption = ({ className, ...props }) => (
  <caption
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
