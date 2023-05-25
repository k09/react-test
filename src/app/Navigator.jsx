import { Link } from 'react-router-dom';

const Navigator = (props) => {
    const title = props.title;
    const url = props.url;
    return (
      <>
        <Link to={url}>{title}</Link>
      </>
  )
}

export default Navigator;
