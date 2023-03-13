import Button from '@mui/material/Button';

export default function Account() {
  return (
    <div>
      <h2>You are not logged in</h2>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </div>
  );
}