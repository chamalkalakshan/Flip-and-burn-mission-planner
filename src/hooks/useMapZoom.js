import { useEffect, useRef, useState } from 'react';
import { zoom as d3zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';

export function useMapZoom(svgRef) {
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const zoomRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);

    const zoomBehavior = d3zoom()
      .scaleExtent([0.3, 8])
      .on('zoom', (event) => {
        const { x, y, k } = event.transform;
        setTransform({ x, y, k });
      });

    svg.call(zoomBehavior);
    zoomRef.current = zoomBehavior;

    // Start with a sensible default view centered on inner system
    svg.call(zoomBehavior.transform, zoomIdentity.translate(0, 0).scale(1));

    return () => svg.on('.zoom', null);
  }, [svgRef]);

  const resetZoom = () => {
    if (!svgRef.current || !zoomRef.current) return;
    select(svgRef.current)
      .transition()
      .duration(600)
      .call(zoomRef.current.transform, zoomIdentity);
  };

  return { transform, resetZoom };
}
