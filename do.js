document.addEventListener('DOMContentLoaded', () => {
  // 1. サイドバーのカテゴリークリックで記事を絞り込み
  const categoryLinks = document.querySelectorAll('.category-list a');
  const posts = document.querySelectorAll('.post');
  const contentArea = document.querySelector('.content-area');

  // 「すべて表示」リセット用ボタンを動的に生成
  const resetBtn = document.createElement('button');
  resetBtn.textContent = '× 絞り込みを解除（すべて表示）';
  resetBtn.style.cssText = 'display:none; margin-bottom:16px; padding:6px 12px; cursor:pointer;';
  contentArea.prepend(resetBtn);

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // "技術メモ (12)" からカテゴリー名だけを抽出
      const selectedCategory = link.textContent.replace(/\s*\(\d+\)$/, '').trim();

      posts.forEach(post => {
        const postCategory = post.querySelector('.post-category').textContent.trim();
        post.style.display = (postCategory === selectedCategory) ? 'block' : 'none';
      });

      resetBtn.style.display = 'inline-block';
    });
  });

  resetBtn.addEventListener('click', () => {
    posts.forEach(post => post.style.display = 'block');
    resetBtn.style.display = 'none';
  });

  // 2. 記事タイトルクリックで本文の開閉（アコーディオン）
  const postTitles = document.querySelectorAll('.post-title a');
  postTitles.forEach(title => {
    title.addEventListener('click', (e) => {
      e.preventDefault();
      const postBody = title.closest('.post').querySelector('.post-body');
      const isHidden = postBody.style.display === 'none';
      postBody.style.display = isHidden ? 'block' : 'none';
    });
  });

  // 3. ヘッダーにダークモード切り替えボタンを追加
  const headerContainer = document.querySelector('.site-header .container');
  const themeBtn = document.createElement('button');
  themeBtn.textContent = '🌙 ダークモード';
  themeBtn.style.cssText = 'margin-top:8px; padding:4px 10px; cursor:pointer;';
  headerContainer.appendChild(themeBtn);

  let isDark = false;
  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.body.style.backgroundColor = isDark ? '#1e1e1e' : '';
    document.body.style.color = isDark ? '#e0e0e0' : '';
    themeBtn.textContent = isDark ? '☀️ ライトモード' : '🌙 ダークモード';
  });
});