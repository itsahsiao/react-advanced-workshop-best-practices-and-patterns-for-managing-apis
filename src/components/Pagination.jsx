const Pagination = ({ page, onNext, onPrev }) => {
  return (
    <div className="flex item-center justify-center gap-3">
      <button onClick={onPrev}>Prev</button>
      <span>{page}</span>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Pagination;
