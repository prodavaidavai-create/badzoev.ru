document.addEventListener('DOMContentLoaded', () => {
  const query = new URLSearchParams(location.search);
  const source = { youtube: 'yt', yandex: 'ya', vk: 'vk', telegram: 'tg' }[query.get('utm_source')] || 'site';
  for (const link of document.querySelectorAll('.bot-link[data-code]')) {
    const content = (query.get('utm_content') || link.dataset.defaultContent || 'general').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 24) || 'general';
    const url = new URL(link.href);
    url.searchParams.set('start', `${link.dataset.code}_${source}_${content}`.slice(0, 64));
    link.href = url.toString();
  }
});
