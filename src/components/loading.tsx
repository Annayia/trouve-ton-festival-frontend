import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { CircularProgress, Container, Link, Typography } from '@mui/material';

export default function LoadingComponent() {
  return (
    <Container
      maxWidth="xs"
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Container>
  );
}
