import { forwardRef, useCallback, useEffect, useState } from 'react';
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
  Tooltip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { fetchAllProducts } from '../../services/products';
import Toast from '../../components/Toast';
import ProductPopup from './ProductPopup';

interface Rating {
  rate: number;
  count: number;
}
interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

type ProductPopupFormValues = Omit<ProductData, 'id' | 'rating' | 'image'>;

interface ColumnData {
  dataKey: keyof ProductData | 'action';
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: 'Title',
    dataKey: 'title',
  },
  {
    width: 200,
    label: 'Description',
    dataKey: 'description',
  },
  {
    width: 120,
    label: 'Price ($)',
    dataKey: 'price',
    numeric: true,
  },
  {
    width: 150,
    label: 'Category',
    dataKey: 'category',
  },
  {
    width: 120,
    label: 'Rating',
    dataKey: 'rating',
    numeric: true,
  },
  {
    width: 120,
    label: 'Action',
    dataKey: 'action',
  },
];

const VirtuosoTableComponents: TableComponents<ProductData> = {
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
      {columns.map((column, index) => (
        <TableCell
          key={`Column ${index + 1}`}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'rgba(175,175,175,0.8)',
            fontWeight: 'bold',
            fontSize: '16px',
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

const renderColumnContent = (
  dataKey: keyof ProductData | 'action',
  row: ProductData,
  handleEdit: (product: ProductData) => void,
  handleDelete: (id: number) => void,
) => {
  switch (dataKey) {
    case 'description':
      return (
        <Tooltip title={row.description} placement="bottom">
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row.description}
          </Typography>
        </Tooltip>
      );
    case 'rating':
      return `Rate: ${row.rating.rate}, Count: ${row.rating.count}`;
    case 'action':
      return (
        <Box sx={{ display: 'flex', gap: '2px' }}>
          <Tooltip title="Edit" placement="bottom">
            <IconButton onClick={() => handleEdit(row)}>
              <EditIcon sx={{ color: 'rgba(0, 122, 204, 0.8)' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="bottom">
            <IconButton onClick={() => handleDelete(row.id)}>
              <DeleteIcon sx={{ color: 'rgba(161, 41, 32, 0.8)' }} />
            </IconButton>
          </Tooltip>
        </Box>
      );
    default:
      return row[dataKey];
  }
};

const Dashboard = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null,
  );

  const handleEdit = (product: ProductData) => {
    handleOpenPopup(product);
  };

  const handleOpenPopup = useCallback((product?: ProductData) => {
    setEditingProduct(product || null);
    setPopupOpen(true);
  }, []);

  const handleClosePopup = () => {
    setPopupOpen(false);
    setEditingProduct(null);
  };

  const handleSubmitProduct = (product: ProductPopupFormValues) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...product } : p,
        ),
      );
    } else {
      setProducts([
        {
          ...product,
          id: Math.floor(Math.random() * 10) + 30,
          rating: { rate: 0, count: 0 },
          image: '',
        },
        ...products,
      ]);
    }
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
    Toast({
      message: `Product removed successfully.`,
      variant: 'success',
    });
  };

  function rowContent(_index: number, row: ProductData) {
    return (
      <>
        {columns.map((column, index) => (
          <TableCell
            key={`Product ${index + 1}`}
            align={column.numeric ? 'right' : 'left'}
            sx={{
              backgroundColor:
                index % 2 === 0 ? 'rgba(240, 240, 240, 1)' : 'white',
              borderBottom: '1px solid #ddd',
              padding: '16px',
              fontSize: '14px',
            }}
          >
            {renderColumnContent(column.dataKey, row, handleEdit, handleDelete)}
          </TableCell>
        ))}
      </>
    );
  }
  const loadProducts = async () => {
    const data = await fetchAllProducts();
    if (data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
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
          onClick={() => handleOpenPopup()}
        >
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
            data={products}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
      {popupOpen && (
        <ProductPopup
          open={popupOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmitProduct}
          initialData={editingProduct}
          isEditMode={!!editingProduct}
        />
      )}
    </Box>
  );
};

export default Dashboard;
