import React from 'react';
import PageLayout from '../components/page-layout/PageLayout';
import Plug from '../components/plug/Plug';

const ErrorPage = ():JSX.Element => {
  return (
      <PageLayout>
        <Plug text={'Error 404'}/>
      </PageLayout>
  );
};

export default ErrorPage;