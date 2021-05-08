export function Thumbnail({ id, onClick }) {
  const thumnailURL = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return (
    <figure
      onClick={onClick}
      className="fixedratio"
      style={{
        backgroundImage: `url('${thumnailURL}')`,
      }}
    ></figure>
  );
}
