const Totals = ({ totals }: { totals: number }) => {
  return (
    <div>
      <p>
        Number of exercises: <strong>{totals}</strong>
      </p>
    </div>
  );
};

export default Totals;
