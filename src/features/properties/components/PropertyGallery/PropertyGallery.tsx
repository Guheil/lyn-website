'use client';
import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { PropertyGalleryProps } from './interface';
import { StyledGallery, StyledMainImage, StyledThumb, StyledThumbRail } from './elements';

const fallback = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=84';

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const safe = useMemo(() => {
    const validImages = Array.isArray(images) ? images.filter((image) => typeof image === 'string' && image.trim()) : [];
    return validImages.length ? validImages : [fallback];
  }, [images]);
  const [active, setActive] = useState(safe[0]);
  const activeIndex = Math.max(0, safe.findIndex((image) => image === active));

  return (
    <StyledGallery>
      <Box sx={{ position: 'relative' }}>
        <StyledMainImage image={active} role="img" aria-label={`${title} main image`} />
        <Box
          sx={{
            position: 'absolute',
            left: 18,
            bottom: 18,
            bgcolor: 'rgba(0,0,0,0.58)',
            color: '#fff',
            px: 1.6,
            py: 1,
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Photo {activeIndex + 1} / {safe.length}
          </Typography>
        </Box>
      </Box>
      {safe.length > 1 ? (
        <StyledThumbRail>
          {safe.slice(0, 5).map((image, index) => (
            <StyledThumb
              key={`${image}-${index}`}
              image={image}
              active={active === image}
              onClick={() => setActive(image)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </StyledThumbRail>
      ) : null}
    </StyledGallery>
  );
}
