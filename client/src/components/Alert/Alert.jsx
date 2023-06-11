import Alert from "react-bootstrap/Alert";

function AlertDismissible(props) {
  if (props.status) {
    return (
      <Alert
        variant={props.Variant}
        onClose={() => props.SetStatus(null)}
        dismissible
      >
        {props.children}
      </Alert>
    );
  }
}

export default AlertDismissible;
