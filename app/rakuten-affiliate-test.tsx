import React from 'react';

// 手動でCSV内容を貼り付けた配列
const rakutenData = [
  [
    '非アフィURL (direct)',
    'タイトル (title)',
    'アフィリエイトリンク'
  ],
  [
    'https://books.rakuten.co.jp/search?g=000&sitem=T.M.Revolution+DVD+Series+The+Summary',
    'T.M.Revolution DVD Series The Summary -summarize 1-',
    '<a href="//af.moshimo.com/af/c/click?a_id=5073190&p_id=56&pc_id=56&pl_id=637&url=https%3A%2F%2Fbooks.rakuten.co.jp%2Fsearch%3Fg%3D000%26sitem%3DT.M.Revolution%2BDVD%2BSeries%2BThe%2BSummary" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>T.M.Revolution DVD Series The Summary -summarize 1-</a><img src="//i.moshimo.com/af/i/impression?a_id=5073190&p_id=56&pc_id=56&pl_id=637" width="1" height="1" style="border:none;" alt="" loading="lazy">'
  ],
  // ...（他の行も同様に追加）
];

const RakutenAffiliateTest = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>楽天ブックス アフィリエイトリンク表示テスト</h1>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>非アフィURL</th>
            <th>アフィリエイトリンク（タグごと）</th>
          </tr>
        </thead>
        <tbody>
          {rakutenData.slice(1).map((row, i) => (
            <tr key={i}>
              <td>{row[1]}</td>
              <td><a href={row[0]} target="_blank" rel="noopener noreferrer">{row[0]}</a></td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: row[2] }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{marginTop: 24, color: '#888'}}>※ このページはテスト用です。アフィリエイトタグの生HTMLをそのまま表示しています。</p>
    </div>
  );
};

export default RakutenAffiliateTest; 