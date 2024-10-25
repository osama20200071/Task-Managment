import "./Callout.css"; // Include your CSS styles here

const Callout = ({ type = "info", title, children, onClose }) => {
  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-header">
        <strong>{title}</strong>
        {onClose && (
          <button className="callout-close" onClick={onClose}>
            &times;
          </button>
        )}
      </div>
      <div className="callout-body">{children}</div>
    </div>
  );
};

export default Callout;
