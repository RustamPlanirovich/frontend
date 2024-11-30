import { ModuleFederationConfig } from './types';

const moduleFederationConfig: ModuleFederationConfig = {
  name: 'host',
  remotes: {},
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
    '@mui/material': { singleton: true, requiredVersion: '^5.0.0' },
    mobx: { singleton: true, requiredVersion: '^6.0.0' },
    'mobx-react-lite': { singleton: true, requiredVersion: '^4.0.0' }
  }
};

export default moduleFederationConfig; 