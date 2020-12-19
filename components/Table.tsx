import React from "react";
import { Column, useTable } from "react-table";
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
} from "@chakra-ui/react";

type ChakraColumn = Column & TableCellProps & { center?: boolean };

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
  } = useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: ChakraColumn) => (
              <Th {...column.getHeaderProps()}>
                <ConditionalCenter center={column.center}>
                  {column.render("Header")}
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
