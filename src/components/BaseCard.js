import { Thumbnail } from "./Thumbnail";

export function BaseCard({ children, id, avatarSrc, ...rest }) {
  return (
    <div key={id} className="card card--shadow m-1">
      <Thumbnail id={id} />
      <div className="flex flex-no-wrap p-1">
        <Avatar avatarSrc={avatarSrc} />
        <CardDetails {...rest} />
      </div>
      {children}
    </div>
  );
}
function Avatar({ avatarSrc }) {
  return (
    <div
      className="card__avatar"
      style={{
        backgroundImage: `url('${avatarSrc}')`,
      }}
    />
  );
}
function CardDetails({ name, uploadedBy }) {
  return (
    <div>
      <div className="card__title">{name}</div>
      <div className="card__author">{uploadedBy}</div>
    </div>
  );
}
