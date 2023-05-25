import React from 'react';

import { Box, Inline, Text } from '~/design-system';

const LabelPill = ({ label, dot }: { label: string; dot?: boolean }) => (
  <Box
    background="surfacePrimaryElevatedSecondary"
    borderRadius="round"
    padding="8px"
  >
    {dot ? (
      <Inline>
        <Box
          style={{
            marginRight: '4px',
            width: '7px',
            height: '7px',
            borderRadius: '7px',
            boxShadow: '0px 0px 10px rgba(62, 207, 91, 0.4)',
          }}
          background="green"
        />
        <Text size="12pt" weight="semibold" color="labelQuaternary">
          {label}
        </Text>
      </Inline>
    ) : (
      <Text size="12pt" weight="semibold" color="labelQuaternary">
        {label}
      </Text>
    )}
  </Box>
);

export { LabelPill };
