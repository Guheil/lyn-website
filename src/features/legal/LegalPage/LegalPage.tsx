import type { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { StyledLegalContent, StyledLegalHeader } from './elements';

interface LegalPageProps { title: string; description: string; children: ReactNode; }

export function LegalPage({ title, description, children }: LegalPageProps) {
  return <><StyledLegalHeader><div className="inner"><Typography variant="h1">{title}</Typography><Typography>{description}</Typography></div></StyledLegalHeader><StyledLegalContent><span className="updated">Last updated: July 11, 2026</span>{children}</StyledLegalContent></>;
}
