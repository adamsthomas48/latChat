export const Button = ({ children, ...other }) => {
  return (
    <button className="button" {...other}>
      {children}
    </button>
  );
};
