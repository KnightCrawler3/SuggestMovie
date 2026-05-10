import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmdbImage'
})
export class TmdbImagePipe implements PipeTransform {
  transform(path: string | undefined | null, size: string = 'original'): string {
    const fallback = 'assets/images/default-movie.png';
    if (!path) {
      return fallback;
    }
    // some paths may already include a leading slash
    const p = path.startsWith('/') ? path : `/${path}`;
    // Normalize size: accept 'original' or extract a valid TMDB width like 'w370' from composite names
    let normalizedSize = 'w500';
    if (size === 'original') {
      normalizedSize = 'original';
    } else {
      // try to find a substring like 'wNNN' (e.g. w370) and use it
      const m = size.match(/w(\d+)/);
      if (m && m.length) {
        const requested = parseInt(m[1], 10);
        // TMDB supported poster sizes (common): w92, w154, w185, w342, w500, w780
        const supported = [92, 154, 185, 342, 500, 780];
        // choose the closest supported size (prefer >= requested if available)
        let chosen = supported.reduce((prev, cur) => {
          return (Math.abs(cur - requested) < Math.abs(prev - requested) ? cur : prev);
        }, supported[0]);
        // prefer first supported size >= requested when possible
        const ge = supported.find(s => s >= requested);
        if (ge) {
          chosen = ge;
        }
        normalizedSize = `w${chosen}`;
      }
    }

    return `https://image.tmdb.org/t/p/${normalizedSize}${p}`;
  }
}
