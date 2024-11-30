import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import { BreadcrumbItem } from '../../types/route';

export const Breadcrumbs = observer(() => {
  const { uiStore } = useStore();
  const location = useLocation();
  const breadcrumbs = uiStore.getBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <MuiBreadcrumbs>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <Typography key={item.path} color="text.primary">
              {item.title}
            </Typography>
          ) : (
            <Link
              key={item.path}
              component={RouterLink}
              to={item.path}
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {item.icon && <item.icon sx={{ mr: 0.5 }} fontSize="small" />}
              {item.title}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}); 