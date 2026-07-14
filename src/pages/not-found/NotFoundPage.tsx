export function NotFoundPage({ lang, content, onGoHome, onOpenDiscover }: any) {
  return (
    <div className="page-content page-content--notfound">
      <section className="collection-empty glass">
        <div className="budget-empty__icon">☁️</div>
        <h1>{lang === 'vi' ? 'Bì chưa tìm thấy trang này.' : 'Bì could not find this page.'}</h1>
        <p>
          {lang === 'vi'
            ? 'Trang bạn đang mở có thể đã đổi địa chỉ hoặc không còn tồn tại. Hãy quay về trang chủ hoặc thử khám phá thêm các danh mục xinh xắn khác.'
            : 'This page may have moved or no longer exists. Go back home or keep exploring the cute categories available on Bì Bì.'}
        </p>
        <div className="notfound-actions">
          <button type="button" className="section-link budget-empty__button" onClick={onGoHome}>
            {lang === 'vi' ? 'Về trang chủ' : 'Go home'}
          </button>
          <button type="button" className="section-link budget-empty__button" onClick={onOpenDiscover}>
            {lang === 'vi' ? 'Khám phá món xinh' : 'Explore cute picks'}
          </button>
        </div>
      </section>
    </div>
  );
}
