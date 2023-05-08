import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

const AdminPanelPage = memo(() => {
  const { t } = useTranslation('main');

  return (
    <Page>
      {t('Admin Panel Page')}
    </Page>
  );
});

export default AdminPanelPage;