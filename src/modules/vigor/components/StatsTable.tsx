import React from 'react';
import styled from 'styled-components'
import colors from 'shared/styles/colors';
import { VerticalFlex } from 'shared/components/styled';

const TableRow = styled.div<{depth: number}>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0px;
  padding: ${p => p.depth > 0 ? `8px 0px` : `8px 16px`};

  ${p => p.depth === 0 ? `{
    &:nth-child(2n+1) {
      background-color: ${colors.bg};
    }
    &:nth-child(2n+0) {
      background-color: ${colors.bgLight};
    }
  }` : ``};

  &:hover, &:active, &:focus {
      background-color: ${colors.bgLightest};
  }
`

const TableKey = styled.span<any>`
display: block;
width: 150px;
color: ${p => p.color};
text-transform: uppercase;
font-weight: 500;
`

const TableValue = styled.div`
font-weight: normal;
`

const formatValue = (val) => {
  // if string or number is a float, round decimals only if necessary
  if (!isNaN(val) && val.toString().indexOf(".") !== -1)
    return +(+val).toFixed(6);

  return val;
}

const StatsTable: React.FC<{ data: any, showMinimal?: boolean,  keyColor?: string, tableRowDepth?: number }> = ({ data, showMinimal, keyColor = colors.primary, tableRowDepth = 0 }) => {
  if (typeof data === `object` && !Array.isArray(data)) {
    const rows = Object.entries(data).map(([key, val]) => <TableRow depth={tableRowDepth} key={key}>
      <TableKey color={keyColor}>{key}</TableKey>
      <StatsTable data={val} keyColor={keyColor} tableRowDepth={tableRowDepth + 1} />
    </TableRow>)
    return <React.Fragment>{rows}</React.Fragment>
  }

  if (Array.isArray(data) && showMinimal) {
    const rows = data.map(([key, val]) => <TableRow depth={tableRowDepth} key={key}>
      <TableKey color={keyColor}>{key}</TableKey>
      <StatsTable data={val} keyColor={keyColor} tableRowDepth={tableRowDepth + 1} />
    </TableRow>)
    return <React.Fragment>{rows}</React.Fragment>
  }

  if (Array.isArray(data)) {
    return <VerticalFlex alignItems="flex-end">
      {data.map(val => <TableRow key={val} depth={tableRowDepth}><StatsTable data={val} tableRowDepth={tableRowDepth + 1} /></TableRow>)}
    </VerticalFlex>
  }

  return <TableValue>{formatValue(data)}</TableValue>;
};

export default StatsTable
