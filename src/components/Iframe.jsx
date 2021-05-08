export function Iframe({ id }) {
  return (
    <div className="container--iframe">
      <iframe
        className="iframe"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  );
}
