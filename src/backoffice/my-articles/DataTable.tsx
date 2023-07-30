import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  type SortingState,
  getSortedRowModel,
  type ColumnDef,
  type SortDirection,
} from '@tanstack/react-table';

export type DataTableProps<Data extends object> = {
  data: Data[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <Box display="flex">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() && (
                      <Flex pl="4">
                        <TriangleDownIcon
                          aria-label="sorted descending"
                          color={getTriangleColor(
                            'desc',
                            header.column.getIsSorted(),
                          )}
                          boxSize={3}
                        />
                        <TriangleUpIcon
                          aria-label="sorted ascending"
                          color={getTriangleColor(
                            'asc',
                            header.column.getIsSorted(),
                          )}
                          boxSize={3}
                        />
                      </Flex>
                    )}
                  </Box>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export function getTriangleColor(
  thisTriangle: SortDirection,
  isSorted: SortDirection | false,
) {
  if (isSorted === thisTriangle) {
    return 'blue.600';
  }
  return 'gray';
}
