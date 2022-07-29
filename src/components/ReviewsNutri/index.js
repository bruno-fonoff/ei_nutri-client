export function ReviewsNutri({ props }) {
  return (
    <div>
      <div className="mb-1">
        <p className="italic">'" {props.description} "</p>
        <p className="font-bold text-purple-700">{props.rating}</p>
      </div>
    </div>
  );
}
