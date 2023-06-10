export default function NameInitials(props) {
  return (
    <div className="name">
      <div className="name__initials">
        <span>{props.name?.substring(0, 1).toUpperCase()}</span>
      </div>
    </div>
  );
}
