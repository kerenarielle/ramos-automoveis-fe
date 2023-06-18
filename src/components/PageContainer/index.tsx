import React, { FunctionComponent, ReactNode } from 'react';
import Header from '../Header';

import './index.css';

type PageContainerProps = {
  pageCurrent?: string;
  className?: string;
  children: ReactNode;
  container?: boolean;
};

const PageContainer: FunctionComponent<PageContainerProps> = ({ children, className, container = true }) => (
  <section className={className}>
    <Header />

    <section className={container ? 'container' : ''}>{children}</section>
  </section>
);

export default PageContainer;
