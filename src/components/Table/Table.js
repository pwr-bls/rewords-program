import styled from "styled-components";

const Table = ({ columns, data, rowRender }) => {
  const _rowRender = (row) => {
    if (rowRender) {
      return rowRender(row, columns);
    }
    return (
      <tr key={`table_${row.name}`}>
        {columns.map((column, idx) => (
          <td key={`table_td_${column.accessor}-${row.name}`}>
            {row[column.accessor]}
          </td>
        ))}
      </tr>
    );
  };
  return (
    <StyledTable style={{ width: "100%" }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={`table_th_${column.accessor}`}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((row) => _rowRender(row))}</tbody>
    </StyledTable>
  );
};

export default Table;

const StyledTable = styled.table`
  width: 100%;
  vertical-align: top;
  padding: 0.25rem;

  th,
  td {
    padding: 0.25rem;
    border: 1px solid;
  }
  td .toggle-icon {
    margin-right: 10px;
  }
`;
