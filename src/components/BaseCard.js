import { Thumbnail } from "./Thumbnail";
import { useNavigate } from "react-router-dom";

export function BaseCard({ children, id, avatarSrc, ...rest }) {
  const navigate = useNavigate();
  const openVideo = (e) => {
    navigate(`/${id}`)
    e.stopPropagation();
  }

  return (
    <div key={id} className="card card--shadow m-1">
      <Thumbnail onClick={openVideo} id={id} className="clickable" />
      <div className="flex flex-no-wrap p-1">
        <Avatar avatarSrc={avatarSrc} />
        <CardDetails {...rest} />
      </div>
      {children}
    </div>
  );
}
export function Avatar({ avatarSrc }) {
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
