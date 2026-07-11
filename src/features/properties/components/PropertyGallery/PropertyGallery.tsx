'use client';
import { useState } from 'react';
import type { PropertyGalleryProps } from './interface';
import { StyledGallery, StyledMainImage, StyledThumb, StyledThumbGrid } from './elements';
const fallback = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=84';
export function PropertyGallery({ images, title }: PropertyGalleryProps) { const safe = images.length ? images : [fallback]; const [active, setActive] = useState(safe[0]); return <StyledGallery><StyledMainImage image={active} role="img" aria-label={`${title} main image`} /><StyledThumbGrid>{safe.slice(0,4).map((image,index) => <StyledThumb key={`${image}-${index}`} image={image} active={active===image} onClick={() => setActive(image)} aria-label={`View image ${index+1}`} />)}</StyledThumbGrid></StyledGallery>; }
