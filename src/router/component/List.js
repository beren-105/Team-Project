import { useNavigate } from 'react-router-dom'

export default function List({ title, address, keyword, setListId }) {
  const navigate = useNavigate()
  return (
    <li>
        <h3
          onClick={()=>navigate(('/map'), { state: { id: address } }) }
        >{title}</h3>
      <span>{keyword}</span>
      <p>{address}</p>
    </li>
  );
}
