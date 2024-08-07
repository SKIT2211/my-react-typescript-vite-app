import { forwardRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

interface Data {
  calories: number;
  carbs: number;
  dessert: string;
  fat: number;
  id: number;
  protein: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, number, number, number];

const sample: readonly Sample[] = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

function createData(
  id: number,
  dessert: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return { id, dessert, calories, fat, carbs, protein };
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: 'Dessert',
    dataKey: 'dessert',
  },
  {
    width: 120,
    label: 'Calories\u00A0(g)',
    dataKey: 'calories',
    numeric: true,
  },
  {
    width: 120,
    label: 'Fat\u00A0(g)',
    dataKey: 'fat',
    numeric: true,
  },
  {
    width: 120,
    label: 'Carbs\u00A0(g)',
    dataKey: 'carbs',
    numeric: true,
  },
  {
    width: 120,
    label: 'Protein\u00A0(g)',
    dataKey: 'protein',
    numeric: true,
  },
];

const rows: Data[] = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
    />
  ),
  TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'rgba(175,175,175,0.8)',
            fontWeight: 'bold',
            borderBottom: '2px solid #CB3066',
            padding: '16px',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

export default function Dashboard() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          height: '60px',
          width: '100%',
          px: '20px',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button
          variant="contained"
          sx={{
            height: '24px',
            width: '146px',
            margin: 'auto 0',
            background: '#0281b0',
            '&:hover': {
              background: '#ed5384',
            },
          }}
          startIcon={<AddIcon />}
        >
          {/* <AddIcon sx={{ height: '18px', marginRight: '3px' }} /> */}
          <Typography
            variant="body2"
            sx={{
              textTransform: 'none',
            }}
          >
            Add Product
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          height: 'calc(100% - 60px)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          style={{
            padding: '0px 20px 20px',
            height: '100%',
            width: '100%',
          }}
        >
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </Box>
  );
}
