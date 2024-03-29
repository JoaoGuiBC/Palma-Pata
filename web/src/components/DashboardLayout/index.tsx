import React from 'react';

import { NavBar } from '../NavBar';

import { Container } from './styles';

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
}
