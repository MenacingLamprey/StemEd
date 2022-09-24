
export const Video = (props : {link : string}) => {

  const { link } = props
  console.log(link)
  return  (<div className="video-responsive">
  <iframe
    width="400"
    height="300"
    src={`https://www.youtube.com/embed/${link}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
  />
</div>)
}