export const Contaniner = ({ children }) => {
  return (
    <div className="container">
      <div className="col-md-4 py-4 offset-md-4">{children}</div>
    </div>
  );
};
