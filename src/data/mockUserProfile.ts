import type { MockUserProfile } from '../types/template';

export const defaultMockUserProfile: MockUserProfile = {
  name: 'Alice Wang',
  tier: 'premium',
  region: 'us-west',
  features: {
    showCharts: true,
    showTable: true,
    betaAccess: false,
  },
};
