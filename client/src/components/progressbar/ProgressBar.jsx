function ProgressBar({ category, transactions }) {
  const occur = transactions.filter((e) => {
    return e?.categoryName.toLowerCase() === category.toLowerCase();
  })?.length;
  console.log(transactions);
  return (
    <div className="progress__bar__wrapper mt-2">
      <div className="progress__bar__header">
        <span>{category.toUpperCase()}</span>
        <span>{((occur / transactions?.length || 0) * 100).toFixed(0)}%</span>
      </div>

      <div className="progress__bar">
        <div
          className="progress__bar__status"
          style={{
            width: `${(occur / transactions?.length || 0) * 100}%`,
          }}
        ></div>
        <div className="progress__bar__download"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
