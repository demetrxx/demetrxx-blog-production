import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui';
import { EditableProfileCard } from '@/features/EditableProfileCard';

const ProfilePage = () => {
  const { id } = useParams<{id: string}>();

  return (
    <Page dataTestId="ProfilePage">
      <VStack gap={16} max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};
export default memo(ProfilePage);
