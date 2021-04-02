export function Thumbnail({ id }) {
  const thumnailURL = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return (
    // <img
    //   src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
    //   alt="Video Thumbnail"
    // />
    <figure
      className="fixedratio"
      style={{
        backgroundImage: `url('${thumnailURL}')`,
      }}
    ></figure>
  );
}
