import { Button, Typography, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const Home: React.FC = () => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="h4" color="primary">
        Welcome to the Home Page!
      </Typography>
      <Typography variant="body1" color="secondary">
        This is where you can find some introductory content or navigation
        options.
      </Typography>
      <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
        Start Journey.!
      </Button>
    </Grid>
  </Grid>
);

export default Home;
