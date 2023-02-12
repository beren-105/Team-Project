import { useNavigate } from 'react-router-dom'
import './style.css';

export default function List({ title, address, keyword, setListId }) {
  const navigate = useNavigate()
  return (
    <li>
        <h3 className='nameTitle'
          onClick={()=>navigate(('/map'), { state: { id: address } }) }
        >{title}</h3>
      <span className='content_font'>{keyword}</span>
      <p className='content_font'>{address}</p>
    </li>
  );
}
