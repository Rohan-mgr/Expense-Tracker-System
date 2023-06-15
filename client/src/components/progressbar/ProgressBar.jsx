function ProgressBar({ category, transactions }) {
  const occur = transactions.filter(
    (e) => e?.categoryName === category.toLowerCase()
  )?.length;
  console.log(occur, "progressbar");
  //   const { total, completed, size_type } = download_info;
  return (
    <div className="progress__bar__wrapper mt-2">
      <div className="progress__bar__header">
        <span>{category}</span>
        <span>{((occur / transactions?.length) * 100).toFixed(0)}%</span>
      </div>

      <div className="progress__bar">
        <div
          className="progress__bar__status"
          style={{
            width: `${(occur / transactions?.length) * 100 || 0}%`,
          }}
        ></div>
        <div className="progress__bar__download"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
