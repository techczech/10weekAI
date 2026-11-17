import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { content } from '../data/content';
import { applyCitation, type CitePage } from './kit/citation';
import { citationPage } from './page';

export function pageForPath(path: string): CitePage {
  const week = content.find(item => path === `/week/${item.id}`);
  const title = week?.title ?? ({ '/curriculum': 'Curriculum', '/about': 'About This Project' } as Record<string, string>)[path];
  return title ? { ...citationPage, title, url: new URL(path, citationPage.url).href, description: week?.description ?? citationPage.description } : citationPage;
}

export function RouteCitation() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pageForPath(pathname);
    applyCitation(page);
    document.title = page.title;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', page.url);
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description ?? '');
  }, [pathname]);
  return null;
}
