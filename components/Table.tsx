import React from "react";
import { Column, useTable, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableCellProps,
  Center,
  Icon,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

type ChakraColumn = Column & TableCellProps & { center?: boolean, isSorted?: boolean, isSortedDesc?: boolean };

interface Props {
  columns: ChakraColumn[];
  data: any;
}

const ConditionalCenter = ({ children, center }) =>
  center ? <Center>{children}</Center> : children;

export const TableComponent = ({ columns, data }: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps((column as any).getSortByToggleProps())}>
                <ConditionalCenter center={(column as unknown as ChakraColumn).center}>
                  {column.render("Header")}
                  {(column as unknown as ChakraColumn).isSorted
                      ? (column as unknown as ChakraColumn).isSortedDesc
                        ? <TriangleDownIcon ml={1} />
                        : <TriangleUpIcon ml={1} />
                      : ''}
                </ConditionalCenter>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td
                  {...cell.getCellProps()}
                  isNumeric={(cell.column as ChakraColumn).isNumeric}
                >
                  <ConditionalCenter center={(cell.column as ChakraColumn).center}>
                    {cell.render("Cell")}
                  </ConditionalCenter>
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
