
import {Link} from "react-router"

export default function ActivityList({ activities }) {
  return(
    <ul className="routine-list-activities">
      {activities.map((activity) => (
        <ActivityListItem
        key={activity.id}
        activity={activity}/>
      ))}
    </ul>
  )
}
function ActivityListItem({activity}) {
  return (
    <li className="routine-card-activities">
      <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
    </li>
  );
}
